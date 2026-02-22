import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { Request, Response } from 'express'
import { app } from '../index'
import * as dogController from '../controllers/dogController'

vi.mock('../controllers/dogController')

describe('Dog routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  
  // positive test 4 for getDogImage route
  test('GET /api/dogs/random returns dog image', async () => {
    const mockImageUrl = 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg'
    
    vi.mocked(dogController.getDogImage).mockImplementation(
      async (_req: Request, res: Response) => {
        res.status(200).json({
          success: true,
          data: {
            imageUrl: mockImageUrl,
            status: 'success'
          }
        })
      }
    )

    const res = await request(app).get('/api/dogs/random')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.imageUrl).toBe(mockImageUrl)
  })


  // negative test 5 for return 500 error
  test('GET /api/dogs/random returns 500 on error', async () => {
    const errorMessage = 'Failed to fetch dog image: Dog API returned status 500'
    
    vi.mocked(dogController.getDogImage).mockImplementation(
      async (_req: Request, res: Response) => {
        res.status(500).json({
          success: false,
          error: errorMessage
        })
      }
    )

    const res = await request(app).get('/api/dogs/random')

    expect(res.status).toBe(500)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe(errorMessage)
  })
})