let data = {};

fetch("menu.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    renderCategorias();
  });

function renderCategorias() {
  const cont = document.getElementById("categorias");

  data.categorias.forEach((cat) => {
    const btn = document.createElement("button");

    btn.classList.add("categoria-btn"); // 👈 clase para todos

    btn.innerHTML = `<span>${cat.icono}</span><h1 class="titulo-3">${cat.nombre}</h1>`;
    btn.onclick = () => abrirCategoria(cat);

    cont.appendChild(btn);
  });
}

function abrirCategoria(cat) {
  document.getElementById("categorias").classList.remove("active");
  document.getElementById("productos").classList.add("active");

  document.getElementById("titulo").innerText = `${cat.icono} ${cat.nombre}`;

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  cat.productos.forEach((p) => {
    const item = document.createElement("div");
    item.className = "card";

    item.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="card-imagen" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22220%22 viewBox=%220 0 400 220%22%3E%3Crect fill=%22%23333%22 width=%22400%22 height=%22220%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23666%22 font-size=%2220%22%3EImagen no disponible%3C/text%3E%3C/svg%3E'" />
      <div class="card-contenido">
        <div class="card-info">
          <h3>${p.nombre}</h3>
          <p class="card-descripcion">${p.descripcion}</p>
        </div>
        <div>
          <div class="card-precio">${p.precio}</div>
          <div class="card-tags">
            ${p.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </div>
    `;

    lista.appendChild(item);
  });
}

document.getElementById("back").onclick = () => {
  document.getElementById("productos").classList.remove("active");
  document.getElementById("categorias").classList.add("active");
};

document.getElementById("buscar").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".card");

  items.forEach((i) => {
    const nombre = i.querySelector("h3").innerText.toLowerCase();
    const descripcion = i
      .querySelector(".card-descripcion")
      .innerText.toLowerCase();
    const match = nombre.includes(texto) || descripcion.includes(texto);

    i.style.display = match ? "block" : "none";
  });
});
