# Accessibility Audit

## Keyboard Navigation
- **Status:** Good.
- **Observations:** The global search overlay supports full keyboard navigation (Up/Down arrows, Enter, Escape). However, the main character and battle grids lack distinct `:focus-visible` styling, making it difficult for keyboard users to determine which card is currently focused.

## Screen Readers & ARIA
- **Status:** Fair.
- **Observations:** The mobile hamburger menu correctly utilizes `aria-expanded` and `aria-label`. However, the premium portrait fallbacks (the Unicode sigils like 🐺, 🦁) do not possess `aria-hidden="true"`, meaning screen readers will literally read "Wolf Face" out loud, which degrades the UX for visually impaired users.

## Color Contrast
- **Status:** Excellent.
- **Observations:** The primary color palette (Gold `#c9a84c` and Parchment `#f5e6c8` against deep `#000` or `#0a0a0a` backgrounds) yields extremely high contrast ratios suitable for WCAG AA compliance. Touch targets on primary navigation links are adequately sized.