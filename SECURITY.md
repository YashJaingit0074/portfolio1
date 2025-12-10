# Security Policy

## 🔒 Supported Versions

Currently supported version:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## 🛡️ Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 1. **Do Not** Open a Public Issue
Security vulnerabilities should not be publicly disclosed until they have been addressed.

### 2. Report Privately
Send an email to: **yash@example.com** with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Time
- You will receive an acknowledgment within **48 hours**
- We will provide a detailed response within **7 days**
- We will work on a fix and keep you updated

### 4. Responsible Disclosure
- Please allow us reasonable time to address the issue
- We will credit you in the fix (unless you prefer to remain anonymous)
- Once fixed, we will publish a security advisory

## 🔐 Security Best Practices

This portfolio follows these security practices:

### Frontend Security
- ✅ No sensitive data stored in client-side code
- ✅ External links use `rel="noopener noreferrer"`
- ✅ HTTPS enforced on deployment
- ✅ No inline JavaScript execution
- ✅ Content Security Policy headers

### Deployment Security
- ✅ Hosted on Vercel with SSL/TLS
- ✅ Automated security updates
- ✅ Environment variables for sensitive data
- ✅ Regular dependency updates

### Third-party Resources
- ✅ CDN resources loaded over HTTPS
- ✅ Trusted sources only (Google Fonts, Font Awesome)
- ✅ No untrusted external scripts

## 🚨 Known Security Considerations

1. **Contact Form**: Currently client-side only. For production, implement server-side validation and rate limiting.
2. **Email Links**: Email addresses are visible in HTML. Consider using a contact form service.

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Guidelines](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Vercel Security](https://vercel.com/security)

## 🔄 Updates

This security policy will be updated as the project evolves. Last updated: December 10, 2025.

---

Thank you for helping keep this project secure! 🙏
