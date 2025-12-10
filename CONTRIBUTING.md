# Contributing to Portfolio Website

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 🤝 Code of Conduct

This project follows a Code of Conduct that all contributors are expected to adhere to. Please be respectful and constructive in your interactions.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser and OS** information

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the enhancement
- **Use case** explaining why it would be useful
- **Examples** of how it would work

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 🛠️ Development Setup

1. Clone your fork:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Start a local server:
```bash
python -m http.server 8000
```

3. Open `http://localhost:8000` in your browser

## 📝 Pull Request Process

1. Update the README.md with details of changes if needed
2. Ensure all files are properly formatted
3. Test your changes across different browsers
4. Update documentation for any new features
5. Your PR will be reviewed and merged if approved

## 🎨 Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add descriptive alt text for images
- Include ARIA labels for accessibility

### CSS
- Follow BEM naming convention where applicable
- Group related styles together
- Add comments for complex styling
- Use CSS custom properties for repeated values
- Maintain consistent spacing

### JavaScript
- Use ES6+ features
- Add comments for complex logic
- Follow consistent naming conventions
- Handle errors appropriately
- Optimize for performance

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Update, Fix, Remove)
- Keep the first line under 50 characters
- Add detailed description if needed

Example:
```
Add responsive navigation for mobile devices

- Implemented hamburger menu
- Added smooth transitions
- Tested on various screen sizes
```

## 🧪 Testing

Before submitting a PR, please test:

- ✅ All links work correctly
- ✅ Responsive design on mobile/tablet/desktop
- ✅ Cross-browser compatibility
- ✅ 3D avatar loads properly
- ✅ Animations work smoothly
- ✅ No console errors

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

## 🙋 Questions?

Feel free to open an issue for any questions or clarifications.

---

Thank you for contributing! 🎉
