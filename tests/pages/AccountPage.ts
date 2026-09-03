import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToLogin() {
    await this.goto('/mi-cuenta/');
  }

  async login({ documentNumber, password }: { documentNumber: string; password: string }) {
    await this.page.getByPlaceholder('Cédula').fill(documentNumber);
    await this.page.getByPlaceholder('Contraseña').fill(password);
    await this.page.getByRole('button', { name: /iniciar sesión|login/i }).click();
  }

  async openProfile() {
    await this.goto('/mi-cuenta/');
  }

  async goToEditAccount() {
    await this.page.getByRole('link', { name: 'Datos', exact: true }).click();
    await this.page.waitForURL(/\/mi-cuenta\/edit-account\//);
  }

  async goToMyPqrs() {
    await this.goto('/mi-cuenta/my-pqrs/');
    await this.waitForPageReady();
  }

  async updateProfile({ firstName, lastName, phone }: { firstName: string; lastName: string; phone: string }) {
    const firstNameInput = this.page.locator('input[name="first_name"], input[id="first_name"]');
    const lastNameInput = this.page.locator('input[name="last_name"], input[id="last_name"]');
    const phoneInput = this.page.locator('input[name="billing_phone"], input[id="billing_phone"], input[name="phone"], input[id="phone"]');

    if (await firstNameInput.count()) await firstNameInput.first().fill(firstName);
    if (await lastNameInput.count()) await lastNameInput.first().fill(lastName);
    if (await phoneInput.count()) await phoneInput.first().fill(phone);
  }

  async updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    await this.page.getByPlaceholder('Ingresa tu contraseña actual').fill(currentPassword);
    await this.page.getByPlaceholder('Ingresa tu nueva contraseña').fill(newPassword);
    await this.page.getByPlaceholder('Confirma tu nueva contraseña').fill(confirmPassword);
  }

  async updateName(newName: string) {
    await this.page.getByLabel(/nombre|first name/i).fill(newName);
    await this.page.getByRole('button', { name: /guardar|save/i }).click();
  }
}
