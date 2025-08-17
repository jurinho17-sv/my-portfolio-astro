import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { Octokit } from '@octokit/rest'
import * as yaml from 'js-yaml'

// GitHub configuration
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN
const GITHUB_REPO = import.meta.env.GITHUB_REPO || 'jurinho17-sv/my-portfolio-astro'
const [owner, repo] = GITHUB_REPO.split('/')

// Initialize Octokit
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

// Authentication middleware
async function isAuthenticated(request: Request): Promise<boolean> {
  const cookies = request.headers.get('cookie') || ''
  const tokenMatch = cookies.match(/admin_token=([^;]+)/)
  
  if (!tokenMatch) return false
  
  try {
    const token = tokenMatch[1]
    const decoded = atob(token)
    const [user, timestamp] = decoded.split(':')
    
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    return user === 'admin' && tokenAge < maxAge
  } catch {
    return false
  }
}

// GET - List all content
export const GET: APIRoute = async ({ request, url }) => {
  if (!await isAuthenticated(request)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Unauthorized'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const searchParams = url.searchParams
    const type = searchParams.get('type') || 'all'
    
    let content: any[] = []
    
    if (type === 'posts' || type === 'all') {
      const posts = await getCollection('posts')
      content = [...content, ...posts.map(post => ({
        ...post,
        type: 'post',
        editUrl: `/admin/editor?type=post&slug=${post.slug}`
      }))]
    }
    
    if (type === 'projects' || type === 'all') {
      const projects = await getCollection('projects')
      content = [...content, ...projects.map(project => ({
        ...project,
        type: 'project',
        editUrl: `/admin/editor?type=project&slug=${project.slug}`
      }))]
    }
    
    // Sort by published date (newest first)
    content.sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime())
    
    return new Response(JSON.stringify({
      success: true,
      data: content
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error fetching content:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch content'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST - Create new content
export const POST: APIRoute = async ({ request }) => {
  if (!await isAuthenticated(request)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Unauthorized'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const body = await request.json()
    const { type, frontmatter, content, filename } = body

    if (!type || !frontmatter || !content || !filename) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: type, frontmatter, content, filename'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Generate the full markdown content
    const yamlFrontmatter = yaml.dump(frontmatter)
    const fullContent = `---\n${yamlFrontmatter}---\n\n${content}`

    // Determine the file path
    const basePath = type === 'post' ? 'src/content/posts' : 'src/content/projects'
    const filePath = `${basePath}/${filename}`

    // Check if file already exists
    try {
      await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
      })
      
      return new Response(JSON.stringify({
        success: false,
        error: 'File already exists'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error: any) {
      if (error.status !== 404) {
        throw error
      }
      // File doesn't exist, which is what we want for creation
    }

    // Create the file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `feat: Add new ${type} - ${frontmatter.title}`,
      content: btoa(unescape(encodeURIComponent(fullContent))),
    })

    return new Response(JSON.stringify({
      success: true,
      message: `${type} created successfully`,
      data: {
        type,
        filename,
        path: filePath
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error creating content:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to create content'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PUT - Update existing content
export const PUT: APIRoute = async ({ request }) => {
  if (!await isAuthenticated(request)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Unauthorized'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const body = await request.json()
    const { type, frontmatter, content, filename, slug } = body

    if (!type || !frontmatter || !content || (!filename && !slug)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Generate the full markdown content
    const yamlFrontmatter = yaml.dump(frontmatter)
    const fullContent = `---\n${yamlFrontmatter}---\n\n${content}`

    // Determine the file path
    const basePath = type === 'post' ? 'src/content/posts' : 'src/content/projects'
    const filePath = `${basePath}/${filename || slug + '.md'}`

    // Get current file to get its SHA
    const currentFile = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
    })

    if (Array.isArray(currentFile.data)) {
      throw new Error('Path is a directory, not a file')
    }

    // Update the file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `feat: Update ${type} - ${frontmatter.title}`,
      content: btoa(unescape(encodeURIComponent(fullContent))),
      sha: currentFile.data.sha,
    })

    return new Response(JSON.stringify({
      success: true,
      message: `${type} updated successfully`,
      data: {
        type,
        filename: filename || slug + '.md',
        path: filePath
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error updating content:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update content'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// DELETE - Delete content
export const DELETE: APIRoute = async ({ request }) => {
  if (!await isAuthenticated(request)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Unauthorized'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const body = await request.json()
    const { type, filename, slug } = body

    if (!type || (!filename && !slug)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: type and (filename or slug)'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Determine the file path
    const basePath = type === 'post' ? 'src/content/posts' : 'src/content/projects'
    const filePath = `${basePath}/${filename || slug + '.md'}`

    // Get current file to get its SHA
    const currentFile = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
    })

    if (Array.isArray(currentFile.data)) {
      throw new Error('Path is a directory, not a file')
    }

    // Delete the file
    await octokit.rest.repos.deleteFile({
      owner,
      repo,
      path: filePath,
      message: `feat: Delete ${type} - ${filename || slug}`,
      sha: currentFile.data.sha,
    })

    return new Response(JSON.stringify({
      success: true,
      message: `${type} deleted successfully`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error deleting content:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to delete content'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
