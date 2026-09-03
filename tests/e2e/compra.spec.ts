import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { BasePage } from '../pages/BasePage';

test.describe('Flujo de compra', () => {
  test('catálogo de zapatos, detalle del producto y agregado al carrito', async ({ page }) => {
    const productPage = new ProductPage(page);
    const basePage = new BasePage(page);

    await page.goto('https://www.bon-bonite.com/categoria-producto/zapatos-mujer/');
    await page.waitForLoadState('networkidle');
    await basePage.acceptCookiesIfVisible();

    await expect(page.getByText(/\d+\s+Resultados?/i)).toBeVisible();

    const productTitle = page.locator('h4, h3, h2').filter({ hasText: /[A-Za-zÁÉÍÓÚáéíóú]/ }).first();
    await expect(productTitle).toBeVisible({ timeout: 15000 });

    const priceText = page.getByText(/\$\d{1,3}(?:[.,]\d{3})+/).first();
    await expect(priceText).toBeVisible({ timeout: 15000 });

    const productLink = page.locator('a[href*="/producto/"]').nth(1);
    await expect(productLink).toBeVisible({ timeout: 15000 });
    await productLink.click();

    await page.waitForURL(/\/producto\//);
    await expect(page.locator('h1')).toBeVisible();

    const sizeButton = page.locator('button').filter({ hasText: /^\d{2}$/ }).first();
    if (await sizeButton.count()) {
      await sizeButton.click();
    }

    await productPage.addToCart();
    await expect(page.getByText(/se ha (añadido|agregado).*carrito|.*carrito.*(añadido|agregado)/i).first()).toBeVisible({ timeout: 15000 });
  });
});
