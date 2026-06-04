# GitHub Pages Setup

To allow the Game-Of-Thrones application to deploy successfully using the configured GitHub Actions workflow, you must adjust specific settings in the repository.

## Requirements

1. **Repository Settings**
   - Go to your repository on GitHub.
   - Click on the **Settings** tab.
   - On the left sidebar, click on **Pages**.
2. **Build and Deployment**
   - Under **Build and deployment**, look for the **Source** dropdown.
   - Change the source from "Deploy from a branch" to **GitHub Actions**.
3. **Repository Name**
   - The Vite base path is hardcoded as `/Game-Of-Thrones/` in `vite.config.js`. If you change the repository name, you must also update the base path in `vite.config.js` to match the new repository name exactly.
4. **Trigger Deployment**
   - Once "GitHub Actions" is selected as the source, the workflow will automatically deploy your next push to the `main` branch. You can also trigger it manually from the **Actions** tab if needed.
