# Personal Portfolio Website

A complete, production-ready full-stack personal portfolio website built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Features

- **Fully Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Dynamic Content**: Backend-driven content management via RESTful APIs
- **Contact Form**: Validated contact form with email notifications
- **Clean Architecture**: MVC pattern with separation of concerns
- **Production Ready**: Environment-based configuration and error handling

## 📋 Tech Stack

### Frontend
- HTML5
- CSS3 (Mobile-first, Responsive)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer (Email service)

## 📁 Project Structure

```
Portfolio/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── profileController.js
│   ├── skillController.js
│   ├── projectController.js
│   └── contactController.js
├── middlewares/
│   ├── errorHandler.js      # Centralized error handling
│   └── logger.js            # Request logging
├── models/
│   ├── Profile.js
│   ├── Skill.js
│   ├── Project.js
│   └── Contact.js
├── routes/
│   ├── profile.js
│   ├── skills.js
│   ├── projects.js
│   └── contact.js
├── services/
│   └── emailService.js      # Email sending service
├── utils/
│   └── validators.js        # Input validation
├── public/
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js          # Common utilities
│   │   ├── home.js
│   │   ├── about.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── contact.js
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   └── contact.html
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone or Download
```bash
cd Portfolio
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

### Step 4: Start MongoDB
If using local MongoDB:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`.

### Step 5: Run the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📝 Database Setup

The application will automatically create collections when you first use the APIs. However, you can seed initial data using MongoDB Compass, MongoDB Shell, or API calls.

### Example: Creating Initial Data

**Profile:**
```javascript
// Use MongoDB Compass or shell
db.profiles.insertOne({
  name: "Your Name",
  title: "Full Stack Developer",
  bio: "A passionate developer...",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "your.email@example.com"
  }
})
```

**Skills:**
```javascript
db.skills.insertMany([
  {
    name: "JavaScript",
    category: "Frontend",
    proficiencyLevel: 90
  },
  {
    name: "Node.js",
    category: "Backend",
    proficiencyLevel: 85
  }
])
```

**Projects:**
```javascript
db.projects.insertOne({
  title: "Project Name",
  description: "Project description...",
  techStack: ["React", "Node.js", "MongoDB"],
  projectLink: "https://project-demo.com",
  githubLink: "https://github.com/username/project",
  imageUrl: "https://example.com/image.jpg"
})
```

## 🌐 API Endpoints

### Profile
- `GET /api/profile` - Get profile data

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills?category=Frontend` - Get skills by category

### Projects
- `GET /api/projects` - Get all projects

### Contact
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'd like to connect!"
  }
  ```

## 🚢 Deployment

### Option 1: Render.com

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `CONTACT_EMAIL`
   - `PORT` (Render will set this automatically)
7. Deploy!

### Option 2: Railway

1. Push your code to GitHub
2. Create a new project on Railway
3. Connect your GitHub repository
4. Railway will auto-detect Node.js
5. Add environment variables in Railway dashboard
6. Deploy!

### Option 3: VPS (Ubuntu/Debian)

1. SSH into your server
2. Install Node.js and MongoDB:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb
```

3. Clone your repository:
```bash
git clone your-repo-url
cd Portfolio
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
nano .env  # Edit with your values
```

5. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name portfolio
pm2 save
pm2 startup
```

6. Set up Nginx reverse proxy (optional):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Validate all inputs** - Both client and server-side
4. **Use HTTPS** in production
5. **Keep dependencies updated**: `npm audit` and `npm update`
6. **Use App Passwords** for Gmail (not regular passwords)

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in `EMAIL_PASSWORD`

### Other Email Providers
- **Outlook**: `smtp-mail.outlook.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- Check your provider's SMTP settings

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod --version`
- Check `MONGODB_URI` in `.env`
- For Atlas, ensure your IP is whitelisted

### Email Not Sending
- Verify email credentials in `.env`
- For Gmail, use App Password, not regular password
- Check firewall/network restrictions
- Verify SMTP settings match your provider

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process: `lsof -ti:3000 | xargs kill`

## 📄 License

MIT License - feel free to use this project for your portfolio!

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own portfolio!

## 📞 Support

For issues or questions, please open an issue on GitHub or contact through the portfolio contact form.

---

**Built with ❤️ using modern web technologies**
