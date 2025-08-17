import type { CollectionEntry } from 'astro:content'

// Blog post types
export type BlogPost = CollectionEntry<'posts'>
export type BlogPostData = BlogPost['data']

export interface BlogPostWithSlug extends BlogPost {
  slug: string
}

export type BlogCategory = 'technology' | 'personal' | 'tutorial' | 'project'

// Project types
export type Project = CollectionEntry<'projects'>
export type ProjectData = Project['data']

export interface ProjectWithSlug extends Project {
  slug: string
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived'
export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'data-science' | 'ai-ml' | 'other'

// About page types
export type AboutPage = CollectionEntry<'about'>
export type AboutPageData = AboutPage['data']

// Common interfaces for CMS
export interface ContentTemplate {
  frontmatter: string
  content: string
}

export interface CreatePostData {
  title: string
  description: string
  category: BlogCategory
  tags: string[]
  draft?: boolean
  featured?: boolean
}

export interface CreateProjectData {
  title: string
  description: string
  technologies: string[]
  category: ProjectCategory
  status: ProjectStatus
  github?: string
  demo?: string
  draft?: boolean
  featured?: boolean
}

// Search and filtering
export interface SearchFilters {
  category?: string
  tags?: string[]
  status?: ProjectStatus
  featured?: boolean
  draft?: boolean
}

export interface SortOptions {
  field: 'published' | 'updated' | 'title' | 'priority'
  direction: 'asc' | 'desc'
}

// Navigation and pagination
export interface PaginationData {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  hasNext: boolean
  hasPrev: boolean
}

export interface NavigationItem {
  title: string
  href: string
  active?: boolean
  children?: NavigationItem[]
}

// SEO and metadata
export interface SEOData {
  title: string
  description: string
  image?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  type?: 'article' | 'website'
}

// Admin interface types
export interface AdminStats {
  totalPosts: number
  totalProjects: number
  draftPosts: number
  draftProjects: number
  featuredPosts: number
  featuredProjects: number
  recentActivity: Array<{
    type: 'post' | 'project'
    action: 'created' | 'updated' | 'published'
    title: string
    date: Date
  }>
}

export interface EditorState {
  content: string
  frontmatter: Record<string, any>
  isDirty: boolean
  isPreview: boolean
  isAutoSave: boolean
}

// API response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface FileUploadResponse {
  success: boolean
  url?: string
  filename?: string
  error?: string
}

// Theme and styling
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  highlight: string
}

export interface ResponsiveBreakpoints {
  sm: number
  md: number
  lg: number
  xl: number
}
