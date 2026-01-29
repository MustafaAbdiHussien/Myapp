# 🚀 Deployment Guide - Indigo Tasks App

## Qaybaha (Steps)

### 1️⃣ **MongoDB Atlas Setup (Cloud Database)**

1. Tag https://www.mongodb.com/cloud/atlas/register
2. Samee account (bilaash)
3. Samee cluster cusub:
   - Click "Build a Database"
   - Dooro "FREE" (M0 Sandbox)
   - Dooro region (Frankfurt ama Amsterdam - dhow)
   - Click "Create"

4. Samee Database User:
   - Security → Database Access → Add New Database User
   - Username: `indigo_user`
   - Password: Samee password adag (kaydi)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. Allow Network Access:
   - Security → Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. Hel Connection String:
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy connection string (wuxuu u ekaanayaa):
     ```
     mongodb+srv://indigo_user:<password>@cluster0.xxxxx.mongodb.net/indigo_tasks?retryWrites=true&w=majority
     ```
   - Beddel `<password>` password-kaaga

---

### 2️⃣ **Render.com Deployment**

#### Option A: Automatic Deployment (Easy)

1. Tag https://render.com oo samee account (GitHub-ka ku xidh)

2. Push code-kaaga GitHub:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. Render.com:
   - Click "New +" → "Blueprint"
   - Xidh GitHub repo-ga
   - Render wuxuu automatically u deploy garaynayaa labada service (API iyo Web)

4. Add Environment Variables (Backend):
   - Tag backend service settings
   - Environment → Add Environment Variable:
     - `MONGODB_URI`: Paste MongoDB connection string
     - `JWT_SECRET`: `indigo_tasks_secret_key_production_2026`
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: Your frontend URL (e.g., https://indigo-tasks-web.onrender.com)

#### Option B: Manual Deployment

**Backend (API):**
1. Render.com → New + → Web Service
2. Connect GitHub repo
3. Settings:
   - Name: `indigo-tasks-api`
   - Runtime: `Node`
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Add Environment Variables (waxaa kor ku xusan)

**Frontend (Web):**
1. Render.com → New + → Static Site
2. Connect GitHub repo
3. Settings:
   - Name: `indigo-tasks-web`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

---

### 3️⃣ **Update Frontend API URL (Haddii loo baahdo)**

Haddii backend iyo frontend ay kala yihiin domains:

Update `vite.config.ts`:
```typescript
proxy: {
  "/api": {
    target: "https://indigo-tasks-api.onrender.com", // Your backend URL
    changeOrigin: true,
  },
}
```

---

## 📱 **Progressive Web App (PWA) - Mobile App**

Appkaaga hadda waa PWA! Waxaa uu shaqaynayaa sida mobile app.

### Sida loo install gareyo:

**Android (Chrome):**
1. Fur appka browser-ka (https://your-app.onrender.com)
2. Click menu (3 dots) → "Add to Home screen"
3. Click "Install"
4. Appku wuxuu ku bixi doonaa home screen sida app normal ah

**iPhone (Safari):**
1. Fur appka Safari browser-ka
2. Click Share button (arrow pointing up)
3. Scroll down → "Add to Home Screen"
4. Click "Add"

**Desktop (Chrome/Edge):**
1. Fur appka browser-ka
2. Address bar-ka waxaad arki doontaa install icon (+)
3. Click "Install"

### PWA Features:
- ✅ Offline support
- ✅ Push notifications (haddii la daro)
- ✅ Home screen icon
- ✅ Full screen mode
- ✅ Fast loading
- ✅ Auto-updates

---

## 🔍 **Testing**

Kadib deployment:
1. Fur appka browser-ka
2. Samee account cusub
3. Test features oo dhan
4. Install PWA (Add to Home Screen)

---

## 💡 **Tips**

1. **Free Tier Limits:**
   - Render free tier: App-ku wuu seexan karaa 15 daqiiqo kadib (auto-wake on request)
   - MongoDB Atlas: 512MB storage (ku filan apps yar yar)

2. **Custom Domain:**
   - Render → Settings → Custom Domain
   - Add domain-kaaga (e.g., indigotasks.com)

3. **Environment Variables:**
   - Weligaa ha sheegin .env file GitHub
   - Isticmaal Render environment variables

---

## 📞 **Support**

Haddii wax khalad ah dhacaan:
- Check Render logs: Service → Logs
- Check MongoDB: Atlas → Metrics
- Test API: https://your-api.onrender.com/api/health

---

## ✅ **Checklist**

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string copied
- [ ] Code pushed to GitHub
- [ ] Render services created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] App tested online
- [ ] PWA installed on phone

---

**Mahadsanid!** 🎉
