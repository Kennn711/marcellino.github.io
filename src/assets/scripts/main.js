import "flyonui/flyonui";
import { openCertModal } from "./certification.js";

const themeToggleBtn = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

function setTheme(theme) {
  if (theme === "dark") {
    htmlElement.classList.add("dark");
    htmlElement.classList.remove("light");
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    htmlElement.classList.add("light");
    htmlElement.classList.remove("dark");
    localStorage.setItem("portfolio-theme", "light");
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

themeToggleBtn.addEventListener("click", () => {
  const isDark = htmlElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".scroll-animate");
  animatedElements.forEach((el) => observer.observe(el));
});
