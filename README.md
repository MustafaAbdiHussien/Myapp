# 📱 Indigo Tasks - Daily Productivity App

<div align="center">

**A modern, full-stack task management application with PWA support**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

</div>

---

## ✨ Features

### 🎯 Core Features
- ✅ **Task Management** - Create, edit, complete, and delete tasks
- 📅 **Calendar View** - Visualize tasks by date
- 📊 **Analytics** - Track productivity and task completion
- 📝 **Daily Notes** - Add notes for each day
- 👤 **User Profiles** - Personalized user experience
- 🎨 **Beautiful UI** - Modern, responsive design with dark theme

### 🔐 Authentication & Security
- 🔒 JWT-based authentication
- 🛡️ Secure password hashing with bcrypt
- 👥 User registration and login
- 🔑 Protected API routes

### 📱 Progressive Web App (PWA)
- 📲 **Install on any device** - Works like a native app
- 🌐 **Offline support** - Access your tasks without internet
- ⚡ **Fast loading** - Optimized performance
- 🔔 **Push notifications ready** - Stay updated
- 🏠 **Home screen icon** - Quick access

---

## 🚀 Tech Stack

### Frontend
- ⚛️ **React 18** - UI library
- 📘 **TypeScript** - Type safety
- ⚡ **Vite** - Build tool
- 🎨 **Tailwind CSS** - Styling
- 🧩 **Radix UI** - Component library

### Backend
- 🟢 **Node.js** - Runtime
- 🚂 **Express** - Web framework
- 🍃 **MongoDB** - Database
- 🔐 **JWT** - Authentication

---

## 📦 Installation

### Local Development

1. **Install dependencies**
```bash
npm install
cd server && npm install && cd ..
```

2. **Setup environment variables**

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/indigo_tasks
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

3. **Run the application**
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
npm run dev
```

4. **Open the app**
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

---

## 🌐 Deployment

### Quick Deploy to Render.com

1. **Prepare for deployment**
```bash
# Windows
.\prepare-deploy.ps1

# Linux/Mac
./prepare-deploy.sh
```

2. **Push to GitHub**
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

3. **Deploy on Render**
- Go to [Render.com](https://render.com)
- Click "New +" → "Blueprint"
- Connect your GitHub repository

📖 **Detailed deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📱 Install as Mobile App

### Android (Chrome)
1. Open the app in Chrome
2. Tap menu (⋮) → "Add to Home screen"
3. Tap "Install"

### iPhone (Safari)
1. Open the app in Safari
2. Tap Share button (⬆️)
3. Tap "Add to Home Screen"

### Desktop (Chrome/Edge)
1. Open the app
2. Click install icon (+) in address bar
3. Click "Install"

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Notes (Protected)
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create/update note

---

## 📝 License

This project is licensed under the MIT License.

---

<div align="center">

**Made with ❤️ and ☕**

⭐ Star this repo if you find it helpful!

</div>

