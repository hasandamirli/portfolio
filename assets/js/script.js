'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// ------------------------------------
// PORTFOLIO MODAL & GALLERY
// ------------------------------------

const portfolioModalContainer = document.querySelector("[data-portfolio-modal-container]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");
const portfolioModalCloseBtn = document.querySelector("[data-portfolio-modal-close-btn]");
const portfolioModalTitle = document.querySelector("[data-portfolio-modal-title]");
const portfolioModalCategory = document.querySelector("[data-portfolio-modal-category]");
const portfolioModalDescription = document.querySelector("[data-portfolio-modal-description]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryPrevBtn = document.querySelector("[data-gallery-prev]");
const galleryNextBtn = document.querySelector("[data-gallery-next]");
const galleryDots = document.querySelector("[data-gallery-dots]");
const portfolioProjects = document.querySelectorAll("[data-filter-item]");

let galleryImages = [];
let galleryIndex = 0;

const openPortfolioModal = function () {
  if (!portfolioModalContainer) return;
  portfolioModalContainer.classList.add("active");
  if (portfolioOverlay) portfolioOverlay.classList.add("active");
};

const closePortfolioModal = function () {
  if (!portfolioModalContainer) return;
  portfolioModalContainer.classList.remove("active");
  if (portfolioOverlay) portfolioOverlay.classList.remove("active");
};

if (portfolioModalCloseBtn && portfolioOverlay) {
  portfolioModalCloseBtn.addEventListener("click", closePortfolioModal);
  portfolioOverlay.addEventListener("click", closePortfolioModal);
}

const renderGallery = function () {
  if (!galleryImage || galleryImages.length === 0) return;

  galleryImage.src = galleryImages[galleryIndex];
  galleryImage.alt = `${portfolioModalTitle.textContent} screenshot ${galleryIndex + 1}`;

  if (!galleryDots) return;
  galleryDots.innerHTML = "";

  galleryImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "gallery-dot" + (index === galleryIndex ? " active" : "");
    dot.addEventListener("click", function () {
      galleryIndex = index;
      renderGallery();
    });
    galleryDots.appendChild(dot);
  });
};

if (galleryPrevBtn) {
  galleryPrevBtn.addEventListener("click", function () {
    if (galleryImages.length === 0) return;
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    renderGallery();
  });
}

if (galleryNextBtn) {
  galleryNextBtn.addEventListener("click", function () {
    if (galleryImages.length === 0) return;
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    renderGallery();
  });
}

portfolioProjects.forEach((project) => {
  project.addEventListener("click", function (event) {
    const link = this.querySelector("a");
    if (link) event.preventDefault();

    const titleElem = this.querySelector(".project-title");
    const categoryElem = this.querySelector(".project-category");
    const imgElem = this.querySelector("img");

    const imagesAttr = this.dataset.images;
    const descriptionAttr = this.dataset.description;

    galleryImages = imagesAttr
      ? imagesAttr.split(",").map((src) => src.trim()).filter(Boolean)
      : (imgElem ? [imgElem.src] : []);

    galleryIndex = 0;

    if (portfolioModalTitle && titleElem) {
      portfolioModalTitle.textContent = titleElem.textContent;
    }

    if (portfolioModalCategory && categoryElem) {
      portfolioModalCategory.textContent = categoryElem.textContent;
    }

    if (portfolioModalDescription) {
      portfolioModalDescription.textContent = descriptionAttr || "";
    }

    renderGallery();
    openPortfolioModal();
  });
});
