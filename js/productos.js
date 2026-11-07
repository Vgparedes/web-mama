// =====================================================================
// CATÁLOGO · acá se cargan todas las categorías y productos.
//
// Para agregar un producto, copiá un bloque { ... } y cambiá los datos.
//   nombre  → lo que se ve en la tarjeta
//   detalle → texto corto debajo (opcional)
//   precio  → número sin puntos (ej: 4500). Si queda null dice "Consultar".
//   tipo    → "fisico" o "digital" (digital = PDF / archivo que se envía)
//   foto    → ruta de la imagen, ej: "img/productos/taza.webp" (opcional)
//   opciones→ lista de variantes (temas, modelos, etc.) (opcional)
// =====================================================================

window.CATEGORIAS = [
  {
    id: "textiles",
    nombre: "Textiles",
    bajada: "Prendas y bolsas estampadas a tu gusto.",
    productos: [
      { nombre: "Remeras", detalle: "Estampadas con el diseño que quieras.", precio: null, tipo: "fisico" },
      { nombre: "Bolsas", detalle: "Bolsas de tela personalizadas.", precio: null, tipo: "fisico" },
      { nombre: "Varios", detalle: "Consultá por otros textiles.", precio: null, tipo: "fisico" },
    ],
  },
  {
    id: "objetos",
    nombre: "Objetos",
    bajada: "Regalos y objetos personalizados.",
    productos: [
      { nombre: "Tazas", detalle: "Con tu foto, frase o diseño.", precio: null, tipo: "fisico" },
      { nombre: "Carteles", detalle: "Para el aula, el consultorio o la casa.", precio: null, tipo: "fisico" },
      { nombre: "Varios", detalle: "Consultá por otros objetos.", precio: null, tipo: "fisico" },
    ],
  },
  {
    id: "acrilico",
    nombre: "Juegos en acrílico",
    bajada: "Juegos resistentes y fáciles de limpiar.",
    productos: [
      { nombre: "Memotest", precio: null, tipo: "fisico" },
      { nombre: "Rompecabezas", precio: null, tipo: "fisico" },
      { nombre: "Tarjetones", precio: null, tipo: "fisico" },
      { nombre: "Varios", detalle: "Consultá por otros juegos.", precio: null, tipo: "fisico" },
    ],
  },
  {
    id: "tela",
    nombre: "Juegos en tela",
    bajada: "Material sensorial y de juego hecho en tela.",
    productos: [
      { nombre: "Dado con bolsillos", precio: null, tipo: "fisico" },
      { nombre: "Panel de texturas", precio: null, tipo: "fisico" },
      { nombre: "Panel sensorial", precio: null, tipo: "fisico" },
      { nombre: "Panel mixto", precio: null, tipo: "fisico" },
      { nombre: "Pizarra enroscable", precio: null, tipo: "fisico" },
      {
        nombre: "Alfombra temática antideslizante",
        precio: null, tipo: "fisico",
        opciones: ["Pista de autos", "Castillo", "Otros"],
      },
    ],
  },
  {
    id: "imanes",
    nombre: "Imanes",
    bajada: "Para trabajar en la heladera, la pizarra o la base imantada.",
    productos: [
      { nombre: "Base estampada tamaño A4", detalle: "Se estampa con la foto que quieras.", precio: null, tipo: "fisico" },
      {
        nombre: "Kit de fichas: 20 imanes de 5 × 5 cm",
        precio: null, tipo: "fisico",
        opciones: ["Animales", "Frutas", "Profesiones", "Colores", "Objetos", "Las emociones", "Otros"],
      },
    ],
  },
  {
    id: "diseno",
    nombre: "Diseño gráfico",
    bajada: "Tu marca lista para usar. Todo se entrega en archivo digital.",
    productos: [
      { nombre: "Isologotipo", detalle: "Armado de 1 isologotipo para tu marca.", precio: null, tipo: "digital" },
      {
        nombre: "Kit de isologotipo",
        detalle: "En 2 posiciones (vertical y horizontal) y 2 variantes de color. ¡Incluye un slogan de regalo!",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Tarjeta personal",
        detalle: "9 × 5 cm, frente y dorso. Te llega en PDF listo para imprimir o compartir.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Carrusel para Instagram",
        detalle: "1 portada (gancho), 4 hojas internas y 1 cierre con llamada a la acción.",
        precio: null, tipo: "digital",
      },
    ],
  },
  {
    id: "dislexia",
    nombre: "Todo para dislexia",
    bajada: "Material en PDF para imprimir o trabajar desde la compu o el celu.",
    productos: [
      {
        nombre: "Cuadernillo A4 en colores pastel",
        detalle: "Hojas en tonos pastel y neutros que favorecen la lectura y la escritura. Surtidas: lisas, renglón ancho y angosto, cuadriculado grande y chico.",
        precio: null, tipo: "fisico",
      },
      { nombre: "Cuadernillo Monstruitos y Pseudopalabras", detalle: "PDF para imprimir en A4.", precio: null, tipo: "digital" },
      { nombre: "Cuadernillo de conciencia silábica", detalle: "En español, con términos 100 % argentinos. PDF para imprimir.", precio: null, tipo: "digital" },
      {
        nombre: "Comprensión lectora: cuento y cuestionario",
        detalle: "Full color, en imprenta mayúscula. PDF para imprimir.",
        precio: null, tipo: "digital",
        opciones: ["Nivel inicial", "Nivel medio", "Nivel superior"],
      },
      { nombre: "Cuadernillo Ordeno las oraciones", detalle: "Con dibujos reales. PDF listo para descargar e imprimir.", precio: null, tipo: "digital" },
    ],
  },
];
