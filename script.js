const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const requestForm = document.getElementById("requestForm");
const phoneInput = document.getElementById("requestPhone");

const getPhoneDigits = (value) => {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
};

const formatPhone = (value) => {
  const nationalNumber = getPhoneDigits(value).slice(1);
  let formatted = "+7";

  if (nationalNumber.length > 0) formatted += ` (${nationalNumber.slice(0, 3)}`;
  if (nationalNumber.length >= 3) formatted += ")";
  if (nationalNumber.length > 3) formatted += ` ${nationalNumber.slice(3, 6)}`;
  if (nationalNumber.length > 6) formatted += `-${nationalNumber.slice(6, 8)}`;
  if (nationalNumber.length > 8) formatted += `-${nationalNumber.slice(8, 10)}`;

  return formatted;
};

const validatePhone = () => {
  const isComplete = getPhoneDigits(phoneInput.value).length === 11;
  phoneInput.setCustomValidity(isComplete ? "" : "Введите полный номер телефона: +7 (999) 123-45-67");
  phoneInput.setAttribute("aria-invalid", String(!isComplete && phoneInput.value.length > 0));
  return isComplete;
};

phoneInput.addEventListener("input", () => {
  phoneInput.value = formatPhone(phoneInput.value);
  phoneInput.setCustomValidity("");
  phoneInput.setAttribute("aria-invalid", "false");
});

phoneInput.addEventListener("blur", () => {
  if (getPhoneDigits(phoneInput.value).length === 1) {
    phoneInput.value = "";
    phoneInput.setCustomValidity("");
    phoneInput.setAttribute("aria-invalid", "false");
    return;
  }

  validatePhone();
});

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
  validatePhone();
  if (!requestForm.reportValidity()) return;

  const subject = encodeURIComponent("Заявка с сайта ilkservice");
  const body = encodeURIComponent(getRequestText());
  window.location.href = `mailto:ilira72@mail.ru?subject=${subject}&body=${body}`;
});
