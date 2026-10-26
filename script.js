const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('[data-event]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('eventType');
    select.value = link.dataset.event;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiryForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const eventType = document.getElementById('eventType').value;
  const guests = document.getElementById('guests').value.trim();
  const date = document.getElementById('date').value;
  const food = document.getElementById('food').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !eventType) {
    document.getElementById('formStatus').textContent = 'Please add your name, phone number and event type.';
    return;
  }

  const lines = [
    "Hello Sajee's Kitchen, I'd like to enquire about catering.",
    "",
    `Name: ${name}`,
    `My phone: ${phone}`,
    `Event: ${eventType}`,
    `Expected guests: ${guests || 'Not specified'}`,
    `Event date: ${date || 'Not decided'}`,
    `Food preference: ${food}`,
    `Additional details: ${message || 'None'}`
  ];
  const url = `https://wa.me/919947721317?text=${encodeURIComponent(lines.join('\n'))}`;
  document.getElementById('formStatus').textContent = 'Opening WhatsApp with your enquiry…';
  window.open(url, '_blank', 'noopener,noreferrer');
});
