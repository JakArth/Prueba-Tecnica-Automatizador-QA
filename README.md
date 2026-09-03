# Automatización QA - E-commerce

Este proyecto está diseñado para apoyar la automatización de pruebas funcionales de un sitio de comercio electrónico con módulos de catálogo y cuenta.

## Objetivo

Implementar una base de pruebas con Playwright para validar:

- Registro exitoso de usuario
- Modificación de datos del usuario
- Compra de producto con flujo completo
- Validación de categorías y módulos principales
- Verificación de PQRS, cuenta, outlet y bonos de regalo

## Estructura del proyecto

```text
.
├── README.md
├── docs/
│   └── catalogo-modulos.md
├── tests/
│   ├── data/
│   │   └── catalog.ts
│   ├── e2e/
│   │   ├── compra.spec.ts
│   │   ├── mi-cuenta.spec.ts
│   │   └── pqrs.spec.ts
│   └── pages/
│       ├── AccountPage.ts
│       ├── BasePage.ts
│       ├── HomePage.ts
│       └── ProductPage.ts
├── package.json
├── playwright.config.ts
└── .gitignore
```

## Escenarios prioritarios

1. Registro y edición de perfil
2. Compra de producto
3. Creacion de PQRS

## Módulos a cubrir

- Zapatos
- Bolsos
- Cinturones
- Accesorios
- Outlet
- PQRS
- Mi cuenta
- Bonos de regalo
- Account

## Ejecución

```bash
npm install
npx playwright test
```

## Reportes

```bash
npx playwright show-report
```
