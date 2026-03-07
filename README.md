# TTW Enterprises Website

A professional copywriting services website built with vanilla HTML, CSS, and JavaScript.

## 🚀 Quick Start

### Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically deploy your site.

### Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click Save

Your site will be live at `https://[username].github.io/[repository-name]/`

## 📁 File Structure

```
ttw-website/
├── index.html                    # Main homepage
├── reviews.html                  # Client reviews page
├── contact.html                  # Contact page
├── email-subject-lines.html      # Lead magnet landing page
├── header.js                     # Universal navigation header
├── book-cover.png               # Book cover image for lead magnet
├── testimonials/                # Folder for testimonial images
│   ├── testimonial-1.jpg
│   ├── testimonial-2.jpg
│   ├── testimonial-3.jpg
│   ├── testimonial-4.jpg
│   ├── testimonial-5.jpg
│   └── testimonial-6.jpg
└── README.md                    # This file
```

## ⚙️ Configuration

### Update Calendly Link

In `index.html`, find this line (around line 273):
```html
<div class="calendly-inline-widget" data-url="YOUR_CALENDLY_LINK" ...>
```

Replace `YOUR_CALENDLY_LINK` with your actual Calendly scheduling link.

### Add Testimonial Images

Place your testimonial images in the `testimonials/` folder with these filenames:
- `testimonial-1.jpg`
- `testimonial-2.jpg`
- `testimonial-3.jpg`
- `testimonial-4.jpg`
- `testimonial-5.jpg`
- `testimonial-6.jpg`

### Update Contact Email

In `contact.html`, update the email address:
```html
<a href="mailto:contact@ttwenterprises.com">contact@ttwenterprises.com</a>
```

## 🎨 Pages Overview

### Homepage (`index.html`)
- Hero section with value proposition
- Feature cards highlighting services
- Stats section
- Calendly booking integration
- Universal navigation header

### Reviews (`reviews.html`)
- Client testimonials display
- Grid layout for testimonial images
- CTA to book a call

### Email Lead Magnet (`email-subject-lines.html`)
- Standalone landing page for lead generation
- Book cover display
- Email capture form
- Success message on submission

### Contact (`contact.html`)
- Simple contact information
- CTA to book a call

## 🔧 Customization

All files use relative paths and will work on any hosting platform. The design uses:
- Dark theme with red/gold accent colors
- Responsive design (mobile-friendly)
- Modern CSS gradients and animations
- No external dependencies (except Google Fonts for email page)

## 📝 Notes

- The email form currently logs to console - integrate with your email service provider
- All navigation links use relative paths (works on GitHub Pages and Vercel)
- The header is injected via JavaScript for easy updates across all pages

## 🐛 Troubleshooting

### Images not showing?
Make sure image files are in the correct folders with exact filenames.

### Header not appearing?
Check that `header.js` is in the same folder as your HTML files.

### Navigation links broken?
Ensure all HTML files are in the root folder of the project.
