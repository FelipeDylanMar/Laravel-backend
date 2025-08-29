import { describe, it, expect } from 'vitest'

describe('Utility Functions Tests', () => {
  describe('String utilities', () => {
    it('should format currency correctly', () => {
      const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value)
      }
      
      const result1 = formatCurrency(99.99)
      const result2 = formatCurrency(1000)
      
      expect(result1).toContain('99,99')
      expect(result1).toContain('R$')
      expect(result2).toContain('1.000,00')
      expect(result2).toContain('R$')
    })

    it('should validate email format', () => {
      const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      }
      
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
    })

    it('should truncate text correctly', () => {
      const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
      }
      
      expect(truncateText('Hello World', 5)).toBe('Hello...')
      expect(truncateText('Short', 10)).toBe('Short')
    })
  })

  describe('Date utilities', () => {
    it('should format date correctly', () => {
      const formatDate = (date: Date): string => {
        return date.toLocaleDateString('pt-BR')
      }
      
      const testDate = new Date(2025, 0, 15)
      expect(formatDate(testDate)).toBe('15/01/2025')
    })

    it('should check if date is valid', () => {
      const isValidDate = (date: Date): boolean => {
        return date instanceof Date && !isNaN(date.getTime())
      }
      
      expect(isValidDate(new Date(2025, 0, 15))).toBe(true)
      expect(isValidDate(new Date('invalid'))).toBe(false)
    })
  })

  describe('Array utilities', () => {
    it('should remove duplicates from array', () => {
      const removeDuplicates = <T>(arr: T[]): T[] => {
        return [...new Set(arr)]
      }
      
      expect(removeDuplicates([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4])
      expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('should group array by property', () => {
      const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
        return arr.reduce((groups, item) => {
          const group = String(item[key])
          groups[group] = groups[group] || []
          groups[group].push(item)
          return groups
        }, {} as Record<string, T[]>)
      }
      
      const items = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 }
      ]
      
      const grouped = groupBy(items, 'category')
      expect(grouped['A']).toHaveLength(2)
      expect(grouped['B']).toHaveLength(1)
    })
  })
})