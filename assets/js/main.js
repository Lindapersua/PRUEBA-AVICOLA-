// Plumas Doradas — comportamiento general del sitio
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  var newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.querySelector('.newsletter-msg');
      if (msg) {
        msg.textContent = '¡Gracias por suscribirte! Revisa tu correo ' + (input ? input.value : '') + ' para confirmar.';
      } else {
        alert('¡Gracias por suscribirte a nuestro boletín avícola!');
      }
      form.reset();
    });
  });

  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var box = document.querySelector('#contact-success');
      if (box) box.hidden = false;
      contactForm.reset();
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  var galleryThumbs = document.querySelectorAll('.gallery-thumbs [data-swap]');
  var galleryMain = document.querySelector('.gallery-main');
  if (galleryThumbs.length && galleryMain) {
    galleryThumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        galleryMain.innerHTML = thumb.innerHTML;
      });
    });
  }
});
