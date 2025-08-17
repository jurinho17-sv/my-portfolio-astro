import { moreLocales } from '@/config'
import { getLangFromPath } from '@/i18n/lang'
import { getLocalizedPath } from '@/i18n/path'

// Checks if normalized path matches a specific page type
function isPageType(path: string, prefix: string = '') {
  // Removes leading and trailing slashes from a path
  const normalizedPath = path.replace(/^\/|\/$/g, '')

  if (prefix === '') {
    return normalizedPath === '' || moreLocales.includes(normalizedPath)
  }

  return normalizedPath.startsWith(prefix)
    || moreLocales.some(lang => normalizedPath.startsWith(`${lang}/${prefix}`))
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
  const normalizedPath = path.replace(/^\/|\/$/g, '')
  if (normalizedPath === 'about') return true
  for (const lang of moreLocales) {
    if (normalizedPath === `${lang}/about`) return true
  }
  return false
}

export function isBlogListPage(path: string) {
  // 정확히 /blog/ 경로만 매칭 (더 정확한 로직)
  const normalizedPath = path.replace(/^\/|\/$/g, '')
  
  // 정확히 'blog' 경로이거나 언어코드/blog 형태
  if (normalizedPath === 'blog') return true
  
  // 다국어 지원 경로 확인
  for (const lang of moreLocales) {
    if (normalizedPath === `${lang}/blog`) return true
  }
  
  return false
}

export function isProjectsPage(path: string) {
  // 정확히 /projects/ 경로만 매칭 (개별 프로젝트 페이지 제외)
  const normalizedPath = path.replace(/^\/|\/$/g, '')
  
  // 정확히 'projects' 경로이거나 언어코드/projects 형태
  if (normalizedPath === 'projects') return true
  
  // 다국어 지원 경로 확인
  for (const lang of moreLocales) {
    if (normalizedPath === `${lang}/projects`) return true
  }
  
  return false
}

export function isResumePage(path: string) {
  const normalizedPath = path.replace(/^\/|\/$/g, '')
  if (normalizedPath === 'resume') return true
  for (const lang of moreLocales) {
    if (normalizedPath === `${lang}/resume`) return true
  }
  return false
}

export function isContactPage(path: string) {
  const normalizedPath = path.replace(/^\/|\/$/g, '')
  if (normalizedPath === 'contact') return true
  for (const lang of moreLocales) {
    if (normalizedPath === `${lang}/contact`) return true
  }
  return false
}

// Returns page context with language, page types and localization helper
export function getPageInfo(path: string) {
  const currentLang = getLangFromPath(path)
  const isHome = isHomePage(path)
  const isPost = isPostPage(path)
  const isTag = isTagPage(path)
  const isAbout = isAboutPage(path)
  const isBlogList = isBlogListPage(path)
  const isProjects = isProjectsPage(path)
  const isResume = isResumePage(path)
  const isContact = isContactPage(path)

  return {
    currentLang,
    isHome,
    isPost,
    isTag,
    isAbout,
    isBlogList,
    isProjects,
    isResume,
    isContact,
    getLocalizedPath: (targetPath: string) =>
      getLocalizedPath(targetPath, currentLang),
  }
}
