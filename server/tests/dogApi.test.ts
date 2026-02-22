import {describe, expect, test} from 'vitest'
import request from 'supertest'
import { app } from '../index'

describe('Dog API', () => {
  test('GET /api/dogs/random returns a dog image', async () => {
    const res = await request(app)
    .get('/api/dogs/random')
    .expect(200)
    
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('imageUrl')
    expect(res.body.data).toHaveProperty('status')
    expect(res.body.data.status).toBe('success')
    })
})
