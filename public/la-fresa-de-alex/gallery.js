const images = [
  { src: "./files/imagen1.jpeg" },
  { src: "./files/imagen2.jpeg" },
  { src: "./files/imagen3.jpeg" },
  { src: "./files/image_4.jpeg" },
  { src: "./files/imagen-5.jpeg" },
  { src: "./files/imagen_6.jpeg" },
  { src: "./files/imagen-7.jpeg" },
  { src: "./files/iamgen-8.jpeg" },
  { src: "./files/imagen-10.jpeg" },
  { src: "./files/imagen-11.jpeg" },
  { src: "./files/imagen-12.jpeg" },
  { src: "./files/imagen-13.jpeg" },
  { src: "./files/imagen-14.jpeg" },
  { src: "./files/imagen-15.jpeg" },
  { src: "./files/imagen-16.jpeg" },
  { src: "./files/imagen-17.jpeg" },
  { src: "./files/imagen-18.jpeg" },
  { src: "./files/imagen-19.jpeg" },
  { src: "./files/imagen-20.jpeg" },
  { src: "./files/imagen-21.jpeg" },
  { src: "./files/imagen-22.jpeg" },
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function renderGallery() {
  gallery.innerHTML = images
    .map(
      (img) => `
    <div class="item">
      <img src="${img.src}" loading="lazy" />
    </div>
  `,
    )
    .join("");

  waitImagesLoad().then(() => {
    resizeAllItems();
  });

  addEvents();
}

// 🔥 esperar a que TODAS carguen
function waitImagesLoad() {
  const imgs = document.querySelectorAll(".item img");

  return Promise.all(
    Array.from(imgs).map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((res) => {
        img.onload = res;
        img.onerror = res;
      });
    }),
  );
}

// 🔥 cálculo limpio
function resizeAllItems() {
  const rowHeight = 8; // altura base grid
  const rowGap = 8;

  document.querySelectorAll(".item").forEach((item) => {
    const img = item.querySelector("img");

    const ratio = img.naturalHeight / img.naturalWidth;

    const span = Math.ceil((ratio * 250) / (rowHeight + rowGap));

    item.style.gridRowEnd = "span " + span;
  });
}

// eventos
function addEvents() {
  document.querySelectorAll(".item img").forEach((img) => {
    img.onclick = () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    };
  });
}

// cerrar
lightbox.onclick = () => {
  lightbox.style.display = "none";
};

window.addEventListener("DOMContentLoaded", renderGallery);
window.addEventListener("resize", () => {
  resizeAllItems();
});
