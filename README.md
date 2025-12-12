# Portfolio Website - Yash Jain

A modern, interactive portfolio website featuring a 3D avatar, smooth animations, and showcase of my projects.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

## 🚀 Live Demo

Visit the live portfolio: 

## ✨ Features

- **3D Interactive Avatar**: Built with Three.js for an immersive experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: CSS animations and transitions for better UX
- **Project Showcase**: Interactive project cards with live demos
- **Modern UI/UX**: Clean, professional design with attention to detail
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive functionality
- **Three.js**: 3D graphics and avatar rendering

### Deployment
- **Vercel**: Fast, reliable hosting with continuous deployment
- **Git**: Version control

### Modern JavaScript (ES6+)
- **Intersection Observer API**: Performance-optimized scroll animations
- **RequestAnimationFrame**: Butter-smooth 60fps animations
- **Event Delegation**: Efficient DOM manipulation

## 📂 Project Structure

```
portfolio/
├── index.html           # Main HTML file
├── styles.css           # All CSS styles
├── script.js            # JavaScript functionality
├── avatar-final.js      # Three.js 3D avatar logic
├── 46936_autosave.glb   # 3D model file
├── mess-management-app.png  # Project screenshot
├── vercel.json          # Vercel configuration
├── package.json         # Project dependencies
└── README.md            # This file
```

## 🎯 Key Projects Featured

### 1. E-commerce Dashboard
- **Tech Stack**: React 18, Next.js, JavaScript
- **Description**: Modern e-commerce platform for dog lovers
- **Live Demo**: [https://doggy-stickers0074.vercel.app/](https://doggy-stickers0074.vercel.app/)

### 2. Mess Management System
- **Tech Stack**: Python, Streamlit
- **Description**: Interactive mess management application with real-time updates
- **Live Demo**: [Streamlit App](https://yashjaingit0074-mess-management1-app-streamlit-nwbqv4.streamlit.app/)

### 3. Crowdcraft Analysis
- **Tech Stack**: Python, Streamlit, Data Analysis
- **Description**: Full-stack social platform with data visualization
- **Live Demo**: [Streamlit App](https://crowdcraft-analysis-6tqhdmha6lq96b83o2fqvw.streamlit.app/)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server for development (optional)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YashJaingit0074/portfolio001.git
cd portfolio001
```

2. **Run a local server:**
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using VS Code Live Server
# Right-click index.html and select "Open with Live Server"
```

3. **Open your browser and navigate to:**
```
http://localhost:8000
```

## 📦 Deployment

### Deploy to Vercel (GitHub Integration - Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New → Project**
3. Click **Import Git Repository**
4. Search for `YashJaingit0074/portfolio001`
5. Click **Import**
6. Click **Deploy**

✅ **Auto-deployment**: Every push to `main` automatically deploys!

### Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

## 💻 Development

### Local Development

The portfolio uses vanilla JavaScript and doesn't require a build process. Simply edit the files and refresh your browser.

### File Modifications
- **HTML**: Edit `index.html` for content changes
- **Styles**: Modify `styles.css` for styling updates
- **3D Avatar**: Adjust `avatar-final.js` for 3D model settings
- **Interactivity**: Update `script.js` for functionality changes

## 🎨 Customization

### Update Personal Information

Edit the following sections in `index.html`:
- Hero section (Name, tagline)
- About section (Bio, skills)
- Contact information
- Social media links

### Modify 3D Avatar

Adjust lighting and camera settings in `avatar-final.js`:

```javascript
// Camera position
camera.position.set(0, 1, 3);

// Lighting intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
```

### Add New Projects

Add project cards in the Work section of `index.html`:

```html
<div class="project-item">
  <div class="project-image">
    <img src="your-image.jpg" alt="Project Name">
    <div class="project-overlay">
      <a href="your-link" target="_blank" class="project-link">
        <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
  </div>
  <div class="project-info">
    <h3>Project Name</h3>
    <p>Description</p>
    <div class="project-tags">
      <span>Tag1</span>
      <span>Tag2</span>
    </div>
  </div>
</div>
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 👤 Contact

**Yash Jain**

- 💼 LinkedIn: [linkedin.com/in/yash-jain-31a3242a8](https://www.linkedin.com/in/yash-jain-31a3242a8/)
- 📧 Email: jainyash0074@gmail.com
- 🌐 Portfolio: 
- 🐱 GitHub: [github.com/YashJaingit0074](https://github.com/YashJaingit0074)

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D rendering capabilities
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Unsplash](https://unsplash.com/) for placeholder images

## 🚀 Potential Upgrades

- **WebXR Integration**: Virtual reality portfolio exploration
- **AI-Powered Interactions**: Chatbot integration with 3D avatar
- **Progressive Web App**: Offline functionality and app-like experience
- **Data Visualization**: Interactive charts and graphs in 3D space

## 📚 Learning Resources

### To Master These Technologies

**Three.js Mastery Path**
- 📖 [Three.js Journey](https://threejs-journey.com/) - Comprehensive course
- 🎮 [Three.js Examples](https://threejs.org/examples/) - Official examples

**Advanced CSS & Animation**
- 🎨 [CSS Animation Rocks](https://cssanimation.rocks/)
- 🎭 [Anime.js](https://animejs.com/) - JavaScript animation library

**Performance Optimization**
- ⚡ [Web.dev](https://web.dev/) - Google's performance guides
- 📊 [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing

---

## ⭐ Star this repo if you found it helpful!

---

**Built with ❤️ by Yash Jain**

*"The web is not just a platform—it's a playground for dreamers and builders."*
