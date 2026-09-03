import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/El Koffee/)

    const orderButton = page.getByRole('link', { name: /pesan sekarang/i })

    await expect(orderButton).toBeVisible()
  })

  test('can filter products by category', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: 'Robusta' }).click()
    await expect(page.getByText('Java Robusta')).toBeVisible()

    await page.getByRole('button', { name: 'Arabica' }).click()
    await expect(page.getByText('Gayo Arabica')).toBeVisible()
  })
})
