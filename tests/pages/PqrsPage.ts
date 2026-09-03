import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PqrsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/pqrs/');
    await this.waitForPageReady();
    await this.acceptCookiesIfVisible();
  }

  async selectList(label: string, option: string) {
    const list = this.page.getByRole('combobox', { name: label });
    await list.click();
    await this.page.getByRole('option', { name: option, exact: true }).click();
  }

  async fillCausalIfVisible(label: string, option: string) {
    const causalList = this.page.getByRole('combobox', { name: label });
    if (await causalList.count()) {
      await causalList.click();
      await this.page.getByRole('option', { name: option, exact: true }).click();
    }
  }

  async fillRequest({
    name,
    address,
    documentNumber,
    phone,
    email,
    description,
  }: {
    name: string;
    address: string;
    documentNumber: string;
    phone: string;
    email: string;
    description: string;
  }) {
    await this.page.getByRole('textbox', { name: 'Nombre completo del cliente *' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Dirección y ciudad *' }).fill(address);
    await this.page.getByRole('textbox', { name: 'Número de documento *' }).fill(documentNumber);
    await this.page.getByRole('textbox', { name: 'Teléfono *' }).fill(phone);
    await this.page.getByRole('textbox', { name: 'Correo electrónico *' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Descripción de la solicitud *' }).fill(description);
  }
}