# Deployment Guide

This guide explains how the Game-Of-Thrones application is built and deployed.

## Build Process

The project is built using Vite. To create a production-ready build, run:
```bash
npm run build
```
This command bundles the React application and generates the output in the `dist/` folder. All processed data from `public/data/` is included as static assets in the build output, preserving fetch requests correctly.

## Deployment Process

The project is configured to be deployed using **GitHub Pages** with **GitHub Actions**.

Whenever changes are pushed to the `main` branch, a GitHub Action is triggered (`.github/workflows/deploy.yml`). The Action performs the following steps:
1. Checks out the source code.
2. Sets up Node.js (v20) and installs dependencies using `npm ci`.
3. Runs the production build (`npm run build`).
4. Uploads the `dist/` directory as an artifact.
5. Deploys the artifact to GitHub Pages.

## Troubleshooting

- **Assets returning 404:** Check `vite.config.js` to ensure the `base` property accurately matches the repository name. If the repository name changes, update the base path.
- **Data not loading:** Make sure the `processed-data` assets were correctly copied to `public/data/` before committing.
- **Workflow failing on deploy step:** Verify that GitHub Pages is enabled in the repository settings and is configured to build using "GitHub Actions". Refer to `GITHUB_PAGES_SETUP.md` for specific details.
