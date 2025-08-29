import { describe, it, expect, vi, beforeEach } from 'vitest'


const mockFetch = vi.fn()
global.fetch = mockFetch

describe('API Service Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockClear()
  })

  it('should handle successful API response', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue({ data: 'test' })
    }
    
    mockFetch.mockResolvedValueOnce(mockResponse)
    
    const response = await fetch('/api/test')
    const data = await response.json()
    
    expect(response.ok).toBe(true)
    expect(data).toEqual({ data: 'test' })
  })

  it('should handle API error response', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ error: 'Not found' })
    }
    
    mockFetch.mockResolvedValueOnce(mockResponse)
    
    const response = await fetch('/api/notfound')
    const data = await response.json()
    
    expect(response.ok).toBe(false)
    expect(response.status).toBe(404)
    expect(data).toEqual({ error: 'Not found' })
  })

  it('should handle network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    
    try {
      await fetch('/api/test')
    } catch (error) {
      expect((error as Error).message).toBe('Network error')
    }
  })
})