# Contributing
1. Ensure your code passes `npm run lint`.
2. Do not introduce new third-party dependencies unless strictly necessary and discussed in an Issue first.
3. Maintain the "Service Layer" abstraction. UI components must never make direct `fetch` calls.
4. Adhere to the existing cinematic styling guidelines (use CSS variables from `App.css` and `Hero.css`).