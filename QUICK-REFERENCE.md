# 🚀 Quick Reference - Indigo Tasks

## 📱 URLs (Kadib Deployment)

```
Frontend:  https://indigo-tasks-web.onrender.com
Backend:   https://indigo-tasks-api.onrender.com
Health:    https://indigo-tasks-api.onrender.com/api/health
```

## 🔑 Environment Variables (Render Backend)

```env
MONGODB_URI=mongodb+srv://indigo_user:<password>@cluster0.xxxxx.mongodb.net/indigo_tasks
JWT_SECRET=indigo_tasks_secret_2026_production
NODE_ENV=production
FRONTEND_URL=https://indigo-tasks-web.onrender.com
```

## 📦 Git Commands

```bash
# Diyaari deployment
.\prepare-deploy.ps1

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/indigo-tasks.git

# Push
git push -u origin main

# Update deployment
git add .
git commit -m "Update app"
git push
```

## 🌐 Important Links

| Service | URL | Purpose |
|---------|-----|---------|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas | Cloud Database |
| Render.com | https://render.com | Hosting Platform |
| GitHub | https://github.com | Code Repository |

## 📱 PWA Install

### Android (Chrome)
Menu (⋮) → Add to Home screen → Install

### iPhone (Safari)
Share (⬆️) → Add to Home Screen → Add

### Desktop (Chrome/Edge)
Install icon (+) in address bar → Install

## 🔧 Troubleshooting

### App seexanaya (sleeping)?
- ✅ Normal - Free tier feature
- ⏰ Wake time: 30-60 seconds
- 💡 Upgrade to paid plan for 24/7 uptime

### Database connection error?
- ✅ Check MongoDB connection string
- ✅ Check password (URL encode special chars)
- ✅ Check IP whitelist (0.0.0.0/0)

### PWA ma install garaynayo?
- ✅ Ensure HTTPS (Render automatic)
- ✅ Clear browser cache
- ✅ Try Chrome/Edge

## 📊 Free Tier Limits

**Render.com:**
- 750 hours/month
- Sleep after 15 min inactivity
- 100GB bandwidth/month

**MongoDB Atlas:**
- 512MB storage
- Shared cluster
- Unlimited connections

## 🎯 Next Steps

1. ✅ Deploy to Render.com
2. ✅ Setup MongoDB Atlas
3. ✅ Test online
4. ✅ Install PWA
5. 🎨 Customize (optional)
6. 🌐 Add custom domain (optional)
7. 📊 Monitor usage
8. 🚀 Share with users!

---

**Files Muhiim:**
- 📖 `SOMALI-GUIDE.md` - Haga buuxa (Somali)
- 📖 `DEPLOYMENT.md` - Deployment guide (Somali)
- 📖 `README.md` - Documentation (English)
- 🖼️ `pwa_install_guide.png` - Visual guide

**Mahadsanid!** 🎉
