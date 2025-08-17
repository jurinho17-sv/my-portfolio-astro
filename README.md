# Ju Ho Kim's Portfolio Website

A modern, responsive portfolio website built with Astro and featuring UC Berkeley branding.

## 🌟 Features

- **Static Site Generation**: Built with Astro for optimal performance
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Content Collections**: Organized blog posts and projects with TypeScript validation
- **UC Berkeley Branding**: Official colors (Berkeley Blue #003262, California Gold #FDB515)
- **SEO Optimized**: Meta tags, sitemap, and RSS feeds
- **Modern Tech Stack**: TypeScript, UnoCSS, and Markdown support

## 🏗️ Project Structure

```
├── src/
│   ├── components/         # Reusable UI components
│   ├── content/           # Content collections (blog, projects)
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   ├── styles/            # Global styles
│   └── config.ts          # Site configuration
├── public/                # Static assets
└── astro.config.ts        # Astro configuration
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-portfolio-astro.git
   cd my-portfolio-astro
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📝 Content Management

### Adding Blog Posts

Create a new Markdown file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
published: 2024-01-01
tags: ["technology", "web-development"]
---

Your post content here...
```

### Adding Projects

Create a new Markdown file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "Project description"
published: 2024-01-01
technologies: ["React", "TypeScript", "Node.js"]
github: "https://github.com/username/repo"
demo: "https://project-demo.com"
featured: true
---

Project details and documentation...
```

## 🎨 Customization

### Site Configuration

Edit `src/config.ts` to update:
- Site title and description
- Author information
- Social media links
- Theme colors

### Styling

The site uses UnoCSS for styling. Key files:
- `src/styles/global.css` - Global styles
- `uno.config.ts` - UnoCSS configuration

## 🚀 Deployment

This site is configured for easy deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy

### Environment Variables

For production deployment, set these environment variables:
- `SITE_URL`: Your production domain
- `GOOGLE_ANALYTICS_ID`: (Optional) Google Analytics tracking ID

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ju Ho Kim**
- GitHub: [@jurinho17-sv](https://github.com/jurinho17-sv)
- LinkedIn: [Justin Kim](https://www.linkedin.com/in/justinkim-sv/)
- Email: juho_kim@berkeley.edu

---

Built with ❤️ at UC Berkeley