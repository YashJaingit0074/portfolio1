# Portfolio Website - Yash Jain

A modern, interactive portfolio website featuring a 3D avatar, smooth animations, and showcase of my projects.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)

## 🚀 Live Demo

Visit the live portfolio: [Your Vercel URL here]

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

#### **Modern JavaScript (ES6+)**
- **Intersection Observer API**: Performance-optimized scroll animations
- **RequestAnimationFrame**: Butter-smooth 60fps animations
- **Event Delegation**: Efficient DOM manipulation

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── avatar.js           # Three.js 3D avatar logic
├── public/
│   └── 46936_autosave.glb  # 3D model file
├── assets/
│   └── mess-management-app.png  # Project screenshots
├── vercel.json         # Vercel configuration
├── README.md           # This file
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── CHANGELOG.md        # Version history
└── SECURITY.md         # Security policy
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
- **Design Studios** needing technical implementation of creative concepts
- **Entertainment Companies** requiring engaging digital experiences


## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server for development (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Run a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using VS Code Live Server
# Right-click index.html and select "Open with Live Server"
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 📦 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

Alternatively, deploy via GitHub:
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Deploy with one click

## 💻 Development

### Local Development
The portfolio uses vanilla JavaScript and doesn't require a build process. Simply edit the files and refresh your browser.

### File Modifications
- **HTML**: Edit `index.html` for content changes
- **Styles**: Modify `styles.css` for styling updates
- **3D Avatar**: Adjust `avatar.js` for 3D model settings
- **Interactivity**: Update `script.js` for functionality changes

## 🎨 Customization

### Update Personal Information
Edit the following sections in `index.html`:
- Hero section (Name, tagline)
- About section (Bio, skills)
- Contact information
- Social media links

### Modify 3D Avatar
Adjust lighting and camera settings in `avatar.js`:
```javascript
// Camera position
camera.position.set(0, 1, 4);

// Lighting intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
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

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

**Yash Jain**
- LinkedIn: [linkedin.com/in/yash-jain-31a3242a8](https://www.linkedin.com/in/yash-jain-31a3242a8/)
- Email: yash@example.com
- Portfolio: [Your Vercel URL]

## 🙏 Acknowledgments

- Three.js for 3D rendering capabilities
- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images

---

⭐ **Star this repo if you found it helpful!**

Built with ❤️ by Yash Jain

### **Potential Upgrades**
- **WebXR Integration**: Virtual reality portfolio exploration
- **AI-Powered Interactions**: Chatbot integration with 3D avatar
- **Real-Time Collaboration**: Multiplayer portfolio exploration
- **Data Visualization**: Interactive charts and graphs in 3D space
- **Progressive Web App**: Offline functionality and app-like experience

### **Learning Opportunities**
- **Shader Programming**: Custom visual effects with WebGL shaders
- **Physics Simulation**: Realistic particle physics with Cannon.js
- **Machine Learning**: TensorFlow.js integration for interactive AI features
- **Web Audio API**: Spatial audio to accompany 3D visuals

---

## 📚 **Learning Resources & Next Steps**

### **To Master These Technologies**

#### **Three.js Mastery Path**
1. 📖 [Three.js Journey](https://threejs-journey.com/) - Comprehensive course
2. 🎮 [Three.js Examples](https://threejs.org/examples/) - Official examples
3. 💡 [Bruno Simon's Portfolio](https://bruno-simon.com/) - Inspiration source

#### **Advanced CSS & Animation**
1. 🎨 [CSS Animation Rocks](https://cssanimation.rocks/)
2. 🎭 [Animejs](https://animejs.com/) - JavaScript animation library
3. 🌈 [UI Movement](https://uimovement.com/) - Animation inspiration

#### **Performance Optimization**
1. ⚡ [Web.dev](https://web.dev/performance/) - Google's performance guides
2. 🔍 [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging mastery
3. 📊 [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing

---

## 🎉 **Final Thoughts**

This portfolio represents more than just technical skills—it's a statement of **creative ambition** and **technical excellence**. In a world where first impressions matter more than ever, this project doesn't just showcase what you can build; it shows **who you are as a developer**.

Every line of code, every animation, every interaction has been crafted with one goal: to create something that makes people stop and say, *"How did they do that?"*

**Because in the end, the best portfolios don't just show your work—they show your vision for what the web can become.**

---

*Built with 💙 by a developer who believes that code is poetry and the web is our canvas.*

## 📞 **Get In Touch**

Ready to create something amazing together? Let's build the future, one pixel at a time.

- 💌 **Email**: yash@example.com
- 💼 **LinkedIn**: [Your LinkedIn Profile]
- 🐱 **GitHub**: [Your GitHub Profile]
- 🌐 **Portfolio**: [Live Portfolio URL]

---

*"The web is not just a platform—it's a playground for dreamers and builders."*