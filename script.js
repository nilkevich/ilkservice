const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const requestForm = document.getElementById("requestForm");
const formSuccess = document.getElementById("formSuccess");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = requestForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Отправляем…";

  window.setTimeout(() => {
    requestForm.reset();
    formSuccess.classList.add("visible");
    submitButton.disabled = false;
    submitButton.textContent = "Отправить заявку";
  }, 650);
});
