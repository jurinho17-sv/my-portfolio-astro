import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { allLocales, themeConfig } from '@/config'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    // Required fields
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    published: z.date(),
    author: z.string().optional().default('Ju Ho Kim'),
    
    // Optional fields
    updated: z.preprocess(
      val => val === '' ? undefined : val,
      z.date().optional(),
    ),
    tags: z.array(z.string()).optional().default([]),
    category: z.enum(['technology', 'personal', 'tutorial', 'project']).optional().default('technology'),
    
    // SEO and social
    image: z.string().optional(), // Featured image for social sharing
    excerpt: z.string().optional(), // Custom excerpt for post previews
    
    // Advanced options
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    pin: z.number().int().min(0).max(99).optional().default(0),
    toc: z.boolean().optional().default(themeConfig.global.toc),
    readingTime: z.number().optional(), // Will be auto-calculated
    lang: z.enum(['', ...allLocales]).optional().default(''),
    
    // URL customization
    slug: z.string().optional().refine(
      slug => !slug || /^[a-z0-9\-]*$/.test(slug),
      { message: 'Slug can only contain lowercase letters, numbers and hyphens' },
    ),
    abbrlink: z.string().optional().default('').refine(
      abbrlink => !abbrlink || /^[a-z0-9\-]*$/.test(abbrlink),
      { message: 'Abbrlink can only contain lowercase letters, numbers and hyphens' },
    ),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    lang: z.enum(['', ...allLocales]).optional().default(''),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    // Required fields
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    published: z.date(),
    
    // Project details
    status: z.enum(['completed', 'in-progress', 'planned', 'archived']).optional().default('completed'),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
    category: z.enum(['web', 'mobile', 'desktop', 'data-science', 'ai-ml', 'other']).optional().default('web'),
    
    // Links and resources
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    documentation: z.string().url().optional(),
    
    // Media and presentation
    image: z.string().optional(), // Main project image
    gallery: z.array(z.string()).optional().default([]), // Additional screenshots
    video: z.string().url().optional(), // Demo video
    
    // Project metadata
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    teamSize: z.number().int().min(1).max(20).optional().default(1),
    role: z.string().optional().default('Full Stack Developer'),
    
    // Organization and visibility
    featured: z.boolean().optional().default(false),
    priority: z.number().int().min(1).max(10).optional().default(5),
    client: z.string().optional(), // For freelance/client work
    
    // Technical details
    challenges: z.array(z.string()).optional().default([]),
    learnings: z.array(z.string()).optional().default([]),
    
    // Advanced options
    draft: z.boolean().optional().default(false),
    lang: z.enum(['', ...allLocales]).optional().default(''),
    
    // SEO
    slug: z.string().optional().refine(
      slug => !slug || /^[a-z0-9\-]*$/.test(slug),
      { message: 'Slug can only contain lowercase letters, numbers and hyphens' },
    ),
  }),
})

export const collections = { posts, about, projects }
