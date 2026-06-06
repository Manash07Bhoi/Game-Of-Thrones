# Asset Audit

## Priority 1 & 2 - Project Assets
The user indicated that the original project assets are not displaying: `one.jpg`, `two.jpg`, `three.png`, `four.webp`, `five.jpg`, `six.jpg`, and `one.mp4`.

| Filename | Directory | Exists on Disk | Referenced in Code? | Component Route | Broken? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `one.jpg` | `public/images/` | Yes | No | None | Yes (Unreferenced) |
| `two.jpg` | `public/images/` | Yes | No | None | Yes (Unreferenced) |
| `three.png` | `public/images/` | Yes | No | None | Yes (Unreferenced) |
| `four.webp` | `public/images/` | Yes | No | None | Yes (Unreferenced) |
| `five.jpg` | `public/images/` | Yes | No | None | Yes (Unreferenced) |
| `six.jpg` | `public/images/` | Yes | No | None | Yes (Unreferenced) |
| `one.mp4` | `public/video/` | Yes | Yes | `src/components/Hero.jsx` | No (Seems properly mapped via import.meta.env) |

### Observation
The image assets physically exist in the repository but have been completely stripped out of the codebase files. I need to find where they were originally intended to render.
