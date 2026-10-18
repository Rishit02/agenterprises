// Renders the product tabs and cards from CATEGORIES / PRODUCTS (see products.js).
(function () {
  const tabs = document.getElementById("product-tabs");
  const grid = document.getElementById("product-grid");
  if (!tabs || !grid) return;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function card(p) {
    const cat = CATEGORIES.find((c) => c.id === p.cat);
    let media = "";
    if (!p.noImage) {
      media = p.image
        ? `<img class="product-img" src="images/products/${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
        : `<div class="product-img product-placeholder" role="img" aria-label="Photo of ${esc(p.name)} coming soon"><i class="bi ${cat.icon}"></i></div>`;
    }
    const origin = p.origin
      ? `<p class="product-origin"><i class="bi bi-geo-alt"></i> Origin: ${esc(p.origin)}</p>`
      : "";
    return `<div class="col-sm-6 col-lg-4 col-xl-3">
      <article class="card product-card h-100">
        ${media}
        <div class="card-body">
          <h3 class="h6 card-title">${esc(p.name)}</h3>
          ${origin}
          <p class="card-text small text-body-secondary">${esc(p.desc)}</p>
        </div>
      </article></div>`;
  }

  function show(catId) {
    grid.innerHTML = PRODUCTS.filter((p) => p.cat === catId).map(card).join("");
    tabs.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.cat === catId;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on);
    });
  }

  tabs.innerHTML = CATEGORIES.map(
    (c) => `<li class="nav-item" role="presentation">
      <button class="nav-link" type="button" role="tab" data-cat="${c.id}">
        <i class="bi ${c.icon}"></i> ${esc(c.label)}
        <span class="badge text-bg-light ms-1">${PRODUCTS.filter((p) => p.cat === c.id).length}</span>
      </button></li>`
  ).join("");
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-cat]");
    if (b) show(b.dataset.cat);
  });
  show(CATEGORIES[0].id);

  document.getElementById("year").textContent = new Date().getFullYear();
})();
