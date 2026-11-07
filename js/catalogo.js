// Dibuja la tienda a partir de js/productos.js: filtros por categoría y tarjetas.
// No hay carrito todavía: cada tarjeta muestra precio o "Consultar".
(function () {
  const filtros = document.getElementById("filtros");
  const grilla = document.getElementById("catalogo");
  if (!filtros || !grilla || !window.CATEGORIAS) return;

  const pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const iconos = {
    textiles: '<path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z"/>',
    objetos: '<path d="M5 6h11v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V6Zm11 2h1.5a2.5 2.5 0 0 1 0 5H16"/>',
    acrilico: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    tela: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.3"/><circle cx="15" cy="15" r="1.3"/><circle cx="15" cy="9" r="1.3"/><circle cx="9" cy="15" r="1.3"/>',
    imanes: '<path d="M6 4v8a6 6 0 0 0 12 0V4h-4v8a2 2 0 0 1-4 0V4H6Zm0 4h4m4 0h4"/>',
    diseno: '<path d="m15 4 5 5-10 10H5v-5L15 4Zm-3 3 5 5"/>',
    dislexia: '<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4V5Zm16 0h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6V5Z"/>',
  };
  const icono = (id) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconos[id] || iconos.objetos}</svg>`;

  // Filtros
  const todas = [{ id: "todo", nombre: "Todo" }, ...window.CATEGORIAS];
  filtros.innerHTML = todas
    .map((c, i) => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${i === 0}">${esc(c.nombre)}</button>`)
    .join("");

  function tarjeta(p, cat) {
    const precio = p.precio ? pesos.format(p.precio) : "Consultar";
    const media = p.foto
      ? `<img src="${esc(p.foto)}" alt="${esc(p.nombre)}" width="400" height="300" loading="lazy" decoding="async">`
      : `<div class="tarjeta-icono">${icono(cat.id)}</div>`;
    const opciones = p.opciones
      ? `<ul class="opciones" aria-label="Opciones">${p.opciones.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`
      : "";
    const etiqueta = p.tipo === "digital"
      ? '<span class="etiqueta etiqueta-digital">PDF / digital</span>'
      : '<span class="etiqueta">Personalizado</span>';
    return `<article class="tarjeta">
      <div class="tarjeta-media">${media}</div>
      <div class="tarjeta-cuerpo">
        ${etiqueta}
        <h4>${esc(p.nombre)}</h4>
        ${p.detalle ? `<p>${esc(p.detalle)}</p>` : ""}
        ${opciones}
        <p class="precio">${precio}</p>
      </div>
    </article>`;
  }

  function dibujar(catId) {
    const lista = catId === "todo" ? window.CATEGORIAS : window.CATEGORIAS.filter((c) => c.id === catId);
    grilla.innerHTML = lista
      .map((c) => `<section class="categoria" aria-labelledby="cat-${c.id}">
        <header class="categoria-cab">
          <h3 id="cat-${c.id}">${esc(c.nombre)}</h3>
          ${c.bajada ? `<p>${esc(c.bajada)}</p>` : ""}
        </header>
        <div class="grilla">${c.productos.map((p) => tarjeta(p, c)).join("")}</div>
      </section>`)
      .join("");
  }

  filtros.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    filtros.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    dibujar(b.dataset.cat);
  });

  // Los botones de la home pueden abrir una categoría: <a href="#tienda" data-abrir="dislexia">
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-abrir]");
    if (!a) return;
    const chip = filtros.querySelector(`[data-cat="${a.dataset.abrir}"]`);
    if (chip) chip.click();
  });

  dibujar("todo");

  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
