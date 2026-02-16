# Create this project on Render

Follow these steps to create the API, frontend, and database on Render. You need a **GitHub** (or GitLab) account and a **Render** account.

---

## 1. Push the template to GitHub

If the template is only on your machine:

1. Create a **new repository** on GitHub (e.g. `my-app`). Do not add a README or .gitignore.
2. In the template folder, run:

   ```bash
   cd /Users/amitsherman/Desktop/ds-app-template
   git init
   git add .
   git commit -m "Initial template"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name.

---

## 2. Create the project on Render with the Blueprint

1. Go to **[dashboard.render.com](https://dashboard.render.com)** and log in.
2. Click **New +** → **Blueprint**.
3. Connect your **GitHub** account if you haven’t already, then select the **repository** you pushed in step 1.
4. Render will read `render.yaml` and show:
   - **ds-app-template-api** (web service)
   - **ds-app-template-frontend** (static site)
   - **ds-app-template-db** (PostgreSQL)
5. Set the **Environment** (e.g. default or create one), then click **Apply**.

Render will create all three and wire `DATABASE_URL` from the database to the API.

---

## 3. Set environment variables

After the first deploy, set one variable on the **API** service:

1. In the Render dashboard, open **ds-app-template-api**.
2. Go to **Environment**.
3. Set **CORS_ORIGIN** to your frontend URL, for example:
   - `https://ds-app-template-frontend.onrender.com`  
   (Use the exact URL Render shows for your frontend service.)
4. Save. Render will redeploy the API.

Optional: to use Basic Auth with fixed credentials, add:

- **RENDER_AUTH_USER** – e.g. `admin`
- **RENDER_AUTH_PASSWORD** – a strong password

---

## 4. Point the frontend at the API (optional)

If you want the frontend to call the API by URL (e.g. when API and frontend are on different subdomains):

1. Open **ds-app-template-frontend** in the dashboard.
2. Go to **Environment**.
3. Add **VITE_API_BASE_URL** = `https://ds-app-template-api.onrender.com`  
   (Use your actual API URL from the API service.)
4. Save. Render will rebuild and redeploy the frontend.

If you leave this unset, the frontend assumes the API is on the same origin (fine if you put them behind one domain later).

---

## 5. Deploy and open

- The first deploy may take a few minutes (install, Prisma migrate, build).
- Open the **frontend** URL from the dashboard (e.g. `https://ds-app-template-frontend.onrender.com`).
- The API is at e.g. `https://ds-app-template-api.onrender.com` (e.g. `GET /api/health`).

---

## Summary

| Step | Action |
|------|--------|
| 1 | Push this repo to GitHub |
| 2 | Render → New → Blueprint → connect repo → Apply |
| 3 | On **API**: set **CORS_ORIGIN** to the frontend URL |
| 4 | (Optional) On **frontend**: set **VITE_API_BASE_URL** to the API URL |
| 5 | Use the frontend and API URLs from the dashboard |

After that, every push to `main` will trigger a new deploy for both services (unless you change auto-deploy settings).
