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
//   ficha   → datos en filas "Dato: valor" (color, talles, tela...) (opcional)
//             ej: ficha: [["Color", "Blanca o negra"], ["Talles", "M al XXL"]]
// =====================================================================

window.CATEGORIAS = [
  {
    id: "textiles",
    nombre: "Textiles",
    bajada: "Prendas y bolsas estampadas a tu gusto.",
    productos: [
      {
        nombre: "Remera de hombre",
        detalle: "Escote redondo y manga corta. Estampado en el frente o la espalda.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca o negra"], ["Talles", "M al XXL. En blanca, también oversize"], ["Tela", "Algodón premium"], ["Estampado", "DTF"]],
      },
      {
        nombre: "Remera de mujer",
        detalle: "Manga corta. Estampado en el frente o la espalda.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca, negra o de colores"], ["Escote", "Redondo. Las de colores, profundo"], ["Talles", "S al XXL"], ["Tela", "Algodón premium"], ["Estampado", "DTF"]],
      },
      {
        nombre: "Remera de niño",
        detalle: "Escote redondo y manga corta. Estampado en el frente o la espalda.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca"], ["Talles", "6 al 14"], ["Tela", "Algodón premium"], ["Estampado", "DTF"]],
      },
      {
        nombre: "Remeras publicitarias × 6 unidades",
        detalle: "Unisex, escote redondo y manga corta. Para eventos, equipos o tu emprendimiento.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca"], ["Talles", "M, XL y XXL"], ["Tela", "70 % poliéster y 30 % algodón"], ["Estampado", "Sublimación"]],
      },
      {
        nombre: "Bolsa tote bag con tiras",
        detalle: "Bolsa de tela estampada con tu diseño.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color y tela", "Cruda de lienzo, o negra o de colores de gabardina"], ["Estampado", "DTF"]],
      },
      { nombre: "Varios", detalle: "Consultá por otros textiles.", precio: null, tipo: "fisico", estampado: true },
    ],
  },
  {
    id: "objetos",
    nombre: "Objetos",
    bajada: "Regalos y objetos personalizados.",
    productos: [
      {
        nombre: "Taza de cerámica recta",
        detalle: "Con tu foto, frase o diseño.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca"], ["Material", "Cerámica importada"], ["Estampado", "Sublimación"]],
      },
      {
        nombre: "Tazas con asa de corazón × 2 unidades",
        detalle: "Ideales para regalar de a dos.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca"], ["Material", "Cerámica importada"], ["Estampado", "Sublimación"]],
      },
      {
        nombre: "Taza con interior de color y cucharita",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Combinada"], ["Material", "Cerámica importada"], ["Estampado", "Consultar"]],
      },
      {
        nombre: "Taza para chicos con nombre",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Color", "Blanca"], ["Material", "Polímero plástico"], ["Estampado", "Sublimación"]],
      },
      {
        nombre: "Tazas souvenir para chicos × 6 unidades",
        detalle: "Para cumpleaños y eventos.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Opciones", "De plástico de colores (estampado DTF) o de polímero blanco (sublimación)"]],
      },
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
      {
        nombre: "Base estampada tamaño A4",
        detalle: "Se estampa con la foto que quieras.",
        precio: null, tipo: "fisico", estampado: true,
        ficha: [["Material", "Imantada o de metal"], ["Estampado", "Sublimación"]],
      },
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
        detalle: "En 2 posiciones (vertical y horizontal) y 2 variantes de color. Incluye un slogan de regalo.",
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
  {
    id: "profes",
    nombre: "De profes para profes",
    bajada: "Guías prácticas para el día a día en la escuela de Provincia de Buenos Aires.",
    productos: [
      {
        nombre: "Sistema ABC: inscripciones y listados",
        detalle: "¿Recién recibida/o? Entendé cómo funciona el sistema ABC. PDF con audio explicativo.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Registro de asistencia en Pcia. de Bs. As.",
        detalle: "Cómo usarlo paso a paso. PDF con audio explicativo.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Cómo hacer un acta escolar",
        detalle: "Fundamentación y ejemplos de actas. PDF con audio explicativo.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Carga de licencias",
        detalle: "¿No podés cargar tu licencia por enfermedad, por familiar o por psiquiatría? Instructivo digital.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Carga de licencias especiales",
        detalle: "Por psiquiatría o enfermedad crónica. Instructivo digital.",
        precio: null, tipo: "digital",
      },
    ],
  },
  {
    id: "disenadoras",
    nombre: "Mini Diseñadoras",
    bajada: "Para las que sueñan con hacer ropa, preparar desfiles y decorar a sus muñecas.",
    productos: [
      {
        nombre: "Kit para dibujar e imprimir",
        detalle: "Explicación de las proporciones para bocetar el cuerpo humano, con video explicativo. Incluye 12 contornos de cuerpos y 8 de accesorios para diseñar arriba. PDF para imprimir en A4.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Kit Mini Diseñadoras (caja)",
        detalle: "Figurines impresos de las décadas del 20, 40, 60 y 80; bocetos y siluetas en blanco y negro; moldes base de remera, pantalón, pollera y short; muestrarios de telas, botones y accesorios; tanza elastizada y canutillos para armar una pulsera.",
        precio: null, tipo: "fisico",
      },
      {
        nombre: "Mi historia y la Moda",
        detalle: "Cuento ilustrado en imprenta mayúscula, para leer y soñar a lo grande. PDF.",
        precio: null, tipo: "digital",
      },
      {
        nombre: "Kit de equipos de fútbol y sus camisetas",
        precio: null, tipo: "fisico", proximamente: true,
      },
    ],
  },
];
