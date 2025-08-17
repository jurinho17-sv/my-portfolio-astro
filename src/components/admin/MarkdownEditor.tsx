import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import * as yaml from 'js-yaml'

interface MarkdownEditorProps {
  initialContent?: string
  initialFrontmatter?: Record<string, any>
  contentType: 'post' | 'project'
  onSave: (frontmatter: Record<string, any>, content: string) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function MarkdownEditor({
  initialContent = '',
  initialFrontmatter = {},
  contentType,
  onSave,
  onCancel,
  isLoading = false
}: MarkdownEditorProps) {
  const [frontmatter, setFrontmatter] = useState(initialFrontmatter)
  const [content, setContent] = useState(initialContent)
  const [isPreview, setIsPreview] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const hasChanged = 
      JSON.stringify(frontmatter) !== JSON.stringify(initialFrontmatter) ||
      content !== initialContent
    setIsDirty(hasChanged)
  }, [frontmatter, content, initialFrontmatter, initialContent])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!frontmatter.title?.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!frontmatter.description?.trim()) {
      newErrors.description = 'Description is required'
    }

    if (contentType === 'post') {
      if (!frontmatter.category) {
        newErrors.category = 'Category is required'
      }
    } else if (contentType === 'project') {
      if (!frontmatter.technologies?.length) {
        newErrors.technologies = 'At least one technology is required'
      }
      if (!frontmatter.status) {
        newErrors.status = 'Status is required'
      }
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    try {
      await onSave(frontmatter, content)
      setIsDirty(false)
    } catch (error) {
      console.error('Save failed:', error)
    }
  }

  const updateFrontmatter = (key: string, value: any) => {
    setFrontmatter(prev => ({ ...prev, [key]: value }))
  }

  const getPostCategories = () => ['technology', 'personal', 'tutorial', 'project']
  const getProjectStatuses = () => ['completed', 'in-progress', 'planned', 'archived']
  const getProjectCategories = () => ['web', 'mobile', 'desktop', 'data-science', 'ai-ml', 'other']

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">
            {initialContent ? 'Edit' : 'New'} {contentType === 'post' ? 'Blog Post' : 'Project'}
          </h1>
          {isDirty && (
            <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              Unsaved changes
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !isDirty}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Frontmatter Form */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4 space-y-4">
          <h2 className="font-semibold text-gray-900">Metadata</h2>
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={frontmatter.title || ''}
              onChange={(e) => updateFrontmatter('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter title..."
            />
            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={frontmatter.description || ''}
              onChange={(e) => updateFrontmatter('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Enter description..."
            />
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Published Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Published Date
            </label>
            <input
              type="date"
              value={frontmatter.published ? new Date(frontmatter.published).toISOString().split('T')[0] : ''}
              onChange={(e) => updateFrontmatter('published', new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {contentType === 'post' && (
            <>
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={frontmatter.category || ''}
                  onChange={(e) => updateFrontmatter('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select category...</option>
                  {getPostCategories().map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={frontmatter.tags?.join(', ') || ''}
                  onChange={(e) => updateFrontmatter('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="web-development, react, typescript"
                />
              </div>
            </>
          )}

          {contentType === 'project' && (
            <>
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={frontmatter.status || ''}
                  onChange={(e) => updateFrontmatter('status', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.status ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select status...</option>
                  {getProjectStatuses().map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && <p className="text-red-600 text-xs mt-1">{errors.status}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={frontmatter.category || 'web'}
                  onChange={(e) => updateFrontmatter('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {getProjectCategories().map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies * (comma-separated)
                </label>
                <input
                  type="text"
                  value={frontmatter.technologies?.join(', ') || ''}
                  onChange={(e) => updateFrontmatter('technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.technologies ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="React, TypeScript, Node.js"
                />
                {errors.technologies && <p className="text-red-600 text-xs mt-1">{errors.technologies}</p>}
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={frontmatter.github || ''}
                  onChange={(e) => updateFrontmatter('github', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              {/* Demo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={frontmatter.demo || ''}
                  onChange={(e) => updateFrontmatter('demo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://your-demo.com"
                />
              </div>
            </>
          )}

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={frontmatter.featured || false}
              onChange={(e) => updateFrontmatter('featured', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Featured
            </label>
          </div>

          {/* Draft */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="draft"
              checked={frontmatter.draft || false}
              onChange={(e) => updateFrontmatter('draft', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="draft" className="ml-2 block text-sm text-gray-700">
              Draft
            </label>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {errors.content && (
            <div className="p-3 bg-red-50 border-b border-red-200 text-red-700 text-sm">
              {errors.content}
            </div>
          )}
          
          {isPreview ? (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose prose-lg max-w-none">
                <h1>{frontmatter.title || 'Untitled'}</h1>
                <p className="text-gray-600">{frontmatter.description}</p>
                <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
              </div>
            </div>
          ) : (
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={content}
              onChange={(value) => setContent(value || '')}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                lineNumbers: 'on',
                wordWrap: 'on',
                automaticLayout: true,
                fontSize: 14,
                tabSize: 2,
                insertSpaces: true,
                renderWhitespace: 'boundary',
                scrollBeyondLastLine: false,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
