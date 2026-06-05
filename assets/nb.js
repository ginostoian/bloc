/* ============================================================
   BLOC — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  function initBurger() {
    var burger = document.querySelector("[data-burger]");
    var menu = document.querySelector("[data-mobile-menu]");
    if (!burger || !menu) return;
    burger.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  /* ---- FAQ accordion ---- */
  function initAccordion() {
    document.querySelectorAll("[data-acc]").forEach(function (item) {
      var head = item.querySelector(".acc__head");
      var body = item.querySelector(".acc__body");
      if (!head || !body) return;
      head.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        // close siblings
        var group = item.closest("[data-acc-group]");
        if (group) {
          group.querySelectorAll("[data-acc].open").forEach(function (o) {
            if (o !== item) { o.classList.remove("open"); o.querySelector(".acc__body").style.maxHeight = null; }
          });
        }
        if (isOpen) { item.classList.remove("open"); body.style.maxHeight = null; }
        else { item.classList.add("open"); body.style.maxHeight = body.scrollHeight + "px"; }
      });
    });
  }

  /* ---- Portfolio filter tabs ---- */
  function initFilters() {
    var tabs = document.querySelectorAll("[data-filter]");
    var items = document.querySelectorAll("[data-cat]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("is-on"); });
        tab.classList.add("is-on");
        var f = tab.getAttribute("data-filter");
        items.forEach(function (it) {
          var show = f === "all" || it.getAttribute("data-cat").indexOf(f) !== -1;
          it.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---- Generic form (newsletter + contact) ---- */
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function initForms() {
    document.querySelectorAll("[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll("[data-required]").forEach(function (f) {
          var val = (f.value || "").trim();
          var bad = !val || (f.type === "email" && !isEmail(val));
          f.classList.toggle("field--err", bad);
          if (bad) ok = false;
        });
        if (!ok) return;
        var success = form.querySelector("[data-success]");
        if (success) {
          form.querySelectorAll(".field, .nb-btn, .form-grid").forEach(function (el) { el.style.display = "none"; });
          success.style.display = "block";
        }
      });
      form.querySelectorAll("[data-required]").forEach(function (f) {
        f.addEventListener("input", function () { f.classList.remove("field--err"); });
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Count up stats ---- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count"));
        var dec = (el.getAttribute("data-count").indexOf(".") !== -1) ? 1 : 0;
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        var start = null, dur = 1200;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = (target * eased).toFixed(dec);
          el.textContent = prefix + val + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = prefix + target.toFixed(dec) + suffix;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBurger();
    initAccordion();
    initFilters();
    initForms();
    initReveal();
    initCounters();
  });
})();
