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
4. Leave **Auto Sync** on (default): each push to the linked branch that changes `render.yaml` updates the services and triggers a deploy. No manual sync.
5. Wait until API and frontend show **Live** (first build may take several minutes).

**If the API build fails** with “datasource.url is required”: Render is using an old build command and sometimes an old commit. Do this **once**:

1. **Render dashboard** → **ds-app-template-api** → **Settings** (or **Build & Deploy**).
2. Set **Build Command** to: `npm run build:api`
3. Set **Start Command** to: `npm run start:api`
4. **Save**.
5. **Manual Deploy** → **“Clear build cache & deploy”** (or **Deploy latest commit**) so it uses the **latest** commit on main, not an old one.

The repo defines `build:api` (install + prisma generate only) and `start:api` (migrate + start) in the root `package.json`, so no manual command strings. After this one-time fix, future pushes will deploy with the correct commands.

Done. Open the frontend URL. For future apps: clone this template repo, rename in `package.json` / `render.yaml` if you want, then same flow: push → Blueprint.
