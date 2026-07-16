# Sistema Backend — IPS Inga Kamentsa

## Que es y por que existe

El backend es la capa del sistema que opera de forma invisible para los usuarios finales pero que hace posible que el sitio web sea dinamico, seguro y gestionable. Antes de tener este backend, todos los contenidos del sitio estaban codificados directamente en el codigo fuente, lo que significaba que cualquier cambio —una nueva noticia, actualizar un servicio, agregar una foto a la galeria— requeria modificar archivos de codigo y hacer un nuevo despliegue del sitio.

Con el backend implementado en la rama `backend`, el equipo puede gestionar todo el contenido del sitio desde un panel administrativo protegido, sin tocar una sola linea de codigo.

---

## Arquitectura tecnica

| Capa | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| API | Route Handlers (`/src/app/api/`) |
| Base de datos | Cloudflare D1 (SQLite en el edge) |
| Almacenamiento de archivos | Cloudflare R2 (equivalente a S3) |
| Autenticacion | Clerk |
| Despliegue | Cloudflare Pages via OpenNext |

---

## Modulos implementados

### Panel de administracion (`/admin`)

Interfaz web protegida con autenticacion. Solo el administrador autorizado puede acceder. Contiene las siguientes secciones:

| Seccion | Ruta admin | Descripcion |
|---|---|---|
| Dashboard | `/admin` | Vista general del panel |
| Publicaciones | `/admin/publicaciones` | Blog con editor enriquecido (Tiptap) |
| Noticias | `/admin/noticias` | Noticias y eventos institucionales |
| Galeria | `/admin/galeria` | Fotos y recursos visuales |
| Documentos | `/admin/documentos` | Archivos PDF y documentos institucionales |
| Servicios | `/admin/servicios` | Servicios medicos ofrecidos |
| Directorio | `/admin/directorio` | Directorio telefonico del personal |
| Sedes | `/admin/sedes` | Informacion de las sedes |

### APIs REST (`/api`)

Cada modulo tiene su propio conjunto de endpoints que siguen el estandar REST:

```
GET    /api/{modulo}        — Listar todos los registros
POST   /api/{modulo}        — Crear un nuevo registro
GET    /api/{modulo}/[id]   — Obtener un registro por ID
PUT    /api/{modulo}/[id]   — Actualizar un registro
DELETE /api/{modulo}/[id]   — Eliminar un registro
```

Modulos disponibles: `noticias`, `publicaciones`, `galeria`, `documentos`, `servicios`, `directorio`, `sedes`

### Subida de archivos (`/api/upload`)

Endpoint dedicado para cargar imagenes y documentos directamente a Cloudflare R2. Los archivos se organizan por carpetas (ej. `galeria/`, `documentos/`, `general/`) y se les asigna un nombre unico basado en la marca de tiempo para evitar colisiones.

---

## Beneficios concretos para el equipo

### 1. Gestion de contenido sin codigo

El personal administrativo puede crear, editar y eliminar contenido desde el navegador. No se necesita ningun conocimiento tecnico. El flujo es:

1. Ingresar a `/admin/sign-in`
2. Autenticarse con la cuenta autorizada
3. Navegar al modulo deseado (noticias, galeria, etc.)
4. Crear o modificar el contenido con el formulario visual
5. Guardar — el cambio se refleja en el sitio publico de inmediato

### 2. Autenticacion segura con Clerk

El panel esta protegido con Clerk, un servicio de autenticacion profesional. Caracteristicas de seguridad incluidas:

- Solo el correo electronico del administrador autorizado puede ingresar
- Si un usuario no autenticado intenta acceder a `/admin/*`, es redirigido automaticamente a la pagina de inicio de sesion
- Si un usuario autenticado pero no autorizado intenta acceder, tambien es bloqueado
- El cierre de sesion invalida la sesion de forma segura

### 3. Base de datos real y persistente

Los datos se almacenan en **Cloudflare D1**, una base de datos SQL real que vive en la infraestructura de Cloudflare. Esto significa:

- Los datos persisten entre despliegues — actualizar el sitio no borra el contenido
- Se pueden hacer consultas complejas (filtros, ordenamiento, busqueda)
- Las noticias se pueden marcar como activas o inactivas sin eliminarlas
- Las publicaciones tienen estados: `borrador`, `publicado`, `archivado`

### 4. Almacenamiento de archivos escalable

Con **Cloudflare R2**, el equipo puede subir imagenes y documentos PDF sin preocuparse por el espacio en disco. R2 es compatible con el estandar S3 de Amazon y ofrece:

- Sin costo de transferencia de datos (egress gratuito)
- Organizacion por carpetas por tipo de contenido
- Nombres de archivo sanitizados automaticamente (sin espacios ni caracteres especiales)
- Escalabilidad ilimitada

### 5. Editor enriquecido para publicaciones

Las publicaciones del blog usan **Tiptap**, un editor de texto enriquecido que permite:

- Formato de texto (negrita, italica, listas, encabezados)
- Insercion de imagenes
- Insercion de videos de YouTube
- Insercion de enlaces
- Vista previa del contenido antes de publicar

### 6. Separacion total entre frontend y backend

El frontend (lo que ven los usuarios) y el backend (el panel de gestion) son independientes. Esto aporta:

- **Seguridad**: los usuarios del sitio publico nunca tienen acceso a las rutas de administracion
- **Estabilidad**: un error en el panel no afecta el sitio publico
- **Mantenibilidad**: cada equipo puede trabajar en su area sin interferir con el otro

### 7. Despliegue en el edge global

Al usar Cloudflare Pages con OpenNext, el sistema completo (frontend + backend + base de datos) se despliega en la red global de Cloudflare, con servidores en mas de 300 ciudades del mundo. Beneficios:

- Tiempos de respuesta muy bajos para usuarios en Colombia y America Latina
- Alta disponibilidad — si un servidor falla, otro toma el relevo automaticamente
- Sin servidor propio que mantener, actualizar o pagar por separado

---

## Flujo de trabajo recomendado para el equipo de backend

```
1. Autenticarse en /admin/sign-in
2. Seleccionar el modulo a gestionar en el sidebar
3. Usar el boton "Nuevo ..." para crear contenido
4. Completar el formulario y guardar
5. Verificar en el sitio publico que el cambio se ve correctamente
6. Para editar: hacer clic en el icono de lapiz junto al registro
7. Para eliminar: hacer clic en el icono de basurero (se pedira confirmacion)
8. Cerrar sesion al terminar
```

---

## Estructura de archivos del backend

```
src/
  app/
    admin/                        # Panel de administracion
      layout.tsx                  # Layout con sidebar, autenticacion y navegacion
      page.tsx                    # Dashboard principal
      sign-in/[[...sign-in]]/     # Pagina de inicio de sesion (Clerk)
      publicaciones/page.tsx      # Gestion de publicaciones (editor Tiptap)
      noticias/page.tsx           # Gestion de noticias y eventos
      galeria/page.tsx            # Gestion de galeria de fotos
      documentos/page.tsx         # Gestion de documentos
      servicios/page.tsx          # Gestion de servicios medicos
      directorio/page.tsx         # Gestion de directorio telefonico
      sedes/page.tsx              # Gestion de sedes
    api/                          # Endpoints REST
      upload/route.ts             # Subida de archivos a Cloudflare R2
      noticias/
        route.ts                  # GET (listar) / POST (crear)
        [id]/route.ts             # GET / PUT / DELETE por ID
      publicaciones/
        route.ts
        [id]/route.ts
      galeria/
        route.ts
        [id]/route.ts
      documentos/
        route.ts
        [id]/route.ts
      servicios/
        route.ts
        [id]/route.ts
      directorio/
        route.ts
        [id]/route.ts
      sedes/
        route.ts
        [id]/route.ts
```

---

## Variables de entorno requeridas

Para que el sistema funcione correctamente se necesitan las siguientes variables configuradas en Cloudflare Pages:

| Variable | Descripcion |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clave publica de Clerk |
| `CLERK_SECRET_KEY` | Clave secreta de Clerk |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Correo del administrador autorizado |

Los bindings de Cloudflare (`DB` para D1 y `STORAGE` para R2) se configuran directamente en el dashboard de Cloudflare Pages, no como variables de entorno.

---

## Posibles mejoras futuras

- **Roles multiples**: permitir varios niveles de acceso (editor, revisor, administrador)
- **Historial de cambios**: registrar quien hizo cada modificacion y cuando
- **Previsualizacion**: ver como queda el contenido antes de publicarlo
- **Programacion de publicaciones**: definir fecha y hora de publicacion automatica
- **URL publica de R2**: configurar dominio personalizado para los archivos subidos, reemplazando la clave interna por una URL accesible publicamente
- **Busqueda en el panel**: filtrar registros por titulo, fecha o estado directamente en el admin
- **Exportacion de datos**: descargar reportes en CSV o PDF desde el panel
