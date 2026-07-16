# 🏥 IPS Inga Kamëntsá - Sitio Web Institucional

Sitio web oficial de la IPS Inga Kamëntsá, una plataforma moderna y responsiva desarrollada para facilitar el acceso a servicios de salud y mejorar la comunicación con los usuarios.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Stack Tecnológico](#-stack-tecnológico)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#%EF%B8%8F-configuración)
- [Páginas Principales](#-páginas-principales)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎯 Descripción

Este proyecto es el sitio web institucional de la IPS Inga Kamëntsá, diseñado para ofrecer una experiencia de usuario moderna y accesible. El sitio incluye información sobre servicios médicos, sedes, directorio de personal, sistema de PQRS y agendamiento de citas.

**Desarrollado por:** NeuraiDev
**Cliente:** IPS Inga Kamëntsá
**Versión:** 0.1.0

## 🛠 Stack Tecnológico

Este proyecto está construido con tecnologías modernas y de vanguardia:

### Framework Principal

- **[Next.js 15.5.2](https://nextjs.org)** - Framework de React con renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG)
- **[React 19.1.0](https://react.dev)** - Biblioteca de JavaScript para construir interfaces de usuario
- **[React DOM 19.1.0](https://react.dev)** - Paquete para trabajar con el DOM

### Lenguajes

- **[TypeScript 5.x](https://www.typescriptlang.org)** - Superconjunto tipado de JavaScript
- **JavaScript (ES2017+)**

### Estilos

- **[Tailwind CSS 4.x](https://tailwindcss.com)** - Framework CSS utility-first
- **[Sass 1.92.1](https://sass-lang.com)** - Preprocesador CSS para estilos personalizados
- **PostCSS** - Herramienta para transformar CSS

### Herramientas de Desarrollo

- **[ESLint 9.x](https://eslint.org)** - Linter para identificar y reportar patrones en código
- **[Turbopack](https://turbo.build/pack)** - Bundler de nueva generación (incluido en Next.js 15)

## ✨ Características

- ✅ **Diseño Responsivo**: Optimizado para móviles, tablets y escritorio
- ✅ **Sistema de Agendamiento**: Integración con WhatsApp para citas
- ✅ **Múltiples Sedes**: Información de 4 sedes (Sibundoy, Colón, Santiago, San Andrés)
- ✅ **Búsqueda Global**: Sistema de búsqueda integrado en todo el sitio
- ✅ **SEO Optimizado**: Metadatos y estructura optimizada para motores de búsqueda
- ✅ **PQRS**: Sistema de Peticiones, Quejas, Reclamos y Sugerencias
- ✅ **Integración Social**: Enlaces a redes sociales institucionales
- ✅ **Rendimiento**: Optimizado con Turbopack y técnicas de Next.js
- ✅ **TypeScript**: Código tipado para mayor seguridad y mantenibilidad

## 📁 Estructura del Proyecto

```
inga/
├── src/
│   ├── app/                 # App Router de Next.js (páginas y rutas)
│   ├── components/          # Componentes reutilizables de React
│   ├── containers/          # Contenedores de componentes
│   ├── contexts/            # Context API de React
│   ├── data/               # Datos estáticos y configuraciones
│   ├── hooks/              # Custom React Hooks
│   ├── styles/             # Estilos globales y módulos CSS/SCSS
│   ├── types/              # Definiciones de tipos TypeScript
│   └── utils/              # Funciones auxiliares y utilidades
├── public/                 # Archivos estáticos (imágenes, íconos, etc.)
├── .next/                  # Build output de Next.js (generado automáticamente)
├── node_modules/           # Dependencias del proyecto
├── next.config.ts          # Configuración de Next.js
├── tailwind.config.js      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
├── postcss.config.mjs      # Configuración de PostCSS
├── eslint.config.mjs       # Configuración de ESLint
└── package.json            # Dependencias y scripts
```

## 📦 Requisitos Previos

Asegúrate de tener instalado en tu sistema:

- **Node.js**: versión 20.x o superior
- **npm**: versión 10.x o superior (incluido con Node.js)

Puedes verificar tus versiones con:

```bash
node --version
npm --version
```

## 🚀 Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. **Clona el repositorio**

```bash
git clone <repository-url>
cd inga
```

2. **Instala las dependencias**

```bash
npm install
```

Esto instalará todas las dependencias necesarias listadas en `package.json`:

**Dependencias de Producción:**

- next (15.5.2)
- react (19.1.0)
- react-dom (19.1.0)
- sass (^1.92.1)

**Dependencias de Desarrollo:**

- @eslint/eslintrc (^3)
- @tailwindcss/postcss (^4)
- @types/node (^20)
- @types/react (^19)
- @types/react-dom (^19)
- eslint (^9)
- eslint-config-next (15.5.2)
- tailwindcss (^4)
- typescript (^5)

3. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

4. **Abre tu navegador**

Visita [http://localhost:3000](http://localhost:3000) para ver el sitio en funcionamiento.

## 🎮 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Inicia el servidor de desarrollo con Turbopack activado.

- El servidor se recarga automáticamente cuando haces cambios
- La página se actualiza automáticamente en el navegador
- Incluye Hot Module Replacement (HMR) ultrarrápido gracias a Turbopack

### `npm run build`

Construye la aplicación para producción con optimizaciones de Turbopack.

- Genera archivos optimizados en la carpeta `.next/`
- Aplica minificación y optimización de código
- Prepara el sitio para despliegue

### `npm start`

Inicia el servidor en modo producción.

- Requiere ejecutar `npm run build` primero
- Sirve la aplicación optimizada
- Útil para pruebas previas al despliegue

### `npm run lint`

Ejecuta ESLint para encontrar y reportar problemas en el código.

- Verifica estándares de codificación
- Identifica posibles errores
- Ayuda a mantener la calidad del código

## ⚙️ Configuración

### Path Aliases

El proyecto utiliza path aliases configurados en `tsconfig.json`:

```typescript
"paths": {
  "@/*": ["./src/*"]
}
```

Esto permite importar módulos de forma más limpia:

```typescript
// ❌ Antes
import Component from "../../../components/Component";

// ✅ Ahora
import Component from "@/components/Component";
```

### Turbopack

Este proyecto utiliza Turbopack, el nuevo bundler de Vercel que ofrece:

- Compilación hasta 700x más rápida que Webpack
- Hot Module Replacement instantáneo
- Menor uso de memoria

### Tailwind CSS 4.x

El proyecto usa la última versión de Tailwind CSS con PostCSS. La configuración se encuentra en:

- `tailwind.config.js` - Configuración de Tailwind
- `postcss.config.mjs` - Configuración de PostCSS

## 📄 Páginas Principales

El sitio incluye las siguientes páginas (implementadas con App Router):

- **`/`** - Página de inicio con hero, servicios y llamados a la acción
- **`/servicios`** - Información detallada de servicios médicos
- **`/sedes`** - Detalles de las 4 sedes de atención
- **`/directorio`** - Directorio del personal médico y administrativo
- **`/pqrs`** - Sistema de Peticiones, Quejas, Reclamos y Sugerencias
- **`/citas`** - Sistema de agendamiento de citas

## 🤝 Contribución

Si deseas contribuir a este proyecto:

1. Crea un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/your_user`)
3. Haz commit de tus cambios (`git commit -m 'Add some your_user'`)
4. Push a la rama (`git push origin feature/your_user`)
5. Abre un Pull Request

Asegúrate de:

- Seguir las convenciones de código del proyecto
- Ejecutar `npm run lint` antes de hacer commit
- Probar tus cambios en diferentes dispositivos

## 🚢 Despliegue

### Despliegue en Vercel

La forma más sencilla de desplegar este sitio es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), creada por los desarrolladores de Next.js.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles sobre otras opciones de despliegue.

## 📝 Licencia

Este proyecto está bajo la licencia especificada en el archivo `LICENSE`.

---

**Desarrollado con 💙 por [neurai.dev](https://neurai.dev/) para IPS Inga Kamëntsá**
