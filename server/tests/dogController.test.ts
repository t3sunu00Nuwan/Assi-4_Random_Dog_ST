import { describe, expect, test, vi } from 'vitest'
import { getDogImage } from '../controllers/dogController'
import * as dogService from '../services/dogService'

//using vi.mock
vi.mock('../services/dogService')

const createMockResponse = () => {
  const res: any = {}
  res.status = vi.fn().mockReturnThis()
  res.json = vi.fn()
  return res
}


// positive Test no 3 for DogController
describe('DogController.getDogImage', () => {
  test('Return dog image with valid request', async () => {
    const req: any = {}
    const res = createMockResponse()
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      status: 'success'
    }
    

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockDogData)
    
    await getDogImage(req, res)
    
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
    })

  })
})