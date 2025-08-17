// Checks if normalized path matches a specific page type
function isPageType(path: string, prefix: string = '') {
  // Removes leading and trailing slashes from a path
  const normalizedPath = path.replace(/^\/|\/$/g, '')

  if (prefix === '') {
    return normalizedPath === ''
  }

  return normalizedPath.startsWith(prefix)
}

export function isHomePage(path: string) {
  return isPageType(path)
}

export function isPostPage(path: string) {
  return isPageType(path, 'posts')
}

export function isTagPage(path: string) {
  return isPageType(path, 'tags')
}

export function isAboutPage(path: string) {
  return isPageType(path, 'about')
}
