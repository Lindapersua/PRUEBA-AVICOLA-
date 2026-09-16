# Plumas Doradas — Sitio web avícola (demo)

Sitio web estático de **Plumas Doradas**, una marca **ficticia** creada como demostración de un sitio comercial de avicultura (gallinas, pollitos y razas puras), inspirado en las prácticas de UX/SEO de tiendas comerciales deportivas con buen posicionamiento orgánico (categorías claras, fichas de producto ricas, blog de contenido, CTAs directos).

> ⚠️ Todos los datos de la empresa (nombre, dirección, teléfono, precios, testimonios) son ficticios y solo tienen fines demostrativos.

## Contenido del sitio

- **Catálogo por categorías**: Gallinas Ponedoras, Pollitos BB, Razas Ornamentales, Gallos Reproductores, Insumos y Accesorios.
- **15 fichas de producto** con descripción, ficha técnica, galería de imágenes (ilustraciones SVG propias) y sección de video informativo enlazada al blog.
- **Blog SEO** con 5 artículos de guías de crianza, cada uno con enlaces internos y al menos un enlace saliente (outbound) a fuentes autorizadas (FAO, WOAH, WPSA, Wikipedia).
- **Nosotros**: misión, visión, valores/identidad de marca y línea de tiempo de la historia de la empresa.
- **Legal**: aviso legal, política de privacidad, términos y condiciones, política de cookies.
- **Carrito de compras** funcional con `localStorage` (sin backend de pago; el checkout redirige a un formulario de contacto con el resumen del pedido).
- **SEO técnico**: metadatos únicos por página, Open Graph, datos estructurados JSON-LD (Organization, WebSite, Product, BlogPosting), `sitemap.xml` y `robots.txt`.
- **Accesibilidad de encabezados**: cada página tiene exactamente un `<h1>` y una jerarquía `h1`–`h6` sin encabezados vacíos.

## Estructura

```
plumas-doradas/
├── index.html
├── productos.html
├── categoria-*.html          (5 páginas de categoría)
├── productos/*.html          (15 fichas de producto)
├── blog.html
├── blog/*.html               (5 artículos)
├── nosotros.html
├── contacto.html
├── carrito.html
├── aviso-legal.html / politica-privacidad.html / terminos-condiciones.html / politica-cookies.html
├── sitemap.xml / robots.txt
└── assets/
    ├── css/styles.css
    └── js/main.js, cart.js
```

## Cómo verlo localmente

Es un sitio 100% estático (HTML/CSS/JS sin build), así que basta con levantar cualquier servidor estático desde esta carpeta, por ejemplo:

```bash
ruby -run -e httpd . -p 4173
```

y abrir `http://localhost:4173`.

## Cómo generarlo de nuevo

El sitio fue generado con el script `build.rb` (más `icons.rb`) para mantener consistencia de plantillas, SEO y encabezados en todas las páginas. Si necesitas editar textos, precios o agregar productos/artículos, lo más simple es editar directamente el HTML de la página correspondiente (no es necesario volver a ejecutar ningún generador).

## Personalización antes de publicar

- Reemplazar las ilustraciones SVG por fotografías y videos reales del negocio.
- Actualizar datos de contacto, redes sociales y dirección en `contacto.html` y en el pie de página de todas las páginas.
- Conectar el formulario de contacto y el checkout del carrito a un backend real (email, WhatsApp Business API o pasarela de pago) si se usa en producción.
- Reemplazar el dominio de ejemplo `plumasdoradas.com` en metadatos, canonical y JSON-LD por el dominio real.
