# Galina Rodriguez Portfolio

Modern portfolio website built with React, Vite, and Tailwind CSS.

## Deployment to GitHub Pages

### Step 1: Enable GitHub Actions
1. Go to **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"** (NOT "Deploy from a branch")
3. Save

### Step 2: Push Your Code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/itsgigi-0/itsgigi-0.git
git push -u origin main --force
```

### Step 3: Wait for Deployment
1. Go to the **Actions** tab
2. Wait for the green checkmark ✅
3. Your site will be live at: `https://itsgigi-0.github.io/itsgigi-0/`

## Local Development

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

The build output will be in the `dist` folder.
