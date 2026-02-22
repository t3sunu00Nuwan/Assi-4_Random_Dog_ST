import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

describe('DogService.getRandomDogImage', () => {
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  // positive Test no 1 for DogService
  test('should return a dog image when API call is successful', async () => {
    // Mock the dog API response
    const mockApiResponse = {
      message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      status: 'success'
    }

    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse
    })

    // Call the service
    const result = await getRandomDogImage()

    // Verify the result
    expect(result.imageUrl).toBe(mockApiResponse.message)
    expect(result.status).toBe('success')
    expect(global.fetch).toHaveBeenCalledOnce()
  })


  // negative Test no 2 for DogService
  test('should throw an error when API call fails', async () => {
    // Mock fetch to return a failed response
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    })

    // Verify that the service throws an error
    await expect(getRandomDogImage()).rejects.toThrow('Failed to fetch dog image: Dog API returned status 500')
    expect(global.fetch).toHaveBeenCalledOnce()
  })
})
