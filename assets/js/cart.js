// Plumas Doradas — carrito de compras (localStorage, sin backend de pago)
(function () {
  var CART_KEY = 'pd_cart_v1';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function addToCart(item) {
    var cart = getCart();
    var existing = cart.find(function (p) { return p.id === item.id; });
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      cart.push({ id: item.id, name: item.name, price: item.price, icon: item.icon, qty: item.qty || 1 });
    }
    saveCart(cart);
    return cart;
  }

  function removeFromCart(id) {
    var cart = getCart().filter(function (p) { return p.id !== id; });
    saveCart(cart);
    return cart;
  }

  function updateQty(id, qty) {
    var cart = getCart();
    var item = cart.find(function (p) { return p.id === id; });
    if (item) {
      item.qty = Math.max(1, qty);
    }
    saveCart(cart);
    return cart;
  }

  function cartTotal(cart) {
    return cart.reduce(function (sum, p) { return sum + p.price * p.qty; }, 0);
  }

  function cartCount(cart) {
    return cart.reduce(function (sum, p) { return sum + p.qty; }, 0);
  }

  function formatPrice(n) {
    return '$' + n.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateCartCount() {
    var badges = document.querySelectorAll('[data-cart-count]');
    var count = cartCount(getCart());
    badges.forEach(function (b) {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function renderCartPage() {
    var container = document.querySelector('[data-cart-render]');
    if (!container) return;
    var cart = getCart();

    if (cart.length === 0) {
      container.innerHTML = '';
      var emptyState = document.querySelector('[data-cart-empty]');
      var fullState = document.querySelector('[data-cart-full]');
      if (emptyState) emptyState.hidden = false;
      if (fullState) fullState.hidden = true;
      return;
    }

    var emptyState = document.querySelector('[data-cart-empty]');
    var fullState = document.querySelector('[data-cart-full]');
    if (emptyState) emptyState.hidden = true;
    if (fullState) fullState.hidden = false;

    var rowsHtml = cart.map(function (item) {
      return (
        '<tr data-row="' + item.id + '">' +
        '<td><div class="cart-item-info"><div class="thumb">' + (item.icon || '') + '</div>' +
        '<div><strong>' + item.name + '</strong><small>Ref: ' + item.id + '</small></div></div></td>' +
        '<td>' + formatPrice(item.price) + '</td>' +
        '<td><div class="mini-cart-qty">' +
        '<button type="button" data-decr="' + item.id + '" aria-label="Restar unidad">−</button>' +
        '<input type="number" min="1" value="' + item.qty + '" data-qty="' + item.id + '" aria-label="Cantidad">' +
        '<button type="button" data-incr="' + item.id + '" aria-label="Sumar unidad">+</button>' +
        '</div></td>' +
        '<td>' + formatPrice(item.price * item.qty) + '</td>' +
        '<td><button type="button" class="remove-btn" data-remove="' + item.id + '">Eliminar</button></td>' +
        '</tr>'
      );
    }).join('');

    container.innerHTML = rowsHtml;

    var subtotal = cartTotal(cart);
    var envio = subtotal > 0 ? 25000 : 0;
    var total = subtotal + envio;

    var subtotalEl = document.querySelector('[data-cart-subtotal]');
    var envioEl = document.querySelector('[data-cart-envio]');
    var totalEl = document.querySelector('[data-cart-total]');
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (envioEl) envioEl.textContent = formatPrice(envio);
    if (totalEl) totalEl.textContent = formatPrice(total);

    container.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.getAttribute('data-remove'));
        renderCartPage();
      });
    });
    container.querySelectorAll('[data-incr]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-incr');
        var item = getCart().find(function (p) { return p.id === id; });
        updateQty(id, (item ? item.qty : 1) + 1);
        renderCartPage();
      });
    });
    container.querySelectorAll('[data-decr]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-decr');
        var item = getCart().find(function (p) { return p.id === id; });
        updateQty(id, (item ? item.qty : 1) - 1);
        renderCartPage();
      });
    });
    container.querySelectorAll('[data-qty]').forEach(function (input) {
      input.addEventListener('change', function () {
        updateQty(input.getAttribute('data-qty'), parseInt(input.value, 10) || 1);
        renderCartPage();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    renderCartPage();

    document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qtyInput = document.querySelector('[data-product-qty]');
        var qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
        addToCart({
          id: btn.getAttribute('data-id'),
          name: btn.getAttribute('data-name'),
          price: parseFloat(btn.getAttribute('data-price')),
          icon: document.querySelector('[data-product-icon]') ? document.querySelector('[data-product-icon]').innerHTML : '',
          qty: qty
        });
        var feedback = document.querySelector('[data-cart-feedback]');
        if (feedback) {
          feedback.hidden = false;
          feedback.textContent = '"' + btn.getAttribute('data-name') + '" se añadió al carrito.';
          setTimeout(function () { feedback.hidden = true; }, 3500);
        }
      });
    });

    var qtyPlus = document.querySelector('[data-qty-plus]');
    var qtyMinus = document.querySelector('[data-qty-minus]');
    var qtyInput = document.querySelector('[data-product-qty]');
    if (qtyPlus && qtyInput) qtyPlus.addEventListener('click', function () { qtyInput.value = (parseInt(qtyInput.value, 10) || 1) + 1; });
    if (qtyMinus && qtyInput) qtyMinus.addEventListener('click', function () { qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1); });

    var checkoutBtn = document.querySelector('[data-checkout]');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        var cart = getCart();
        if (cart.length === 0) return;
        var resumen = cart.map(function (i) { return i.qty + 'x ' + i.name; }).join(', ');
        var msg = 'Hola Plumas Doradas, quiero finalizar mi pedido: ' + resumen + '. Total: ' + formatPrice(cartTotal(cart) + 25000);
        window.location.href = 'contacto.html?pedido=' + encodeURIComponent(msg);
      });
    }
  });

  window.PDCart = { addToCart: addToCart, getCart: getCart, removeFromCart: removeFromCart };
})();
