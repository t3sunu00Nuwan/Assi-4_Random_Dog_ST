import {describe, expect, test} from 'vitest'
import request from 'supertest'
import { app } from '../index'

describe('Dog API tests', () => {


  // positive test
  test('should return a random dog image successfully', async () => {


    const response = await request(app).get('/api/dogs/random')


    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.imageUrl).toBeDefined()
    expect(typeof response.body.data.imageUrl).toBe('string')

  })


// negative test

  test('should return correct error for invalid route', async () => {

    
    const response = await request(app).get('/api/dogs/invalid')

    expect(response.status).toBe(404)
    expect(response.body.error).toBeDefined()
    expect(response.body.error).toBe('Route not found')

  })

})