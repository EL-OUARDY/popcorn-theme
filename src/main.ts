import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  // Load default theme from local storage
  const _theme = localStorage.getItem("APP_THEME") || "light";
  changeTheme(_theme);

  // Theme toggle click
  const themeBtn = document.querySelector("#theme-switcher");
  themeBtn?.addEventListener("click", () => changeTheme());

  // mobile toggle click
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
  if (isHidden) menu?.classList.remove("hidden");
  else menu?.classList.add("hidden");
}
