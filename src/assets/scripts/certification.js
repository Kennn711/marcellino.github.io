const allCertificates = [
  {
    name: "PT Otak Kanan",
    src: "/uploads/certification/certificate1.jpg",
  },
  {
    name: "Microsoft Bootcamp",
    src: "/uploads/certification/certificate2.jpg",
  },
  {
    name: "Tes Potensi Akademik",
    src: "/uploads/certification/certificate3.jpg",
  },
  { name: "Fitcom 2025", src: "/uploads/certification/certificate4.jpg" },
  { name: "freeCodeCamp", src: "/uploads/certification/certificate5.jpg" },
  { name: "JHIC 2025", src: "/uploads/certification/certificate6.jpg" },
  {
    name: "Dicoding - Web Development",
    src: "/uploads/certification/certificate7-1.jpg",
  },
  {
    name: "Dicoding - Web Development",
    src: "/uploads/certification/certificate7-2.png",
  },
  {
    name: "Dicoding - Web Development",
    src: "/uploads/certification/certificate7-3.png",
  },
  {
    name: "Dicoding - Financial Literacy",
    src: "/uploads/certification/certificate8-1.jpg",
  },
  {
    name: "Dicoding - Financial Literacy",
    src: "/uploads/certification/certificate8-2.png",
  },
  {
    name: "Dicoding - Financial Literacy",
    src: "/uploads/certification/certificate8-3.png",
  },
  {
    name: "High Achieving Students",
    src: "/uploads/certification/certificate9.jpeg",
  },
];

function openZoom(imageSrc) {
  const modal = document.getElementById("custom_zoom_overlay");
  const img = document.getElementById("zoomed_image");
  img.src = imageSrc;
  modal.showModal();
  document.body.style.overflow = "hidden";
}

export function openCertModal() {
  const modal = document.getElementById("modal_all_certs");
  const loading = document.getElementById("certLoading");
  const grid = document.getElementById("certGrid");
  const searchInput = document.getElementById("certSearch");

  searchInput.value = "";
  modal.showModal();
  document.body.style.overflow = "hidden";

  loading.classList.remove("hidden");
  loading.classList.add("flex");
  grid.classList.add("hidden");
  grid.classList.remove("grid");

  setTimeout(() => {
    loading.classList.add("hidden");
    loading.classList.remove("flex");
    grid.classList.remove("hidden");
    grid.classList.add("grid");
    renderCerts(allCertificates);
  }, 800);
}

function renderCerts(certs) {
  const grid = document.getElementById("certGrid");
  grid.innerHTML = "";

  if (certs.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center text-zinc-500 py-10">No certificates found.</div>`;
    return;
  }

  certs.forEach((cert) => {
    const div = document.createElement("div");
    div.className = "flex flex-col items-center gap-1 sm:gap-2";
    div.innerHTML = `
          <div onclick="openZoom('${cert.src}')" class="group w-full aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-400 bg-zinc-100 dark:bg-zinc-900 cursor-pointer transition-colors">
            <img src="${cert.src}" alt="${cert.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy">
          </div>
          <p class="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 text-center px-1 sm:px-2 truncate w-full" title="${cert.name}">${cert.name}</p>
        `;
    grid.appendChild(div);
  });
}

document.getElementById("certSearch")?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allCertificates.filter((c) =>
    c.name.toLowerCase().includes(query),
  );
  renderCerts(filtered);
});

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("closing");

  setTimeout(() => {
    modal.close();
    modal.classList.remove("closing");

    const anyModalOpen = Array.from(document.querySelectorAll("dialog")).some(
      (d) => d.hasAttribute("open"),
    );
    if (!anyModalOpen) {
      document.body.style.overflow = "";
    }
  }, 300);
}

function scrollCarousel(carouselId, direction) {
  const container = document.getElementById(carouselId);
  const scrollAmount = container.clientWidth;
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal(dialog.id);
    }
  });
});

window.openCertModal = openCertModal;
window.openZoom = openZoom;
window.closeModal = closeModal;
window.scrollCarousel = scrollCarousel;
