const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const requestForm = document.getElementById("requestForm");
const whatsappSubmit = document.getElementById("whatsappSubmit");

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

const getRequestText = () => {
  const data = new FormData(requestForm);
  return [
    "Заявка с сайта ilkservice",
    `Имя: ${data.get("name")}`,
    `Телефон: ${data.get("phone")}`,
    `Услуга: ${data.get("service")}`,
    `Комментарий: ${data.get("message") || "не указан"}`,
  ].join("\n");
};

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;

  const subject = encodeURIComponent("Заявка с сайта ilkservice");
  const body = encodeURIComponent(getRequestText());
  window.location.href = `mailto:ilira72@mail.ru?subject=${subject}&body=${body}`;
});

whatsappSubmit.addEventListener("click", () => {
  if (!requestForm.reportValidity()) return;

  const text = encodeURIComponent(getRequestText());
  window.open(`https://wa.me/79897091909?text=${text}`, "_blank", "noopener,noreferrer");
});
