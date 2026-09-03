import { type Page } from '@playwright/test';

export class BasePage {
  protected readonly baseUrl = 'https://www.bon-bonite.com';

  constructor(protected readonly page: Page) {}

  async goto(path = '/') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    await this.page.goto(url);
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async acceptCookiesIfVisible() {
    const button = this.page.getByRole('button', { name: /aceptar|accept|ok/i });
    if (await button.isVisible().catch(() => false)) {
      await button.click();
    }
  }
}
