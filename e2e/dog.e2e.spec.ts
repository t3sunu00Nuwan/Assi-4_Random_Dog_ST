import { test, expect } from '@playwright/test'


// test 3 Dog image when page opens 

test('dog image should appear when the page opens', async ({ page }) => {

  const responsePromise = page.waitForResponse('**/api/dogs/random')

  await page.goto('http://localhost:5173')

  await responsePromise

  const dogImage = page.getByRole('img')

  const imageSource = await dogImage.getAttribute('src')

  expect(imageSource).toBeTruthy()
  expect(imageSource).toMatch(/^https:\/\//)

})


// test 4 dog image should change when button is clicked

test('clicking button loads another dog image', async ({ page }) => {

  await page.goto('http://localhost:5173')

  const responsePromise = page.waitForResponse('**/api/dogs/random')

  await page.getByRole('button').click()

  await responsePromise

  const dogImage = page.getByRole('img')

  const imageSource = await dogImage.getAttribute('src')

  expect(imageSource).toBeTruthy()
  expect(imageSource).toMatch(/^https:\/\//)

})


// test 5 error message should appear if API request fails

test('error message should appear if API request fails', async ({ page }) => {

  await page.route('**/api/dogs/random', route => route.abort())

  await page.goto('http://localhost:5173')

  const errorMessage = page.getByText(/error/i)

  await expect(errorMessage).toBeVisible()

})