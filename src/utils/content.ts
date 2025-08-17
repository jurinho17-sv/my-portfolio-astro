import type { CollectionEntry } from 'astro:content'
import { getCollection, render } from 'astro:content'
import { memoize } from '@/utils/cache'

export type Post = CollectionEntry<'posts'> & {
  remarkPluginFrontmatter: {
    minutes: number
  }
}

const metaCache = new Map<string, { minutes: number }>()

/**
 * Add metadata including reading time to a post
 *
 * @param post The post to enhance with metadata
 * @returns Enhanced post with reading time information
 */
async function addMetaToPost(post: CollectionEntry<'posts'>): Promise<Post> {
  const cacheKey = post.id

  if (metaCache.has(cacheKey)) {
    return {
      ...post,
      remarkPluginFrontmatter: metaCache.get(cacheKey)!,
    }
  }

  const { remarkPluginFrontmatter } = await render(post)
  metaCache.set(cacheKey, remarkPluginFrontmatter as { minutes: number })

  return {
    ...post,
    remarkPluginFrontmatter: metaCache.get(cacheKey)!,
  }
}

/**
 * Find duplicate post slugs
 *
 * @param posts Array of blog posts to check
 * @returns Array of descriptive error messages for duplicate slugs
 */
async function _checkPostSlugDuplication(posts: CollectionEntry<'posts'>[]): Promise<string[]> {
  const slugSet = new Set<string>()
  const duplicates: string[] = []

  posts.forEach((post) => {
    const slug = post.data.abbrlink || post.id

    if (slugSet.has(slug)) {
      duplicates.push(`Duplicate slug "${slug}" found`)
    } else {
      slugSet.add(slug)
    }
  })

  return duplicates
}

export const checkPostSlugDuplication = memoize(_checkPostSlugDuplication)

/**
 * Get all posts (including pinned ones, excluding drafts in production)
 *
 * @returns Posts enhanced with metadata, sorted by date
 */
async function _getPosts() {
  const filteredPosts = await getCollection(
    'posts',
    ({ data }: CollectionEntry<'posts'>) => {
      // Show drafts in dev mode only
      return import.meta.env.DEV || !data.draft
    },
  )

  const enhancedPosts = await Promise.all(filteredPosts.map(addMetaToPost))

  return enhancedPosts.sort((a: Post, b: Post) =>
    b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  )
}

export const getPosts = memoize(_getPosts)

/**
 * Get all non-pinned posts
 *
 * @returns Regular posts (non-pinned)
 */
async function _getRegularPosts() {
  const posts = await getPosts()
  return posts.filter(post => !post.data.pin)
}

export const getRegularPosts = memoize(_getRegularPosts)

/**
 * Get pinned posts sorted by pin priority
 *
 * @returns Pinned posts sorted by pin value in descending order
 */
async function _getPinnedPosts() {
  const posts = await getPosts()
  return posts
    .filter(post => post.data.pin && post.data.pin > 0)
    .sort((a, b) => (b.data.pin ?? 0) - (a.data.pin ?? 0))
}

export const getPinnedPosts = memoize(_getPinnedPosts)

/**
 * Group posts by year and sort within each year
 *
 * @returns Map of posts grouped by year (descending), sorted by date within each year
 */
async function _getPostsByYear(): Promise<Map<number, Post[]>> {
  const posts = await getRegularPosts()
  const yearMap = new Map<number, Post[]>()

  posts.forEach((post: Post) => {
    const year = post.data.publishDate.getFullYear()
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year)!.push(post)
  })

  // Sort posts within each year by date
  yearMap.forEach((yearPosts) => {
    yearPosts.sort((a, b) => {
      const aDate = a.data.publishDate
      const bDate = b.data.publishDate
      return bDate.getMonth() - aDate.getMonth() || bDate.getDate() - aDate.getDate()
    })
  })

  return new Map([...yearMap.entries()].sort((a, b) => b[0] - a[0]))
}

export const getPostsByYear = memoize(_getPostsByYear)

/**
 * Group posts by their tags
 *
 * @returns Map where keys are tag names and values are arrays of posts with that tag
 */
async function _getPostsGroupByTags() {
  const posts = await getPosts()
  const tagMap = new Map<string, Post[]>()

  posts.forEach((post: Post) => {
    post.data.tags?.forEach((tag: string) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag)!.push(post)
    })
  })

  return tagMap
}

export const getPostsGroupByTags = memoize(_getPostsGroupByTags)

/**
 * Get all tags sorted by post count
 *
 * @returns Array of tags sorted by popularity (most posts first)
 */
async function _getAllTags() {
  const tagMap = await getPostsGroupByTags()
  const tagsWithCount = Array.from(tagMap.entries())

  tagsWithCount.sort((a, b) => b[1].length - a[1].length)
  return tagsWithCount.map(([tag]) => tag)
}

export const getAllTags = memoize(_getAllTags)

/**
 * Get all posts that contain a specific tag
 *
 * @param tag The tag name to filter posts by
 * @returns Array of posts that contain the specified tag
 */
async function _getPostsByTag(tag: string) {
  const tagMap = await getPostsGroupByTags()
  return tagMap.get(tag) ?? []
}

export const getPostsByTag = memoize(_getPostsByTag)
