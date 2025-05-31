import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  // Load default theme from local storage
  const localTheme = localStorage.getItem("APP_THEME");
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const _theme = localTheme || (isDark ? "dark" : "light");

  changeTheme(_theme);

  // Theme toggle click
  const themeBtn = document.querySelector("#theme-switcher");
  themeBtn?.addEventListener("click", () => changeTheme());

  // mobile menu toggle click
  const menuBtns = document.querySelectorAll(
    "#show-mobile-header-menu, #close-mobile-header-menu",
  );
  menuBtns.forEach((menuBtn) =>
    menuBtn?.addEventListener("click", () => toggleMobileMenu()),
  );

  // Initialize swipers
  new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 15,
  });
  new Swiper(".hero-swiper", {
    loop: true,
    slidesPerView: 1,
    autoplay: { delay: 10000, disableOnInteraction: false },
    modules: [Autoplay, Pagination, Navigation],
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Change header background on initial page load
  handleHeaderBackgroundChange();
  // Header background change on scroll
  window.addEventListener("scroll", handleHeaderBackgroundChange);

  // Nicely load images with a fade effect
  loadImages();
  loadBackgroundImages();
});

function changeTheme(theme: string | null = null) {
  const root = window.document.documentElement;
  if (theme) {
    root.classList.add(theme);
    return;
  }

  const isDark = root.classList.contains("dark");
  root.classList.remove("light", "dark");
  if (isDark) {
    root.classList.add("light");
    localStorage.setItem("APP_THEME", "light");
  } else {
    root.classList.add("dark");
    localStorage.setItem("APP_THEME", "dark");
  }
}

function toggleMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const isHidden = menu?.classList.contains("hidden");
  const body = document.body;
  if (isHidden) {
    menu?.classList.remove("hidden");
    body?.classList.add("no-scroll");
  } else {
    menu?.classList.add("hidden");
    body?.classList.remove("no-scroll");
  }
}

function handleHeaderBackgroundChange() {
  const body = document.body;
  const header = document.querySelector("header");

  if (window.scrollY > 0 || parseFloat(body.style.top) * -1 > 0) {
    header?.classList.add("header-bg");
    header?.classList.remove("header-bg-transparent");
  } else {
    header?.classList.add("header-bg-transparent");
    header?.classList.remove("header-bg");
  }
}

function loadImages() {
  const imgs: NodeListOf<HTMLImageElement> =
    document.querySelectorAll("img.lazy-fade");

  imgs.forEach((img) => {
    // If the image was pulled from cache it may already be complete.
    if (img.complete) {
      img.classList.add("is-loaded");
    } else {
      // Wait for it to finish.
      img.addEventListener("load", () => img.classList.add("is-loaded"));
      // Still reveal on error so the space isn’t blank forever.
      img.addEventListener("error", () => img.classList.add("is-loaded"));
    }
  });
}

function loadBackgroundImages() {
  const blocks: NodeListOf<HTMLElement> =
    document.querySelectorAll(".lazy-bg[data-bg]");

  blocks.forEach((block) => {
    const url = block.dataset.bg; // read the image URL
    const gradient = block.dataset.gradient; // read the image gradient

    const img = new Image(); // invisible preloader
    img.onload = () => {
      block.style.backgroundImage = gradient
        ? `${gradient}, url("${url}")`
        : `url("${url}")`;
    };
    img.src = url as string; // start the download
  });
}
