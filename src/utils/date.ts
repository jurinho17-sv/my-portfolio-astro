/**
 * Format a date string or Date object
 */
export function formatDate(date: string | Date, format: string = 'MMM DD, YYYY'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  
  const month = months[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  
  switch (format) {
    case 'MMM YYYY':
      return `${month} ${year}`
    case 'MMM DD, YYYY':
      return `${month} ${day}, ${year}`
    case 'YYYY-MM-DD':
      return dateObj.toISOString().split('T')[0]
    default:
      return `${month} ${day}, ${year}`
  }
}
