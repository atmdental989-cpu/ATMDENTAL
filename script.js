(() => {
  "use strict";
  const products = Array.isArray(window.ATM_PRODUCTS) ? window.ATM_PRODUCTS : [];
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const categoryList = document.getElementById("category-list");
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");
  const clearButton = document.getElementById("clear-filters");
  let activeCategory = "All";

  const money = value => new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(Number(value) || 0);

  function safeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    }[c]));
  }

  function art(index) {
    const variants = [
      '<rect x="27" y="12" width="36" height="76" rx="8" fill="#fff" stroke="#78b8cc" stroke-width="2"/><rect x="34" y="5" width="22" height="13" rx="3" fill="#1596bd"/><rect x="33" y="37" width="24" height="18" rx="3" fill="#d8f2f8"/><path d="M36 44h18" stroke="#1689b1" stroke-width="3"/>',
      '<path d="M20 25h60l-8 56H28z" fill="#fff" stroke="#78b8cc" stroke-width="2"/><path d="M25 35h50" stroke="#1689b1" stroke-width="5"/><path d="M32 48h36M32 57h29M32 66h22" stroke="#b0dce8" stroke-width="3"/>',
      '<rect x="20" y="28" width="60" height="48" rx="8" fill="#fff" stroke="#78b8cc" stroke-width="2"/><rect x="28" y="18" width="44" height="14" rx="4" fill="#1689b1"/><circle cx="50" cy="51" r="12" fill="#d8f2f8" stroke="#1689b1" stroke-width="2"/><path d="M45 51h10M50 46v10" stroke="#1689b1" stroke-width="2"/>',
      '<path d="M35 13h30l5 14-9 54H39l-9-54z" fill="#fff" stroke="#78b8cc" stroke-width="2"/><path d="M35 35h30" stroke="#1689b1" stroke-width="6"/><path d="M39 48h22M39 57h18" stroke="#c1e5ed" stroke-width="3"/>'
    ];
    return `<div class="product-art" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="86" rx="31" ry="5" fill="#c8e4ec"/>${variants[index % variants.length]}</svg></div>`;
  }

  function waLink(product) {
    const currentPrice = hasOffer(product) ? product.offerPrice : product.price;
    const message = `Hello ATM Dental, I would like to enquire/order:\nProduct: ${product.name}\nBrand: ${product.brand || "Not specified"}\nListed price: ${money(currentPrice)} ${product.unit ? "(" + product.unit + ")" : ""}\nPlease confirm current price and availability.`;
    return "https://wa.me/918590888979?text=" + encodeURIComponent(message);
  }

  function hasOffer(product) {
    return product.offerPrice !== null && product.offerPrice !== undefined &&
      product.offerPrice !== "" && Number(product.offerPrice) >= 0 &&
      Number(product.offerPrice) < Number(product.price);
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    let filtered = products.filter(p => {
      const matchesCategory = activeCategory === "All" ||
        (activeCategory === "Offers" ? hasOffer(p) : p.category === activeCategory);
      const haystack = [p.name, p.brand, p.category, p.description].join(" ").toLowerCase();
      return matchesCategory && haystack.includes(query);
    });
    switch (sortSelect.value) {
      case "low": filtered.sort((a,b) => (hasOffer(a) ? a.offerPrice : a.price) - (hasOffer(b) ? b.offerPrice : b.price)); break;
      case "high": filtered.sort((a,b) => (hasOffer(b) ? b.offerPrice : b.price) - (hasOffer(a) ? a.offerPrice : a.price)); break;
      case "az": filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
    }
    resultCount.textContent = filtered.length;
    emptyState.hidden = filtered.length !== 0;
    grid.hidden = filtered.length === 0;
    grid.innerHTML = filtered.map((p) => {
      const idx = products.findIndex(x => x.id === p.id);
      const imageMarkup = p.image
        ? `<img src="${safeText(p.image)}" alt="${safeText(p.name)}" loading="lazy" onerror="this.parentElement.innerHTML='${art(idx).replace(/'/g, "\\'")}'">`
        : art(idx);
      const offer = hasOffer(p);
      const priceMarkup = offer
        ? `<div class="product-price"><span class="old-price">${money(p.price)}</span><strong class="offer-price">${money(p.offerPrice)}</strong><small>${safeText(p.unit || "offer price")}</small></div>`
        : `<div class="product-price">${money(p.price)}<small>${safeText(p.unit || "indicative price")}</small></div>`;
      const tag = offer
        ? `<span class="product-tag offer-tag">${safeText(p.offerLabel || "SPECIAL OFFER")}</span>`
        : (p.tag ? `<span class="product-tag">${safeText(p.tag)}</span>` : "");
      return `<article class="product-card ${offer ? "has-offer" : ""}">
        <div class="product-image">${imageMarkup}${tag}</div>
        <div class="product-info">
          <div class="product-category">${safeText(p.category)}</div>
          <h3>${safeText(p.name)}</h3>
          <p class="product-description">${safeText(p.description || p.brand || "Contact us for details.")}</p>
          <div class="product-bottom">
            ${priceMarkup}
            <a class="order-button" href="${waLink(p)}" target="_blank" rel="noopener">Enquire ↗</a>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  categoryList.addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    categoryList.querySelectorAll(".category-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    render();
  });
  searchInput.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "All";
    sortSelect.value = "featured";
    categoryList.querySelectorAll(".category-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === "All"));
    render();
  });
  document.getElementById("year").textContent = new Date().getFullYear();
  render();
})();
