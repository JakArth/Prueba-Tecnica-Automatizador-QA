import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectSize(size: string) {
    await this.page.getByRole('button', { name: new RegExp(`^${size}$`, 'i') }).click();
  }

  async addToCart() {
    await this.page.getByRole('button', { name: /añadir al carrito|add to cart/i }).click();
  }

  async getProductTitle() {
    return this.page.locator('h1').first();
  }
}
