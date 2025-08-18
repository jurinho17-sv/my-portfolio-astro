---
title: "How to Write and Upload Blog Posts"
publishDate: 2025-01-18
description: "A complete guide to creating, writing, and publishing blog posts on your Astro portfolio website"
tags: ["guide", "blogging", "markdown", "tutorial"]
draft: false
---

# How to Write and Upload Blog Posts

This guide will walk you through the complete process of creating and publishing blog posts on your Astro portfolio website.

## Prerequisites

- Basic understanding of Markdown syntax
- Text editor (VS Code, Sublime Text, etc.)
- Git installed on your computer
- Access to your portfolio repository

## Step 1: Create a New Blog Post File

### File Location
All blog posts are stored in the `/src/content/posts/` directory.

### File Naming Convention
- Use kebab-case (lowercase with hyphens)
- Include the date or make it descriptive
- Always use `.md` extension

**Examples:**
- `my-first-project.md`
- `learning-react-hooks.md`
- `2025-year-in-review.md`

### Creating the File
```bash
# Navigate to your project directory
cd /path/to/your/portfolio

# Create a new blog post file
touch src/content/posts/your-post-name.md
```

## Step 2: Set Up the Frontmatter

Every blog post must start with frontmatter (metadata) enclosed in `---`:

```markdown
---
title: "Your Post Title"
publishDate: 2025-01-18
description: "A brief description of your post for SEO and previews"
tags: ["tag1", "tag2", "tag3"]
draft: false
updatedDate: 2025-01-20  # Optional: only if you update the post
pin: 1                   # Optional: pin to top (1-99, higher = more priority)
toc: true               # Optional: show table of contents
---
```

### Frontmatter Fields Explained

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `title` | ✅ | String | The title of your blog post |
| `publishDate` | ✅ | Date | Publication date (YYYY-MM-DD) |
| `description` | ❌ | String | Brief description for SEO and previews |
| `tags` | ❌ | Array | Tags for categorization |
| `draft` | ❌ | Boolean | Set to `true` to hide from public |
| `updatedDate` | ❌ | Date | Date when post was last updated |
| `pin` | ❌ | Number | Pin post to top (1-99) |
| `toc` | ❌ | Boolean | Show table of contents |

## Step 3: Write Your Content

After the frontmatter, write your content using Markdown syntax.

### Basic Markdown Syntax

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

- Unordered list item
- Another item

1. Ordered list item
2. Another item

[Link text](https://example.com)

![Image alt text](/path/to/image.jpg)
```

### Code Blocks

Use triple backticks with language specification:

````markdown
```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
```

```css
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}
```
````

### Adding Images

1. **Place images in the public folder:**
   ```
   public/
     images/
       blog/
         your-image.jpg
   ```

2. **Reference in your markdown:**
   ```markdown
   ![Description of image](/images/blog/your-image.jpg)
   ```

### Mathematical Expressions

You can use KaTeX for mathematical expressions:

```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## Step 4: Preview Your Post

To preview your post locally:

```bash
# Start the development server
pnpm run dev --port 5000

# Open in browser
open http://localhost:5000/
```

Your new post should appear on the blog page. Click on it to see the full content.

## Step 5: Publish Your Post

### Using Git (Recommended)

```bash
# Add your new post
git add src/content/posts/your-post-name.md

# Commit with a descriptive message
git commit -m "Add new blog post: Your Post Title"

# Push to your repository
git push origin main
```

### Direct Upload

If you're using a hosting service like Netlify or Vercel that's connected to your Git repository, your site will automatically rebuild and deploy when you push changes.

## Example Complete Blog Post

Here's a complete example of a blog post file:

```markdown
---
title: "My Experience Learning TypeScript"
publishDate: 2025-01-15
description: "Sharing my journey from JavaScript to TypeScript and the lessons learned along the way"
tags: ["typescript", "javascript", "learning", "development"]
draft: false
pin: 2
---

# My Experience Learning TypeScript

Learning TypeScript has been one of the most rewarding decisions in my development journey. Here's what I discovered along the way.

## Why I Started Learning TypeScript

JavaScript is great, but as projects grow larger, the lack of type safety becomes a challenge. TypeScript offers:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Code Documentation**: Types serve as documentation

## Getting Started

The first step was setting up a TypeScript project:

\`\`\`bash
npm install -g typescript
tsc --init
\`\`\`

## Key Concepts I Learned

### 1. Basic Types

\`\`\`typescript
let name: string = "John";
let age: number = 30;
let isStudent: boolean = true;
\`\`\`

### 2. Interfaces

\`\`\`typescript
interface User {
  name: string;
  email: string;
  age?: number; // Optional property
}
\`\`\`

## Conclusion

TypeScript significantly improved my code quality and development experience. I highly recommend it to any JavaScript developer looking to level up their skills.

## Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
```

## Tips for Great Blog Posts

1. **Write engaging titles** that clearly describe the content
2. **Use descriptive tags** to help readers find related content
3. **Include code examples** when discussing technical topics
4. **Break up long content** with headings and lists
5. **Add a clear conclusion** summarizing key points
6. **Proofread before publishing** to catch typos and errors

## Troubleshooting

### Common Issues

**Post not showing up?**
- Check that `draft: false` in frontmatter
- Ensure the file is in `/src/content/posts/`
- Restart the development server

**Images not loading?**
- Verify images are in the `public/` directory
- Check the file path in your markdown
- Ensure proper image file extensions (.jpg, .png, .webp)

**Build errors?**
- Validate your frontmatter syntax
- Check for missing required fields (title, publishDate)
- Ensure date format is YYYY-MM-DD

---

Happy blogging! 🎉
