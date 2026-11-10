// Página de KRSp (los que hicimos la web). Mientras esté vacío, el logo del pie no lleva a ningún lado.
const SITIO_KRSP = ""; // ej. "https://krsp.com.ar"

// REEMPLAZAR: número de WhatsApp de la tienda (el mismo del pie), con 549 + característica, sin espacios.
// El botón "Consultar por WhatsApp" de cada producto arma el mensaje con el nombre del producto.
const WHATSAPP = "5491100000000";

// Dibuja la tienda a partir de js/productos.js: una fila de categorías y las tarjetas de la elegida.
// No hay carrito todavía: cada tarjeta muestra precio o "Consultar".
// Al tocar una tarjeta se abre el detalle (fotos, ficha, opciones y botón de WhatsApp).
(function () {
  const filtros = document.getElementById("filtros");
  const grilla = document.getElementById("catalogo");
  if (!filtros || !grilla || !window.CATEGORIAS) return;

  const pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const iconos = {
    todo: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    estampados: '<circle cx="12" cy="5" r="2.5"/><path d="M10.5 7.5v4h3v-4"/><rect x="5" y="11.5" width="14" height="4" rx="1"/><path d="M5 19.5h14"/>',
    textiles: '<path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z"/>',
    objetos: '<path d="M5 6h11v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V6Zm11 2h1.5a2.5 2.5 0 0 1 0 5H16"/>',
    acrilico: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    tela: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.3"/><circle cx="15" cy="15" r="1.3"/><circle cx="15" cy="9" r="1.3"/><circle cx="9" cy="15" r="1.3"/>',
    imanes: '<path d="M6 4v8a6 6 0 0 0 12 0V4h-4v8a2 2 0 0 1-4 0V4H6Zm0 4h4m4 0h4"/>',
    diseno: '<path d="m15 4 5 5-10 10H5v-5L15 4Zm-3 3 5 5"/>',
    dislexia: '<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4V5Zm16 0h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6V5Z"/>',
    profes: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 10h7M8.5 14h7M8.5 18h4"/>',
    disenadoras: '<circle cx="12" cy="5" r="2"/><path d="M12 7v3m-3 0h6l3 10H6l3-10Z"/>',
  };
  // Color de fondo del ícono de cada categoría (decorativo: el nombre siempre va escrito al lado)
  const tintes = {
    todo: "#f8dcc7", estampados: "#f6c9b8", textiles: "#f6c9b8", objetos: "#f3d9a4", acrilico: "#cfe0d2", tela: "#e9cfe3",
    imanes: "#f2c6c6", diseno: "#ddd6ee", dislexia: "#f4e2a8", profes: "#d8e4cf", disenadoras: "#f3ccd9",
  };
  const icono = (id) =>
    `<span class="icono-cat" style="--tinte:${tintes[id] || tintes.todo}" aria-hidden="true"><svg viewBox="0 0 24 24">${iconos[id] || iconos.objetos}</svg></span>`;

  // Índice de categorías, con "Todo" primero y después "Estampados", que junta los productos
  // marcados con estampado: true en productos.js (de cualquier categoría)
  // Cada producto recibe un código (categoría + número) para encontrarlo al abrir su detalle
  const porCodigo = {};
  window.CATEGORIAS.forEach((c) => c.productos.forEach((p, i) => { p._cod = `${c.id}-${i}`; p._cat = c.id; porCodigo[p._cod] = p; }));
  // fotos: acepta "foto" (una) o "fotos" (varias)
  const fotosDe = (p) => p.fotos || (p.foto ? [p.foto] : []);
  const precioDe = (p) => (p.proximamente ? "Próximamente" : p.precio ? pesos.format(p.precio) : "Consultar");
  const etiquetaDe = (p) => p.proximamente
    ? '<span class="etiqueta etiqueta--pronto">Próximamente</span>'
    : p.tipo === "digital"
      ? '<span class="etiqueta etiqueta--digital">PDF / digital</span>'
      : '<span class="etiqueta">Físico</span>';

  const todas = [{ id: "todo", nombre: "Todo" }, { id: "estampados", nombre: "Estampados" }, ...window.CATEGORIAS];
  const estampados = () => window.CATEGORIAS
    .map((c) => ({ ...c, productos: c.productos.filter((p) => p.estampado) }))
    .filter((c) => c.productos.length);
  filtros.innerHTML = todas
    .map((c, i) => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${i === 0}">${icono(c.id)}<span>${esc(c.nombre)}</span></button>`)
    .join("");

  // Tarjeta corta: foto (o ícono), nombre, texto breve y precio. El resto va en el detalle.
  function tarjeta(p, cat) {
    const foto = fotosDe(p)[0];
    const arriba = foto
      ? `<div class="tarjeta__foto"><img src="${esc(foto)}" alt="" width="400" height="300" loading="lazy" decoding="async"></div>`
      : "";
    return `<article class="tarjeta${p.proximamente ? " tarjeta--pronto" : ""}">
      ${arriba}
      <div class="tarjeta__arriba">${foto ? "<span></span>" : icono(cat.id)}${etiquetaDe(p)}</div>
      <h4>${esc(p.nombre)}</h4>
      ${p.detalle ? `<p class="tarjeta__texto">${esc(p.detalle)}</p>` : ""}
      <div class="tarjeta__pie">
        <p class="precio">${precioDe(p)}</p>
        <button type="button" class="ver-detalle" data-prod="${p._cod}">Ver detalle<span class="saltar"> de ${esc(p.nombre)}</span> <span aria-hidden="true">→</span></button>
      </div>
    </article>`;
  }

  // En "Todo" cada categoría muestra sus primeros materiales y un botón para ver el resto
  // (3 en compu, que es una fila; 2 en celu, donde las tarjetas van una abajo de la otra)
  const muestra = () => (window.matchMedia("(max-width: 639px)").matches ? 2 : 3);

  function dibujar(catId) {
    const enTodo = catId === "todo";
    const lista = catId === "estampados" ? estampados()
      : enTodo ? window.CATEGORIAS : window.CATEGORIAS.filter((c) => c.id === catId);
    grilla.innerHTML = lista
      .map((c) => {
        const productos = enTodo ? c.productos.slice(0, muestra()) : c.productos;
        const resto = c.productos.length - productos.length;
        return `<section class="categoria" aria-labelledby="cat-${c.id}">
        <header class="categoria__cab">
          ${icono(c.id)}
          <div>
            <h3 id="cat-${c.id}">${esc(c.nombre)}</h3>
            ${c.bajada ? `<p>${esc(c.bajada)}</p>` : ""}
          </div>
        </header>
        <div class="grilla">${productos.map((p) => tarjeta(p, c)).join("")}</div>
        ${resto > 0 ? `<button type="button" class="ver-mas" data-ver="${c.id}">Ver los ${c.productos.length} materiales de ${esc(c.nombre)}</button>` : ""}
      </section>`;
      })
      .join("");
  }

  // Lleva la vista al principio de la lista si quedó arriba o abajo de la pantalla
  function irALaLista() {
    const nav = document.querySelector(".nav");
    const alto = nav ? nav.offsetHeight : 0;
    const arriba = grilla.getBoundingClientRect().top;
    if (arriba < alto || arriba > window.innerHeight * 0.6) grilla.scrollIntoView({ block: "start" });
  }

  function elegir(catId) {
    const b = filtros.querySelector(`[data-cat="${catId}"]`);
    if (!b) return;
    filtros.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    filtros.scrollLeft = b.offsetLeft - (filtros.clientWidth - b.offsetWidth) / 2;
    dibujar(catId);
    irALaLista();
  }

  filtros.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (b) elegir(b.dataset.cat);
  });

  grilla.addEventListener("click", (e) => {
    const b = e.target.closest(".ver-mas");
    if (b) elegir(b.dataset.ver);
    const d = e.target.closest(".ver-detalle");
    if (d) abrirDetalle(porCodigo[d.dataset.prod]);
  });

  // ---------- Detalle del producto (pop-up en compu, pantalla completa en celu) ----------
  const detalle = document.getElementById("detalle");
  const cuerpo = detalle && detalle.querySelector(".detalle__cuerpo");
  let fotoActual = 0;
  let enHistorial = false; // si el detalle dejó una entrada en el historial (para el botón "atrás")

  // Cierra el detalle y deja la página como estaba (scroll destrabado, historial limpio)
  function cerrarDetalle() {
    if (detalle.open) detalle.close();
    document.documentElement.classList.remove("con-detalle");
    if (enHistorial) { enHistorial = false; history.back(); }
  }

  function mostrarFoto(fotos, n) {
    fotoActual = (n + fotos.length) % fotos.length;
    const img = cuerpo.querySelector(".detalle__foto img");
    img.src = fotos[fotoActual];
    cuerpo.querySelector(".detalle__cuenta").textContent = `Foto ${fotoActual + 1} de ${fotos.length}`;
    cuerpo.querySelectorAll(".detalle__mini").forEach((b, i) => b.setAttribute("aria-pressed", String(i === fotoActual)));
  }

  function abrirDetalle(p) {
    if (!p || !detalle) return;
    const fotos = fotosDe(p);
    const varias = fotos.length > 1;
    const galeria = fotos.length
      ? `<div class="detalle__foto">
          <img src="${esc(fotos[0])}" alt="Foto de ${esc(p.nombre)}" width="800" height="600" decoding="async">
          ${varias ? `<button type="button" class="detalle__flecha detalle__flecha--ant" data-paso="-1" aria-label="Foto anterior">‹</button>
          <button type="button" class="detalle__flecha detalle__flecha--sig" data-paso="1" aria-label="Foto siguiente">›</button>` : ""}
        </div>
        ${varias ? `<p class="detalle__cuenta" aria-live="polite"></p>
        <div class="detalle__minis">${fotos.map((f, i) => `<button type="button" class="detalle__mini" data-foto="${i}" aria-label="Ver foto ${i + 1}"><img src="${esc(f)}" alt="" width="80" height="60" loading="lazy"></button>`).join("")}</div>` : '<p class="detalle__cuenta" hidden></p>'}`
      : `<div class="detalle__foto detalle__foto--vacia">${icono(p._cat)}<span>Foto próximamente</span></div>`;
    const ficha = p.ficha
      ? `<dl class="ficha">${p.ficha.map(([d, v]) => `<div><dt>${esc(d)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`
      : "";
    const opciones = p.opciones
      ? `<p class="detalle__subt">Opciones</p><ul class="opciones">${p.opciones.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`
      : "";
    const mensaje = encodeURIComponent(`¡Hola! Quiero consultar por: ${p.nombre}`);
    cuerpo.innerHTML = `
      <div class="detalle__galeria">${galeria}</div>
      <div class="detalle__info">
        ${etiquetaDe(p)}
        <h3 id="detalle-titulo">${esc(p.nombre)}</h3>
        ${p.detalle ? `<p class="detalle__texto">${esc(p.detalle)}</p>` : ""}
        ${ficha}
        ${opciones}
        <p class="precio">${precioDe(p)}</p>
        ${p.proximamente ? "" : `<a class="boton detalle__pedir" href="https://wa.me/${WHATSAPP}?text=${mensaje}" target="_blank" rel="noopener">Consultar por WhatsApp</a>`}
      </div>`;
    if (varias) mostrarFoto(fotos, 0);
    detalle._fotos = fotos;
    detalle.showModal();
    document.documentElement.classList.add("con-detalle");
    cuerpo.scrollTop = 0;
    // en el celu, el botón "atrás" cierra el detalle en vez de salir de la página
    history.pushState({ detalle: true }, "");
    enHistorial = true;
  }

  if (detalle) {
    detalle.addEventListener("click", (e) => {
      if (e.target === detalle || e.target.closest(".detalle__cerrar")) return cerrarDetalle();
      const f = e.target.closest("[data-paso]");
      if (f) mostrarFoto(detalle._fotos, fotoActual + Number(f.dataset.paso));
      const m = e.target.closest("[data-foto]");
      if (m) mostrarFoto(detalle._fotos, Number(m.dataset.foto));
    });
    detalle.addEventListener("keydown", (e) => {
      if (detalle._fotos && detalle._fotos.length > 1 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        mostrarFoto(detalle._fotos, fotoActual + (e.key === "ArrowRight" ? 1 : -1));
      }
    });
    // Escape (o cualquier otro cierre) también limpia
    detalle.addEventListener("cancel", (e) => { e.preventDefault(); cerrarDetalle(); });
    detalle.addEventListener("close", cerrarDetalle);
    window.addEventListener("popstate", () => { enHistorial = false; cerrarDetalle(); });
  }

  // Las barras del inicio abren una categoría: <a href="#tienda" data-abrir="dislexia">
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-abrir]");
    if (!a) return;
    if (!filtros.querySelector(`[data-cat="${a.dataset.abrir}"]`)) return;
    e.preventDefault();
    elegir(a.dataset.abrir);
    // ir directo a los materiales de esa categoría, no al título de la tienda
    grilla.scrollIntoView({ block: "start" });
  });

  dibujar("todo");

  // Menú del celu: abre y cierra; se cierra al tocar un link o con Escape
  const botonMenu = document.querySelector(".nav__menu");
  const menu = document.getElementById("menu-movil");
  if (botonMenu && menu) {
    const cerrar = () => { menu.hidden = true; botonMenu.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
    botonMenu.addEventListener("click", () => {
      const abrir = menu.hidden;
      menu.hidden = !abrir;
      botonMenu.setAttribute("aria-expanded", String(abrir));
      document.body.style.overflow = abrir ? "hidden" : "";
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) cerrar(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { cerrar(); botonMenu.focus(); } });
  }

  // Link del logo de KRSp en el pie
  document.querySelectorAll('[data-link="krsp"]').forEach((a) => { if (SITIO_KRSP) a.href = SITIO_KRSP; });

  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
