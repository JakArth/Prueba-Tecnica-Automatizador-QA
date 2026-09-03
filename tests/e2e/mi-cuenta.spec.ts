import { test, expect } from '@playwright/test';
import { accountCredentials } from '../data/catalog';
import { AccountPage } from '../pages/AccountPage';

test.describe('Mi cuenta', () => {
  test('inicio de sesión y acceso a datos personales', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.goToLogin();
    await expect(page.getByRole('heading', { name: /ingresa a tu cuenta/i })).toBeVisible();

    await accountPage.login(accountCredentials);

    await expect(page).toHaveURL(/\/mi-cuenta\/orders\//);
    await expect(page.getByRole('heading', { name: /hola,/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pedidos', exact: true })).toBeVisible();

    await accountPage.goToEditAccount();
    await expect(page).toHaveURL(/\/mi-cuenta\/edit-account\//);
    await expect(page.getByRole('heading', { name: 'Datos Personales' })).toBeVisible();
    await expect(page.getByRole('button', { name: /actualizar.*información/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Datos Personales' })).toBeVisible();
    await expect(page.getByRole('button', { name: /actualizar.*información/i }).first()).toBeVisible();
    await page.getByRole('button', { name: /actualizar.*información/i }).click();
    await expect(page.getByText('Nombres')).toBeVisible();
    await expect(page.getByText('Apellidos')).toBeVisible();
    await expect(page.getByText('Correo Electrónico')).toBeVisible();
    await expect(page.getByText('Teléfono')).toBeVisible();

    await page.locator('[name="billing_phone"]').fill('3017654321');
    await page.getByRole('button', { name: /Guardar/i }).first().click();

    await expect(page.getByText('Datos personales actualizados correctamente')).toBeVisible();

    await accountPage.goToMyPqrs();
    await expect(page).toHaveURL(/\/mi-cuenta\/my-pqrs\//);

        // await expect(page.getByPlaceholder('Ingresa tu contraseña actual')).toBeVisible();
    // await expect(page.getByPlaceholder('Ingresa tu nueva contraseña')).toBeVisible();
    // await expect(page.getByPlaceholder('Confirma tu nueva contraseña')).toBeVisible();

    // await accountPage.updatePassword('Pruebas03*', 'Pruebas03*', 'Pruebas03*');

    // await expect(page.getByPlaceholder('Ingresa tu contraseña actual')).toHaveValue('Pruebas03*');
    // await expect(page.getByPlaceholder('Ingresa tu nueva contraseña')).toHaveValue('Pruebas03*');
    // await expect(page.getByPlaceholder('Confirma tu nueva contraseña')).toHaveValue('Pruebas03*');
    // await page.getByRole('button', { name: /Guardar/i }).first().click();
    
  });
});
