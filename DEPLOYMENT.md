# 🚀 Pre-Deployment Checklist

Before pushing to GitHub and deploying to Vercel, make sure you've completed these steps:

## Required Updates

### 1. Calendly Integration
- [ ] Update `YOUR_CALENDLY_LINK` in `index.html` (line ~273)
- [ ] Test that the Calendly embed works

### 2. Contact Information
- [ ] Update email address in `contact.html` 
- [ ] Change from `contact@ttwenterprises.com` to your real email

### 3. Testimonial Images
- [ ] Add 6 testimonial images to the `testimonials/` folder
- [ ] Name them exactly: `testimonial-1.jpg` through `testimonial-6.jpg`
- [ ] Optimize images (under 500KB each recommended)

### 4. Lead Magnet Form (Optional)
- [ ] Set up email service provider (ConvertKit, Mailchimp, etc.)
- [ ] Update form submission code in `email-subject-lines.html` (line ~641)
- [ ] Replace the commented API endpoint with your actual endpoint
- [ ] Test form submission

## GitHub Setup

### 5. Create Repository
```bash
cd ttw-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [YOUR_GITHUB_REPO_URL]
git push -u origin main
```

## Vercel Deployment

### 6. Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy" (no configuration needed)

### 7. Custom Domain (Optional)
- [ ] Add your custom domain in Vercel settings
- [ ] Update DNS records as instructed by Vercel

## Testing After Deployment

### 8. Post-Deployment Checks
- [ ] Visit all pages: Home, Reviews, Contact, Email Landing
- [ ] Test navigation between pages
- [ ] Verify images load correctly
- [ ] Test Calendly booking widget
- [ ] Test form submission (if integrated)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers

## Files Overview

✅ **Core Files (All Present)**
- index.html - Homepage
- reviews.html - Reviews page
- contact.html - Contact page
- email-subject-lines.html - Lead magnet landing page
- header.js - Universal navigation
- book-cover.png - Lead magnet book image

✅ **Configuration Files**
- vercel.json - Vercel deployment config
- .gitignore - Git ignore rules
- README.md - Project documentation

📁 **Assets to Add**
- testimonials/ - Add your 6 testimonial images here

---

## Quick Deploy Commands

```bash
# If you haven't initialized git yet:
git init
git add .
git commit -m "Initial website deployment"
git branch -M main

# Add your GitHub remote:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# Then deploy via Vercel dashboard or CLI:
# npm i -g vercel
# vercel
```

---

**Need Help?** Check the main README.md for detailed instructions.
