const logos = [
  {
    name: "La Fresca de Alex",
    desc: "Cocina de mercado y KM 0",
    img: "./files/logo1.png",
    url: "https://www.catalinagrupo.com/catalina-la-barra/catalina-casa-de-comidas",
  },
  {
    name: "La Barra de Majareta",
    desc: "Bar",
    img: "https://cloud.dekorans.es/whatsapp-image-2026-04-06-at-4.45.01-pm-094455ee.jpeg",
    url: "https://www.catalinagrupo.com/catalina-la-barra/catalina-la-barra",
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
