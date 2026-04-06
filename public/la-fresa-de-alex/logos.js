const logos = [
  {
    name: "Catalina Casa de Comidas",
    desc: "Cocina de mercado y KM 0",
    img: "./files/logo1.png",
    url: "https://www.catalinagrupo.com/catalina-la-barra/catalina-casa-de-comidas",
  },
  {
    name: "Catalina La Barra",
    desc: "Auténticas tapas sevillanas",
    img: "./static/5.webp",
    url: "https://www.catalinagrupo.com/catalina-la-barra/catalina-la-barra",
  },
  {
    name: "Chicarreros",
    desc: "Experiencia exclusiva",
    img: "./static/6.webp",
    url: "https://www.catalinagrupo.com/catalina-la-barra/restaurante-chicarreros",
  },
  {
    name: "Catalina la Cervecería",
    desc: "Cervecería & tapeo",
    img: "./static/11.webp",
    url: "https://www.catalinagrupo.com/catalina-la-barra/catalina-la-cerveceria",
  },
  {
    name: "Casa Regina",
    desc: "Tapas con alma sevillana",
    img: "./static/14.png",
    url: "https://www.catalinagrupo.com/catalina-la-barra/casa-regina",
  },
  {
    name: "La Quinta",
    desc: "Tradición en las brasas",
    img: "./static/9.webp",
    url: "https://www.catalinagrupo.com/catalina-la-barra/la-quinta",
  },
  {
    name: "Catalina el Bar",
    desc: "Tapas renovadas",
    img: "./static/8.webp",
    url: "https://www.catalinagrupo.com/catalina-la-barra/catalina-el-bar",
  },
];

const track = document.getElementById("logos-track");

// 🔥 duplicamos automáticamente para efecto infinito
const fullList = [...logos, ...logos, ...logos];

track.innerHTML = fullList
  .map(
    (logo) => `
  <a class="logo-card" href="${logo.url}" target="_blank">
    <img src="${logo.img}" alt="${logo.name}" />
    <span class="info">
      <strong>${logo.name}</strong>
      <em>${logo.desc}</em>
    </span>
  </a>
`,
  )
  .join("");
