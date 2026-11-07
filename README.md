# web-mama

Página de la tienda (nombre de marca pendiente). Sitio estático: HTML, CSS y JS sin dependencias.

## Estructura

```
index.html          secciones: Inicio, Yo soy, Mi trayectoria, Tienda, Recursos gratuitos, Contacto
css/styles.css      colores y tipografías en las variables de :root
js/productos.js     catálogo (categorías y productos) — se edita acá
js/catalogo.js      dibuja la tienda y los filtros
img/logo.svg        logo provisorio
```

## Pendiente de completar

- Nombre de la marca (buscar "Nombre de la marca" en index.html)
- Logo definitivo en `img/`
- Textos de "Yo soy" y "Mi trayectoria" (marcados con `REEMPLAZAR`)
- Precios y fotos en `js/productos.js` (fotos en WebP, ~800 px de ancho)
- Recursos gratuitos (PDFs) y datos de contacto
- Carrito / forma de compra: a definir

## Probar en local

```
python3 -m http.server
```
y abrir http://localhost:8000
