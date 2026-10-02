/* ============================================================
   Birchwood Coffee — behaviour
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. Mobile navigation ---------- */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close the menu after tapping a link
    siteNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. Menu filtering ---------- */
  const filters = document.getElementById('filters');
  const menuItems = Array.prototype.slice.call(
    document.querySelectorAll('.menu-item')
  );
  const menuEmpty = document.getElementById('menuEmpty');

  if (filters) {
    filters.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const filter = btn.dataset.filter;

      // Toggle the active pill
      filters.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });

      // Show / hide items
      let visible = 0;

      menuItems.forEach(function (item) {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });

      if (menuEmpty) {
        menuEmpty.hidden = visible > 0;
      }
    });
  }

  /* ---------- 3. Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorEl = document.querySelector('[data-error-for="' + fieldName + '"]');
    const wrapper = input ? input.closest('.field') : null;

    if (errorEl) errorEl.textContent = message || '';
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
  }

  function validate() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    if (!name) {
      setError('name', 'Please enter your name.');
      valid = false;
    } else {
      setError('name', '');
    }

    if (!email) {
      setError('email', 'Please enter your email address.');
      valid = false;
    } else if (!emailPattern.test(email)) {
      setError('email', 'That does not look like a valid email.');
      valid = false;
    } else {
      setError('email', '');
    }

    if (!message) {
      setError('message', 'Please write a short message.');
      valid = false;
    } else if (message.length < 10) {
      setError('message', 'A little more detail, please (10+ characters).');
      valid = false;
    } else {
      setError('message', '');
    }

    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      formStatus.className = 'form-status';
      formStatus.textContent = '';

      if (!validate()) {
        formStatus.textContent = 'Please fix the highlighted fields.';
        formStatus.classList.add('is-bad');
        return;
      }

      // No backend here — just confirm and reset.
      formStatus.textContent = 'Thanks! We will get back to you within one business day.';
      formStatus.classList.add('is-ok');
      form.reset();
    });

    // Clear an error as soon as the user starts fixing it
    ['name', 'email', 'message'].forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('input', function () {
        setError(id, '');
      });
    });
  }

  /* ---------- 4. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 5. Highlight today's hours ---------- */
  const hoursItems = document.querySelectorAll('#hoursList li');
  const today = new Date().getDay(); // 0 = Sunday

  hoursItems.forEach(function (li) {
    if (Number(li.dataset.day) === today) {
      li.classList.add('is-today');
    }
  });

  /* ---------- 6. Most recent roast date (Tue or Fri) ---------- */
  const roastEl = document.getElementById('roastDate');

  if (roastEl) {
    const d = new Date();
    const day = d.getDay(); // 0 Sun … 6 Sat

    // Days since the last Tuesday (2) or Friday (5)
    const sinceTue = (day - 2 + 7) % 7;
    const sinceFri = (day - 5 + 7) % 7;
    const back = Math.min(sinceTue, sinceFri);

    d.setDate(d.getDate() - back);

    roastEl.textContent = d.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }
})();