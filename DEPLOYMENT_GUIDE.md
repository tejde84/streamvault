# StreamVault Deployment Guide

This guide walks you through deploying StreamVault using **MongoDB Atlas** (database), **Render** (backend), and **Vercel** (frontend).

## Step 1: Set Up MongoDB Atlas

### 1.1 Create a MongoDB Atlas Account
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up or log in
- Click "Create a Deployment"

### 1.2 Create a Cluster
- Select **M0 (Free)** tier
- Choose your cloud provider and region (AWS, us-east-1 recommended)
- Click "Create Deployment"
- Wait 3-5 minutes for the cluster to initialize

### 1.3 Get Connection String
- In MongoDB Atlas, click "Connect"
- Select "Drivers" and copy the connection string
- Replace `<username>` and `<password>` with your database credentials
- Example: `mongodb+srv://user:pass@cluster.mongodb.net/streamvault?retryWrites=true&w=majority`

### 1.4 Network Access
- Go to "Network Access" in the left sidebar
- Click "Add IP Address"
- Select "Allow access from anywhere" (for Render deployment)
- Confirm

### 1.5 Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Use a strong password
- Select "Built-in Role: readWriteAnyDatabase"
- Save the username and password

---

## Step 2: Deploy Backend to Render

### 2.1 Create a Render Account
- Go to [render.com](https://render.com)
- Sign up with your GitHub account

### 2.2 Connect Your GitHub Repository
- In Render, go to "Dashboard"
- Click "New +" → "Web Service"
- Click "Connect a new repository"
- Select your **Streamvault** GitHub repo
- Click "Connect"

### 2.3 Configure Your Service
- **Name:** `streamvault-backend`
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free (recommended to start)

### 2.4 Add Environment Variables
Click "Advanced" and add:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/streamvault?retryWrites=true&w=majority
PORT = 5000
NODE_ENV = production
JWT_SECRET = your_super_secret_key_here_change_this
```

### 2.5 Deploy
- Click "Create Web Service"
- Wait 2-3 minutes for deployment to complete
- Copy your Render backend URL (e.g., `https://streamvault-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create a Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with your GitHub account

### 3.2 Import Your Project
- Click "Add New..." → "Project"
- Select your **Streamvault** GitHub repository
- Click "Import"

### 3.3 Configure Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3.4 Add Environment Variables
Under "Environment Variables," add:
```
VITE_API_BASE_URL = https://streamvault-backend.onrender.com/api
```

(Replace with your actual Render backend URL)

### 3.5 Deploy
- Click "Deploy"
- Wait 2-3 minutes for the frontend to build and deploy
- Your frontend will be live at a Vercel URL (e.g., `https://streamvault.vercel.app`)

---

## Step 4: Update CORS on Backend

Your backend needs to allow requests from your Vercel frontend.

### 4.1 Update `backend/src/server.js`
Find the CORS configuration and update it:

```javascript
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'https://streamvault.vercel.app' // Your Vercel frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

### 4.2 Commit and Push
```bash
git add -A
git commit -m "Update CORS for production deployment"
git push origin main
```

Render will automatically redeploy when you push to GitHub.

---

## Step 5: Create a `.env.local` File (Local Development)

Create a file in `backend/.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/streamvault?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_local_secret
```

And in `frontend/.env.local`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Step 6: Verify Deployment

### Test Backend
- Visit `https://streamvault-backend.onrender.com/api/health`
- You should see: `{"message":"Server is running"}`

### Test Frontend
- Visit your Vercel URL
- Try signing up, logging in, and browsing movies

---

## Troubleshooting

### Backend Won't Start on Render
- Check MongoDB Atlas connection string is correct
- Verify MongoDB credentials in environment variables
- Check Render logs: Dashboard → Select your service → Logs

### Frontend Not Loading Movies
- Verify `VITE_API_BASE_URL` is set correctly on Vercel
- Check browser console for CORS errors
- Confirm backend is running

### Movies Not Showing Data
- SSH into backend and run the seed script manually:
  - On Render: Go to Shell, run `node seed.js`
- Or run locally: `cd backend && npm run seed`

---

## Optional: Custom Domain

### Add Domain to Vercel
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records with Vercel's nameservers

### Add Domain to Render
1. Go to your Render service
2. Click "Settings" → "Custom Domain"
3. Add your domain and update DNS records

---

## Environment Variables Checklist

**MongoDB Atlas:**
- ✅ Cluster created
- ✅ Database user created (username & password saved)
- ✅ Network access configured
- ✅ Connection string copied

**Render Backend:**
- ✅ Service created (Node.js)
- ✅ GitHub repo connected
- ✅ Environment variables set (MONGODB_URI, PORT, JWT_SECRET)
- ✅ Deploying automatically

**Vercel Frontend:**
- ✅ Project imported
- ✅ VITE_API_BASE_URL set to Render backend URL
- ✅ Build command configured
- ✅ Deployed successfully

---

## Next Steps

1. **Monitor your apps** in Render and Vercel dashboards
2. **Scale up** if needed (Render offers paid plans)
3. **Set up a custom domain** for a professional look
4. **Enable HTTPS** (automatic on both platforms)
5. **Add analytics** to track user behavior

---

## Support

For issues:
- **MongoDB:** [docs.mongodb.com](https://docs.mongodb.com)
- **Render:** [render.com/docs](https://render.com/docs)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
