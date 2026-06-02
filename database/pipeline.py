import pandas as pd
import json
import os
import re
from datetime import datetime
import uuid
import math

def safe_str(val):
    if pd.isna(val) or val is None:
        return None
    return str(val).strip()

def slugify(text):
    if text is None: return None
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clean_house_name(name):
    if not name: return None
    name = name.strip()
    name_lower = name.lower()
    if name_lower == 'none' or name_lower == 'unknown': return None

    # Normalize brotherhood without banners
    if 'brotherhood without banners' in name_lower:
        return 'Brotherhood Without Banners'
    if 'wildling' in name_lower:
        return 'Wildlings'
    if "night's watch" in name_lower or "nights watch" in name_lower:
        return "Night's Watch"
    if 'brave companions' in name_lower:
        return 'Brave Companions'
    if 'faith militant' in name_lower:
        return 'Faith Militant'
    if 'faceless men' in name_lower:
        return 'Faceless Men'
    if 'iron bank' in name_lower:
        return 'Iron Bank'
    if 'kingsguard' in name_lower:
        return 'Kingsguard'
    if 'city watch' in name_lower:
        return 'City Watch'
    if 'good masters' in name_lower:
        return 'Good Masters'
    if 'second sons' in name_lower:
        return 'Second Sons'
    if 'stormcrows' in name_lower:
        return 'Stormcrows'
    if 'unsullied' in name_lower:
        return 'Unsullied'

    if not name_lower.startswith('house '):
        name = f"House {name}"

    # title case but fix House
    words = name.split()
    return " ".join([w.title() for w in words])

def clean_speaker_name(name):
    if not name: return None
    # Remove everything in parentheses or brackets
    name = re.sub(r'\(.*?\)', '', name)
    name = re.sub(r'\[.*?\]', '', name)
    # Split by / or , and take the first one? No, just keep as is, but clean it.
    name = name.strip()

    if not name: return None

    name_upper = name.upper()

    # Reject scene headings and action lines
    invalid_prefixes = ['INT.', 'EXT.', 'CUT TO', 'SCENE START', 'FADE IN', 'FADE OUT', 'TITLE CARD']
    if any(name_upper.startswith(p) for p in invalid_prefixes):
        return None

    invalid_exact = ['INT', 'EXT', 'A VOICE', 'VOICE']
    if name_upper in invalid_exact:
        return None

    # If it's a long sentence, it's not a character
    if len(name.split()) > 4 or len(name) > 30:
        return None

    # Title case
    return name.title()

def main():
    base_dir = "database"
    out_dir = "processed-data"
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(os.path.join(out_dir, "script-lines"), exist_ok=True)

    # 1. Load data
    battles_df = pd.read_csv(f"{base_dir}/archive/battles.csv")
    episodes_df = pd.read_csv(f"{base_dir}/archive_1/dataset.csv")
    script_df = pd.read_csv(f"{base_dir}/archive_2/game-of-thrones.csv")
    char_deaths_df = pd.read_csv(f"{base_dir}/archive/character_deaths.csv")
    char_preds_df = pd.read_csv(f"{base_dir}/archive/character_predictions_pose.csv")

    script_df = script_df.drop_duplicates()

    # 2. SEASONS & EPISODES
    seasons_dict = {}
    episodes_list = []

    episodes_df.rename(columns={
        'No.overall': 'overall_number',
        'No. inseason': 'season_number',
        'Original air date\u200a[20]': 'air_date',
        'U.S. viewers(millions)': 'viewers_millions'
    }, inplace=True)

    for _, row in episodes_df.iterrows():
        s_num = int(row['Season'])
        e_num = int(row['season_number'])
        overall = int(row['overall_number'])

        s_id = f"season_{s_num}"
        e_id = f"episode_{s_num}_{e_num:02d}" # Padding for correct sorting in string comparisons

        if s_id not in seasons_dict:
            seasons_dict[s_id] = {"id": s_id, "seasonNumber": s_num, "episodes": []}
        seasons_dict[s_id]["episodes"].append(e_id)

        episodes_list.append({
            "id": e_id,
            "seasonId": s_id,
            "episodeNumber": e_num,
            "overallNumber": overall,
            "title": safe_str(row['Title']).strip('"'),
            "directedBy": safe_str(row['Directed by']),
            "writtenBy": safe_str(row['Written by']),
            "airDate": safe_str(row['air_date']),
            "viewersMillions": float(row['viewers_millions']) if pd.notna(row['viewers_millions']) else None
        })

    seasons_list = list(seasons_dict.values())
    episodes_list.sort(key=lambda x: x['overallNumber'])

    # Sort episodes in seasons correctly
    for s in seasons_list:
        s['episodes'].sort()

    # 3. HOUSES & LOCATIONS
    houses_dict = {}
    locations_dict = {}

    def add_house(h):
        h_clean = clean_house_name(h)
        if h_clean:
            h_id = f"house_{slugify(h_clean)}"
            houses_dict[h_id] = {"id": h_id, "name": h_clean}
            return h_id
        return None

    for _, row in char_preds_df.iterrows(): add_house(safe_str(row['house']))
    for _, row in char_deaths_df.iterrows(): add_house(safe_str(row['allegiances']))

    for _, row in battles_df.iterrows():
        for i in range(1, 5):
            add_house(safe_str(row[f'attacker_{i}']))
            add_house(safe_str(row[f'defender_{i}']))

        loc = safe_str(row['location'])
        reg = safe_str(row['region'])
        if loc:
            loc_id = f"loc_{slugify(loc)}"
            locations_dict[loc_id] = {"id": loc_id, "name": loc, "region": reg}

    houses_list = list(houses_dict.values())
    locations_list = list(locations_dict.values())

    # 4. CHARACTERS
    chars_dict = {}

    # Helper to merge character entries
    def add_character(name, is_male=None, culture=None, house_id=None, is_alive=None, popularity=0.0, title=None):
        if not name: return None
        c_id = f"char_{slugify(name)}"
        if c_id not in chars_dict:
            chars_dict[c_id] = {
                "id": c_id, "name": name, "title": title,
                "isMale": is_male, "culture": culture,
                "houseId": house_id, "isAlive": is_alive,
                "popularity": popularity, "spokenLineCount": 0
            }
        else:
            c = chars_dict[c_id]
            if c['title'] is None and title is not None: c['title'] = title
            if c['isMale'] is None and is_male is not None: c['isMale'] = is_male
            if c['culture'] is None and culture is not None: c['culture'] = culture
            if c['houseId'] is None and house_id is not None: c['houseId'] = house_id
            if c['isAlive'] is None and is_alive is not None: c['isAlive'] = is_alive
            if popularity > c['popularity']: c['popularity'] = popularity
        return c_id

    for _, row in char_preds_df.iterrows():
        name = safe_str(row['name'])
        if not name: continue
        h_id = add_house(safe_str(row['house']))
        add_character(
            name=name,
            is_male=bool(row['male']),
            culture=safe_str(row['culture']),
            house_id=h_id,
            is_alive=bool(row['isalive']),
            popularity=float(row['popularity']) if pd.notna(row['popularity']) else 0.0,
            title=safe_str(row['title'])
        )

    for _, row in char_deaths_df.iterrows():
        name = safe_str(row['name'])
        if not name: continue
        h_id = add_house(safe_str(row['allegiances']))
        add_character(
            name=name,
            is_male=bool(row['gender']),
            house_id=h_id,
            is_alive=False # Because they are in deaths list
        )

    # Process script lines for speakers
    for _, row in script_df.iterrows():
        speaker = safe_str(row['Speaker'])
        clean_speaker = clean_speaker_name(speaker)
        if clean_speaker:
            c_id = add_character(name=clean_speaker)
            chars_dict[c_id]["spokenLineCount"] += 1

    chars_list = list(chars_dict.values())

    # 5. BATTLES
    battles_list = []

    for _, row in battles_df.iterrows():
        b_name = safe_str(row['name'])
        b_id = f"battle_{slugify(b_name)}"

        loc_name = safe_str(row['location'])
        loc_id = f"loc_{slugify(loc_name)}" if loc_name else None

        att_houses = [add_house(safe_str(row[f'attacker_{i}'])) for i in range(1, 5) if safe_str(row[f'attacker_{i}'])]
        def_houses = [add_house(safe_str(row[f'defender_{i}'])) for i in range(1, 5) if safe_str(row[f'defender_{i}'])]

        # We need to map commanders to char IDs
        att_cmds = []
        if pd.notna(row['attacker_commander']):
            for c in str(row['attacker_commander']).split(','):
                c = c.strip()
                if c: att_cmds.append(add_character(c))

        def_cmds = []
        if pd.notna(row['defender_commander']):
            for c in str(row['defender_commander']).split(','):
                c = c.strip()
                if c: def_cmds.append(add_character(c))

        battles_list.append({
            "id": b_id, "name": b_name,
            "year": int(row['year']) if pd.notna(row['year']) else None,
            "battleType": safe_str(row['battle_type']),
            "locationId": loc_id, "region": safe_str(row['region']),
            "attackerSize": float(row['attacker_size']) if pd.notna(row['attacker_size']) else None,
            "defenderSize": float(row['defender_size']) if pd.notna(row['defender_size']) else None,
            "attackerOutcome": safe_str(row['attacker_outcome']),
            "factions": {"attackers": list(set(att_houses)), "defenders": list(set(def_houses))},
            "commanders": {"attackers": list(set(att_cmds)), "defenders": list(set(def_cmds))}
        })

    # 6. SCRIPT LINES
    script_seasons = {}
    script_index = {"totalLines": 0, "seasons": {}, "fileReferences": []}

    for _, row in script_df.iterrows():
        season_str = safe_str(row['Season'])
        ep_str = safe_str(row['Episode'])
        text = safe_str(row['Text'])
        speaker = safe_str(row['Speaker'])

        if not text: continue

        s_num = int(re.search(r'\d+', season_str).group()) if season_str and re.search(r'\d+', season_str) else None
        e_match = re.search(r'e(\d+)', ep_str) if ep_str else None
        e_num = int(e_match.group(1)) if e_match else None

        s_id = f"season_{s_num}" if s_num else "season_unknown"
        e_id = f"episode_{s_num}_{e_num:02d}" if s_num and e_num else "episode_unknown"

        clean_speaker = clean_speaker_name(speaker)
        is_action = True
        c_id = None
        if clean_speaker:
            c_id = f"char_{slugify(clean_speaker)}"
            is_action = False

        line_obj = {
            "id": f"line_{uuid.uuid4().hex[:8]}",
            "seasonId": s_id, "episodeId": e_id,
            "characterId": c_id, "text": text, "isAction": is_action
        }

        if s_id not in script_seasons: script_seasons[s_id] = []
        script_seasons[s_id].append(line_obj)
        script_index["totalLines"] += 1

    for s_id, lines in script_seasons.items():
        # Sort lines by episode id sequentially
        lines.sort(key=lambda x: x['episodeId'])
        fname = f"{s_id.replace('_', '-')}.json"
        with open(os.path.join(out_dir, "script-lines", fname), "w") as f:
            json.dump(lines, f, indent=2)
        script_index["seasons"][s_id] = len(lines)
        script_index["fileReferences"].append(f"script-lines/{fname}")

    # Update characters list (re-export because we might have added commanders)
    chars_list = list(chars_dict.values())

    # 7. SEARCH INDEX
    search_index = []

    for c in chars_list:
        search_index.append({"id": c['id'], "type": "character", "title": c['name'], "content": f"{c['name']} {c['title'] or ''} {c['culture'] or ''}".strip(), "url": f"/characters/{c['id']}"})

    for h in houses_list:
        search_index.append({"id": h['id'], "type": "house", "title": h['name'], "content": h['name'], "url": f"/houses/{h['id']}"})

    for e in episodes_list:
        search_index.append({"id": e['id'], "type": "episode", "title": e['title'], "content": f"{e['title']} Season {e['seasonId']} {e['directedBy'] or ''} {e['writtenBy'] or ''}".strip(), "season": e['seasonId'], "url": f"/episodes/{e['id']}"})

    for b in battles_list:
        search_index.append({"id": b['id'], "type": "battle", "title": b['name'], "content": f"{b['name']} {b['region'] or ''} {b['battleType'] or ''}".strip(), "url": f"/battles/{b['id']}"})

    for loc in locations_list:
        search_index.append({"id": loc['id'], "type": "location", "title": loc['name'], "content": f"{loc['name']} {loc['region'] or ''}".strip(), "url": f"/locations/{loc['id']}"})

    for s_id, lines in script_seasons.items():
        for line in lines:
            if not line['isAction'] and len(line['text']) > 20:
                char_name = chars_dict[line['characterId']]['name'] if line['characterId'] in chars_dict else "Unknown"
                search_index.append({"id": line['id'], "type": "quote", "title": f"Quote by {char_name}", "content": line['text'], "character": char_name, "season": line['seasonId'], "episode": line['episodeId'], "url": f"/quotes/{line['id']}"})

    # 8. ANALYTICS
    analytics = {
        "characterPopularity": sorted([{"id": c['id'], "name": c['name'], "score": c['popularity']} for c in chars_list if c['popularity'] > 0], key=lambda x: x['score'], reverse=True)[:100],
        "mostSpokenCharacters": sorted([{"id": c['id'], "name": c['name'], "lines": c['spokenLineCount']} for c in chars_list if c['spokenLineCount'] > 0], key=lambda x: x['lines'], reverse=True)[:100],
        "episodeAnalytics": {"mostViewed": sorted([e for e in episodes_list if e['viewersMillions']], key=lambda x: x['viewersMillions'], reverse=True)[:10]}
    }

    # 9. SAVE ALL
    def save_json(data, name):
        with open(os.path.join(out_dir, name), "w") as f:
            json.dump(data, f, indent=2)

    save_json(seasons_list, "seasons.json")
    save_json(episodes_list, "episodes.json")
    save_json(houses_list, "houses.json")
    save_json(locations_list, "locations.json")
    save_json(chars_list, "characters.json")
    save_json(battles_list, "battles.json")
    save_json(script_index, "script-lines-index.json")
    save_json(search_index, "search-index.json")
    save_json(analytics, "analytics.json")

    metadata = {
        "generatedAt": datetime.now().isoformat() + "Z",
        "version": "1.0.2",
        "sourceDatasets": ["battles.csv", "dataset.csv", "game-of-thrones.csv", "character_deaths.csv", "character_predictions_pose.csv"],
        "recordCounts": {
            "seasons": len(seasons_list), "episodes": len(episodes_list),
            "houses": len(houses_list), "locations": len(locations_list),
            "characters": len(chars_list), "battles": len(battles_list),
            "scriptLines": script_index["totalLines"], "searchIndexEntries": len(search_index)
        }
    }
    save_json(metadata, "metadata.json")

if __name__ == "__main__":
    main()
