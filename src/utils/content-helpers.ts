import { getCollection, type CollectionEntry } from 'astro:content'
import type { 
  BlogPost, 
  Project, 
  SearchFilters, 
  SortOptions, 
  PaginationData,
  SEOData 
} from '@/types/content'

// Blog post utilities
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('posts')
  return posts.filter(post => !post.data.draft)
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
}

export async function getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  const featured = posts.filter(post => post.data.featured)
  return limit ? featured.slice(0, limit) : featured
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.filter(post => post.data.tags?.includes(tag))
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.filter(post => post.data.category === category)
}

export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.slice(0, limit)
}

// Project utilities
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects')
  return projects.filter(project => !project.data.draft)
}

export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getAllProjects()
  return projects.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
}

export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  const projects = await getPublishedProjects()
  const featured = projects.filter(project => project.data.featured)
  return limit ? featured.slice(0, limit) : featured
}

export async function getProjectsByStatus(status: string): Promise<Project[]> {
  const projects = await getPublishedProjects()
  return projects.filter(project => project.data.status === status)
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getPublishedProjects()
  return projects.filter(project => project.data.category === category)
}

export async function getProjectsByTechnology(tech: string): Promise<Project[]> {
  const projects = await getPublishedProjects()
  return projects.filter(project => 
    project.data.technologies?.some(t => 
      t.toLowerCase().includes(tech.toLowerCase())
    )
  )
}

// Search and filtering
export async function searchContent(
  query: string, 
  type: 'posts' | 'projects' | 'all' = 'all'
): Promise<(BlogPost | Project)[]> {
  const searchTerms = query.toLowerCase().split(' ')
  
  let results: (BlogPost | Project)[] = []
  
  if (type === 'posts' || type === 'all') {
    const posts = await getPublishedPosts()
    const matchingPosts = posts.filter(post => {
      const searchableText = [
        post.data.title,
        post.data.description,
        post.data.excerpt || '',
        ...(post.data.tags || [])
      ].join(' ').toLowerCase()
      
      return searchTerms.every(term => searchableText.includes(term))
    })
    results = [...results, ...matchingPosts]
  }
  
  if (type === 'projects' || type === 'all') {
    const projects = await getPublishedProjects()
    const matchingProjects = projects.filter(project => {
      const searchableText = [
        project.data.title,
        project.data.description,
        ...(project.data.technologies || [])
      ].join(' ').toLowerCase()
      
      return searchTerms.every(term => searchableText.includes(term))
    })
    results = [...results, ...matchingProjects]
  }
  
  return results
}

export function filterPosts(posts: BlogPost[], filters: SearchFilters): BlogPost[] {
  return posts.filter(post => {
    if (filters.category && post.data.category !== filters.category) return false
    if (filters.tags && !filters.tags.some(tag => post.data.tags?.includes(tag))) return false
    if (filters.featured !== undefined && post.data.featured !== filters.featured) return false
    if (filters.draft !== undefined && post.data.draft !== filters.draft) return false
    return true
  })
}

export function filterProjects(projects: Project[], filters: SearchFilters): Project[] {
  return projects.filter(project => {
    if (filters.category && project.data.category !== filters.category) return false
    if (filters.status && project.data.status !== filters.status) return false
    if (filters.featured !== undefined && project.data.featured !== filters.featured) return false
    if (filters.draft !== undefined && project.data.draft !== filters.draft) return false
    return true
  })
}

// Sorting utilities
export function sortPosts(posts: BlogPost[], options: SortOptions): BlogPost[] {
  return [...posts].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (options.field) {
      case 'published':
        aValue = a.data.published.getTime()
        bValue = b.data.published.getTime()
        break
      case 'updated':
        aValue = a.data.updated?.getTime() || a.data.published.getTime()
        bValue = b.data.updated?.getTime() || b.data.published.getTime()
        break
      case 'title':
        aValue = a.data.title.toLowerCase()
        bValue = b.data.title.toLowerCase()
        break
      default:
        return 0
    }
    
    if (options.direction === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

export function sortProjects(projects: Project[], options: SortOptions): Project[] {
  return [...projects].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (options.field) {
      case 'published':
        aValue = a.data.published.getTime()
        bValue = b.data.published.getTime()
        break
      case 'title':
        aValue = a.data.title.toLowerCase()
        bValue = b.data.title.toLowerCase()
        break
      case 'priority':
        aValue = a.data.priority || 5
        bValue = b.data.priority || 5
        break
      default:
        return 0
    }
    
    if (options.direction === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

// Pagination utilities
export function paginateItems<T>(
  items: T[], 
  currentPage: number, 
  pageSize: number = 10
): { items: T[]; pagination: PaginationData } {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    items: items.slice(startIndex, endIndex),
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    }
  }
}

// SEO utilities
export function generateSEOData(
  post: BlogPost | Project,
  baseUrl: string = ''
): SEOData {
  const isPost = 'collection' in post && post.collection === 'posts'
  
  return {
    title: post.data.title,
    description: post.data.description,
    image: post.data.image ? `${baseUrl}${post.data.image}` : undefined,
    author: isPost ? (post as BlogPost).data.author : 'Ju Ho Kim',
    publishedTime: post.data.published.toISOString(),
    modifiedTime: isPost && (post as BlogPost).data.updated 
      ? (post as BlogPost).data.updated!.toISOString() 
      : undefined,
    tags: isPost ? (post as BlogPost).data.tags : (post as Project).data.technologies,
    type: isPost ? 'article' : 'website'
  }
}

// URL and slug utilities
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getPostUrl(post: BlogPost): string {
  return `/blog/${post.slug}/`
}

export function getProjectUrl(project: Project): string {
  return `/projects/${project.slug}/`
}

// Statistics utilities
export async function getContentStats() {
  const [posts, projects] = await Promise.all([
    getCollection('posts'),
    getCollection('projects')
  ])
  
  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => !p.data.draft).length,
    draftPosts: posts.filter(p => p.data.draft).length,
    featuredPosts: posts.filter(p => p.data.featured && !p.data.draft).length,
    
    totalProjects: projects.length,
    publishedProjects: projects.filter(p => !p.data.draft).length,
    draftProjects: projects.filter(p => p.data.draft).length,
    featuredProjects: projects.filter(p => p.data.featured && !p.data.draft).length,
    
    completedProjects: projects.filter(p => p.data.status === 'completed' && !p.data.draft).length,
    inProgressProjects: projects.filter(p => p.data.status === 'in-progress' && !p.data.draft).length
  }
}

// Tag utilities
export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts()
  const tagSet = new Set<string>()
  
  posts.forEach(post => {
    post.data.tags?.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet).sort()
}

export async function getTagCounts(): Promise<Record<string, number>> {
  const posts = await getPublishedPosts()
  const tagCounts: Record<string, number> = {}
  
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return tagCounts
}

// Technology utilities
export async function getAllTechnologies(): Promise<string[]> {
  const projects = await getPublishedProjects()
  const techSet = new Set<string>()
  
  projects.forEach(project => {
    project.data.technologies?.forEach(tech => techSet.add(tech))
  })
  
  return Array.from(techSet).sort()
}

export async function getTechnologyCounts(): Promise<Record<string, number>> {
  const projects = await getPublishedProjects()
  const techCounts: Record<string, number> = {}
  
  projects.forEach(project => {
    project.data.technologies?.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1
    })
  })
  
  return techCounts
}
