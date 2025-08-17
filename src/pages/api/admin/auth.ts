import type { APIRoute } from 'astro'

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || 'admin123'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Password is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (password === ADMIN_PASSWORD) {
      // In a real application, you would use JWT or sessions
      // For this demo, we'll use a simple token
      const token = btoa(`admin:${Date.now()}`)
      
      return new Response(JSON.stringify({
        success: true,
        token,
        message: 'Authentication successful'
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `admin_token=${token}; HttpOnly; Path=/; Max-Age=86400` // 24 hours
        }
      })
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid password'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Auth error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const GET: APIRoute = async ({ request }) => {
  const cookies = request.headers.get('cookie') || ''
  const tokenMatch = cookies.match(/admin_token=([^;]+)/)
  
  if (!tokenMatch) {
    return new Response(JSON.stringify({
      success: false,
      authenticated: false
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const token = tokenMatch[1]
    const decoded = atob(token)
    const [user, timestamp] = decoded.split(':')
    
    // Check if token is less than 24 hours old
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    if (user === 'admin' && tokenAge < maxAge) {
      return new Response(JSON.stringify({
        success: true,
        authenticated: true,
        user: 'admin'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      success: false,
      authenticated: false,
      error: 'Token expired'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      authenticated: false,
      error: 'Invalid token'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const DELETE: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: true,
    message: 'Logged out successfully'
  }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Set-Cookie': 'admin_token=; HttpOnly; Path=/; Max-Age=0'
    }
  })
}
