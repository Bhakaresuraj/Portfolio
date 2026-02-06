# Step-by-Step Setup Instructions

Follow these instructions to get your portfolio application running.

## Fastest Start (Recommended)

If you want the quickest path (especially on Linux), use **MongoDB Atlas** (cloud) so you don’t need to install MongoDB locally.

```bash
# 1) Go to the project folder
cd /home/bhakare/Desktop/Portfolio

# 2) Install dependencies
npm install

# 3) Create your env file
cp .env.example .env

# 4) Edit .env and set at least MONGODB_URI + PORT
nano .env

# 5) Start the server
npm run dev

# 6) Open in browser
# http://localhost:5000
```

To confirm backend is running:

```bash
curl http://localhost:5000/api/profile
```

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js installed (version 14 or higher)
- ✅ npm installed (comes with Node.js)
- ✅ MongoDB installed (local) OR MongoDB Atlas account (cloud)

### Check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
cd /home/bhakare/Desktop/Portfolio
npm install
```

This will install all required packages:
- express
- mongoose
- dotenv
- cors
- nodemailer
- express-validator
- nodemon (for development)

**Expected output:** You should see packages being installed and a `node_modules` folder created.

---

## Step 2: Set Up MongoDB

You have two options:

### Option A: Local MongoDB

**On Linux (Local MongoDB can vary by distro):**

Local MongoDB installation differs across Ubuntu/Debian/Fedora/Arch, and some distros don’t ship a `mongodb` package anymore. If you want the easiest setup, use **Option B (MongoDB Atlas)** instead.

If you already have MongoDB installed locally, you can skip install and just start the service.

```bash
# Install MongoDB (if not already installed)
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod  # Enable auto-start on boot

# Verify it's running
sudo systemctl status mongod
```

If `mongod` service name doesn’t exist on your machine, try:

```bash
sudo systemctl start mongodb
sudo systemctl status mongodb
```

**On macOS (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Windows:**
- Download MongoDB from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

### Option B: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`)
6. Replace `<password>` with your database password
7. You'll use this in Step 3

---

## Step 3: Configure Environment Variables
1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Open the `.env` file in a text editor:**
   ```bash
   nano .env
   # or use any text editor like VS Code, gedit, etc.
   ```

3. **Fill in your configuration:**

   **For Local MongoDB:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

   **For MongoDB Atlas:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

4. **Email Configuration (Gmail):**
   - Enable 2-Factor Authentication on your Google account
   - Go to: https://myaccount.google.com/apppasswords
   - Generate an App Password for "Mail"
   - Use that App Password (not your regular password) in `EMAIL_PASSWORD`
   - Use your Gmail address in `EMAIL_USER` and `CONTACT_EMAIL`

   **Note (important):** Email is optional. If you don’t configure email now, the **contact form will still save messages to MongoDB**, and the backend will just skip/ignore email sending failures.

---

## Step 4: Start the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

**Expected output:**
```
MongoDB Connected: localhost:27017
Server running on port 5000
```

If you see this, your server is running! 🎉

---

## Step 5: Access the Application

Open your web browser and go to:
```
http://localhost:5000
```

You should see the portfolio homepage!

---

## Step 6: Add Initial Data (Optional but Recommended)

The application needs data in MongoDB to display content. You can add data using:

### Method 1: MongoDB Compass (GUI - Easiest)

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to your MongoDB (local or Atlas)
3. Create a database named `portfolio`
4. Create collections and add documents:

**Profile Collection:**
```json
{
  "name": "Your Name",
  "title": "Full Stack Developer",
  "bio": "A passionate developer creating amazing web experiences.",
  "socialLinks": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "your.email@example.com"
  }
}
```

**Skills Collection:**
```json
[
  {
    "name": "JavaScript",
    "category": "Frontend",
    "proficiencyLevel": 90
  },
  {
    "name": "Node.js",
    "category": "Backend",
    "proficiencyLevel": 85
  },
  {
    "name": "MongoDB",
    "category": "Database",
    "proficiencyLevel": 80
  }
]
```

**Projects Collection:**
```json
[
  {
    "title": "E-Commerce Platform",
    "description": "A full-stack e-commerce solution with payment integration.",
    "techStack": ["React", "Node.js", "MongoDB"],
    "projectLink": "https://example.com",
    "githubLink": "https://github.com/username/project",
    "imageUrl": ""
  }
]
```

### Method 2: MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Use the portfolio database
use portfolio

# Insert profile
db.profiles.insertOne({
  name: "Your Name",
  title: "Full Stack Developer",
  bio: "A passionate developer...",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  }
})

# Insert skills
db.skills.insertMany([
  { name: "JavaScript", category: "Frontend", proficiencyLevel: 90 },
  { name: "Node.js", category: "Backend", proficiencyLevel: 85 }
])

# Insert projects
db.projects.insertOne({
  title: "My Project",
  description: "Project description...",
  techStack: ["React", "Node.js"],
  projectLink: "https://example.com",
  githubLink: "https://github.com/username/project"
})
```

### Method 3: API Endpoints (After server is running)

You can use tools like Postman or curl to add data via API, or create a simple script.

---

## Step 7: Test the Application

1. **Home Page:** http://localhost:5000
   - Should display your profile information

2. **About Page:** http://localhost:5000/about.html
   - Should show your bio and details

3. **Skills Page:** http://localhost:5000/skills.html
   - Should display your skills with progress bars

4. **Projects Page:** http://localhost:5000/projects.html
   - Should show your projects

5. **Contact Page:** http://localhost:5000/contact.html
   - Try submitting the contact form
   - Check MongoDB to see if the message was saved

6. **API Endpoints:**
   - http://localhost:5000/api/profile
   - http://localhost:5000/api/skills
   - http://localhost:5000/api/projects

---

## Troubleshooting

### Issue: "Cannot find module" error
**Solution:** Make sure you ran `npm install` in the project directory.

### Issue: "MongoDB connection error"
**Solution:**
- Check if MongoDB is running: `sudo systemctl status mongod` (Linux)
- Verify `MONGODB_URI` in `.env` is correct
- For Atlas, ensure your IP is whitelisted in Network Access

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill
# Or change PORT in .env to another number like 5001
```

### Issue: "Email not sending"
**Solution:**
- Verify you're using an App Password (not regular password) for Gmail
- Check email credentials in `.env`
- Email is optional - contact form will still work and save to database

### Issue: Pages show "Loading..." or empty
**Solution:**
- Add data to MongoDB (see Step 6)
- Check browser console for errors (F12)
- Verify API endpoints are working: http://localhost:5000/api/profile

---

## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your settings

# 3. Start MongoDB (if local)
sudo systemctl start mongod

# 4. Run the application
npm run dev

# 5. Open browser
# http://localhost:5000

# 6. Add data to MongoDB (see Step 6 above)
```

---

## Next Steps

- Customize the HTML/CSS to match your style
- Add your real projects, skills, and profile information
- Set up email for contact form notifications
- Deploy to production (see README.md for deployment options)

---

**Need Help?** Check the main README.md file for more detailed information.
