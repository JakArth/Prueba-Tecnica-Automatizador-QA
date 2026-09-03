import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly categoryLinks: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.categoryLinks = {
      zapatos: page.locator('a[href*="/categoria-producto/zapatos-mujer/"]'),
      bolsos: page.locator('a[href*="/categoria-producto/bolsos-mujer/"]'),
      cinturones: page.locator('a[href*="/categoria-producto/cinturones-mujer/"]'),
      accesorios: page.locator('a[href*="/categoria-producto/accesorios-mujer/"]'),
      outlet: page.locator('a[href*="/categoria-producto/outlet/"]'),
      pqrs: page.locator('a[href*="/pqrs/"]'),
      cuenta: page.locator('a[href*="/mi-cuenta"]').first(),
      bonos: page.locator('a[href*="/producto/bono-de-regalo/"]'),
    };
  }

  async openCategory(category: keyof typeof this.categoryLinks) {
    await this.categoryLinks[category].first().click();
    await this.waitForPageReady();
  }

  async openProduct(productName: string) {
    await this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first().click();
    await this.waitForPageReady();
  }
}
