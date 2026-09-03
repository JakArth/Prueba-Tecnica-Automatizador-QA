import { test, expect } from '@playwright/test';
import { PqrsPage } from '../pages/PqrsPage';

test.describe('PQRS', () => {
    test('visualiza el formulario y diligencia los campos sin enviarlo', async ({ page }) => {
        const pqrsPage = new PqrsPage(page);

        await pqrsPage.open();

        await expect(page).toHaveURL(/\/pqrs\//);
        await expect(page.getByRole('heading', { name: 'Solicitud de PQRS' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Consulta el estado de tu PQRS' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Número de radicado' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'CREAR PQRS' })).toBeVisible();

        await expect(page.getByRole('textbox', { name: 'Nombre completo del cliente *' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Dirección y ciudad *' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Número de documento *' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Teléfono *' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Correo electrónico *' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Descripción de la solicitud *' })).toBeVisible();

        await pqrsPage.selectList('Selecciona un punto de venta', 'Bon-Bonite Tesoro');
        await pqrsPage.selectList('Selecciona el tipo de documento', 'Cédula de Ciudadanía (CC)');
        await pqrsPage.selectList('Selecciona una opción', 'Queja'); //Solicitud de reversión total
        await pqrsPage.fillCausalIfVisible('Elige la causa relacionada','Operación no solicitada');

        await expect(page.getByRole('combobox', { name: 'Bon-Bonite Tesoro' })).toBeVisible();
        await expect(page.getByRole('combobox', { name: 'Cédula de Ciudadanía (CC)' })).toBeVisible();
        await expect(page.getByRole('combobox', { name: 'Queja' })).toBeVisible();

        await expect(page.locator('input[placeholder="Escribe tu nombre completo"]').first()).toHaveAttribute('aria-required', 'true');
        await expect(page.locator('input[placeholder*="solo números"]').first()).toHaveAttribute('data-required', '1');
        await expect(page.locator('input[placeholder="Ingresa tu dirección de correo"]').first()).toHaveAttribute('aria-required', 'true');

        await pqrsPage.fillRequest({
            name: 'Cliente Prueba QA',
            address: 'Calle 100 # 15-20, Bogotá',
            documentNumber: '1005554789',
            phone: '3001234567',
            email: 'qa.automatizacion@example.com',
            description: 'Solicitud de prueba para validar el diligenciamiento del formulario PQRS.',
        });

        await expect(page.getByRole('textbox', { name: 'Nombre completo del cliente *' })).toHaveValue('Cliente Prueba QA');
        await expect(page.getByRole('textbox', { name: 'Dirección y ciudad *' })).toHaveValue('Calle 100 # 15-20, Bogotá');
        await expect(page.getByRole('textbox', { name: 'Número de documento *' })).toHaveValue('1005554789');
        await expect(page.getByRole('textbox', { name: 'Teléfono *' })).toHaveValue(/^300 ?1234567$/);
        await expect(page.getByRole('textbox', { name: 'Correo electrónico *' })).toHaveValue('qa.automatizacion@example.com');
        await expect(page.getByRole('textbox', { name: 'Descripción de la solicitud *' })).toHaveValue('Solicitud de prueba para validar el diligenciamiento del formulario PQRS.');
        await expect(page.getByRole('button', { name: 'CREAR PQRS' })).toBeVisible();
        });
});