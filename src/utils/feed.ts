import type { ImageMetadata } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getImage } from 'astro:assets'
import { getCollection } from 'astro:content'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import { parse } from 'node-html-parser'
import sanitizeHtml from 'sanitize-html'
import { themeConfig } from '@/config'
import { memoize } from '@/utils/cache'
import { getPostDescription } from '@/utils/description'

const markdownParser = new MarkdownIt()
const { title, description, url, author } = themeConfig.site
const followConfig = themeConfig.seo?.follow

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Dynamically import all images from /src/content/posts/_images
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/posts/_images/**/*.{jpeg,jpg,png,gif,webp}',
)

/**
 * Converts relative image paths to absolute URLs
 *
 * @param srcPath - Relative image path from markdown content
 * @param baseUrl - Site base URL
 * @returns Optimized image URL or null if processing fails
 */
async function _getAbsoluteImageUrl(srcPath: string, baseUrl: string) {
  // Remove relative path prefixes (../ and ./) from image source path
  const prefixRemoved = srcPath.replace(/^(?:\.\.\/)+|^\.\//, '')
  const absolutePath = `/src/content/posts/${prefixRemoved}`
  const imageImporter = imagesGlob[absolutePath]

  if (!imageImporter) {
    return null
  }

  // Import image module and extract its metadata
  const imageMetadata = await imageImporter()
    .then(importedModule => importedModule.default)
    .catch((error) => {
      console.warn(`Failed to import image: ${absolutePath}`, error)
      return null
    })

  if (!imageMetadata) {
    return null
  }

  // Create optimized image from metadata
  const optimizedImage = await getImage({ src: imageMetadata })
  return new URL(optimizedImage.src, baseUrl).toString()
}

// Export memoized version
const getAbsoluteImageUrl = memoize(_getAbsoluteImageUrl)

/**
 * Fix relative image paths in HTML content
 *
 * @param htmlContent HTML content string
 * @param baseUrl Base URL of the site
 * @returns Processed HTML string with all image paths converted to absolute URLs
 */
async function fixRelativeImagePaths(htmlContent: string, baseUrl: string): Promise<string> {
  const htmlDoc = parse(htmlContent)
  const images = htmlDoc.getElementsByTagName('img')
  const imagePromises = []

  for (const img of images) {
    const src = img.getAttribute('src')
    if (!src) {
      continue
    }

    imagePromises.push((async () => {
      try {
        // Skip if not a relative path to src/content/posts/_images directory
        if (!src.startsWith('./') && !src.startsWith('../') && !src.startsWith('_images/')) {
          return
        }

        // Process images from src/content/posts/_images directory
        const absoluteImageUrl = await getAbsoluteImageUrl(src, baseUrl)
        if (absoluteImageUrl) {
          img.setAttribute('src', absoluteImageUrl)
        }
      }
      catch (error) {
        console.warn(`Failed to convert relative image path to absolute URL: ${src}`, error)
      }
    })())
  }

  await Promise.all(imagePromises)

  return htmlDoc.toString()
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Generate a feed object supporting both RSS and Atom formats
 *
 * @param options Feed generation options
 * @param options.lang Optional language code
 * @returns A Feed instance ready for RSS or Atom output
 */
export async function generateFeed() {
  const siteURL = `${url}/`

  // Create Feed instance
  const feed = new Feed({
    title: title,
    description: description,
    id: siteURL,
    link: siteURL,
    language: themeConfig.global.locale,
    copyright: `Copyright © ${new Date().getFullYear()} ${author}`,
    updated: new Date(),
    generator: 'Astro-Theme-Retypeset with Feed for Node.js',

    feedLinks: {
      rss: new URL('/rss.xml', url).toString(),
      atom: new URL('/atom.xml', url).toString(),
    },

    author: {
      name: author,
      link: url,
    },
  })

  // Filter posts and exclude drafts
  const posts = await getCollection(
    'posts',
    ({ data }: { data: CollectionEntry<'posts'>['data'] }) => {
      return !data.draft
    },
  )

  // Sort posts by published date in descending order and limit to the latest 25
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())
    .slice(0, 25)

  // Add posts to feed
  for (const post of recentPosts) {
    const slug = post.data.abbrlink || post.id
    const link = new URL(`posts/${slug}/`, siteURL).toString()

    // Optimize content processing
    const postContent = post.body
      ? sanitizeHtml(
          await fixRelativeImagePaths(
            // Remove HTML comments before rendering markdown
            markdownParser.render(post.body.replace(/<!--[\s\S]*?-->/g, '')),
            url,
          ),
          {
            // Allow <img> tags in feed content
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          },
        )
      : ''

    // publishDate -> Atom:<published>, RSS:<pubDate>
    const publishDate = new Date(post.data.publishDate)
    // updateDate -> Atom:<updated>, RSS has no update tag
    const updateDate = post.data.updatedDate ? new Date(post.data.updatedDate) : publishDate

    feed.addItem({
      title: post.data.title,
      id: link,
      link,
      description: getPostDescription(post, 'feed'),
      content: postContent,
      author: [{
        name: author,
        link: url,
      }],
      published: publishDate,
      date: updateDate,
    })
  }

  // Add follow verification if available
  if (followConfig?.feedID && followConfig?.userID) {
    feed.addExtension({
      name: 'follow_challenge',
      objects: {
        feedId: followConfig.feedID,
        userId: followConfig.userID,
      },
    })
  }

  return feed
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Generate RSS 2.0 format feed
export async function generateRSS() {
  const feed = await generateFeed()

  // Add XSLT stylesheet to RSS feed
  let rssXml = feed.rss2()
  rssXml = rssXml.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet href="/feeds/rss-style.xsl" type="text/xsl"?>',
  )

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

// Generate Atom 1.0 format feed
export async function generateAtom() {
  const feed = await generateFeed()

  // Add XSLT stylesheet to Atom feed
  let atomXml = feed.atom1()
  atomXml = atomXml.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet href="/feeds/atom-style.xsl" type="text/xsl"?>',
  )

  return new Response(atomXml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
