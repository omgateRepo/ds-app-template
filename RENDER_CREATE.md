# Deploy this template on Render

**Goal:** One Blueprint creates API + frontend + DB. No env vars to set (API allows all origins by default).

---

## 1. Push to GitHub

Template is already a git repo. Create a new repo at [github.com/new](https://github.com/new) (no README), then:

```bash
cd /Users/amitsherman/Desktop/ds-app-template
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 2. Create everything on Render (Blueprint)

1. [dashboard.render.com](https://dashboard.render.com) → **New +** → **Blueprint**.
2. Connect the repo you pushed.
3. **Apply.**  
   Render creates **ds-app-template-db**, **ds-app-template-api**, and **ds-app-template-frontend** from `render.yaml` (database is defined first so the API’s `fromDatabase` link works). The API can appear a few seconds after the DB.
4. Wait until API and frontend show **Live** (first build may take several minutes). If the API build failed before: the Blueprint now builds from repo root so the shared `packages/types` is available; push the latest commit and redeploy.

Done. Open the frontend URL. For future apps: clone this template repo, rename in `package.json` / `render.yaml` if you want, then same flow: push → Blueprint.
