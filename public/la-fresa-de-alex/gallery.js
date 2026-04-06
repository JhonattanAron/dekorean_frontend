const images = [
  {
    src: "https://cloud.dekorans.es/0ccb9c18-5663-4251-8a20-6bd732589bd8-imagen-16.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/0e4f3f5f-0d18-4f20-beac-6b4dfa18ff00-iamgen-8.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/15b239e6-058e-423b-ada3-25cad29016b0-imagen-15.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/294e3afd-0fb2-4360-b05c-9701f5d60578-imagen-7.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/30332796-3bfa-44b1-9746-3fba4b6b2fef-imagen-17.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/32ce8469-ad3f-4be8-8085-6982052d97ba-imagen3.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/34cacf0e-80b7-4b90-b982-910e9db42e93-imagen-19.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/357713de-0487-4a3c-8ac9-0a4bd24758dd-imagen_6.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/474b5d44-da3e-4b4b-b58e-31e789f2995b-imagen1.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/530ba9fd-9a39-48ef-a4ee-5a94c9091aac-imagen-5.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/589b5381-d213-4cc0-8384-bc3429a2a47e-imagen-14.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/595554ff-8f48-4ab1-9ab9-ca1676f7f2d8-imagen2.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/73739e3a-f96d-4c74-ad24-5107b212da88-imagen-21.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/7456b77f-f587-449c-8341-ae8b88cad588-image_4.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/7d7c9688-5bb2-4741-8252-76f23e1ae234-imagen-22.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/864d405a-b8c5-4dad-ac46-562667adb1e5-imagen-11.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/88b482fd-c889-4e20-9741-3a703217bfec-imagen-20.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/a0390ca7-9131-4ec9-94c1-36b8c5ed5ffc-imagen-12.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/a50266a1-1b47-4b7c-a448-576c3bcd6cbc-imagen-10.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/b04f80ee-a618-438b-9b4f-20d744d56866-imagen-13.jpeg",
  },
  {
    src: "https://cloud.dekorans.es/c3f909f4-a117-441e-a44a-adffc2feaad5-imagen-18.jpeg",
  },
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
