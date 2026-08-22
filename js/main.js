(function () {
  "use strict";

  // Contact form: swap between the form and the "sent" confirmation.
  var form = document.getElementById("sh-contact-form");
  var sentView = document.getElementById("sh-sent");
  var sentName = document.getElementById("sh-sent-name");
  var resetBtn = document.getElementById("sh-reset");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (new FormData(form).get("name") || "").toString().trim().split(" ")[0];
      sentName.textContent = name;
      form.classList.add("is-hidden");
      sentView.classList.add("is-visible");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      form.classList.remove("is-hidden");
      sentView.classList.remove("is-visible");
    });
  }

  // Hero cursor trail — little crumbs that follow the pointer.
  var hero = document.querySelector(".sh-hero");
  if (!hero) return;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var last = 0;
  hero.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - last < 55) return;
    last = now;
    var r = hero.getBoundingClientRect();
    var d = document.createElement("span");
    d.className = "sh-crumb";
    var sage = Math.random() > 0.5;
    d.style.background = sage ? "var(--color-accent-2-400)" : "var(--color-accent-400)";
    var s = 6 + Math.random() * 8;
    d.style.width = d.style.height = s + "px";
    d.style.left = (e.clientX - r.left - s / 2) + "px";
    d.style.top = (e.clientY - r.top - s / 2) + "px";
    hero.appendChild(d);
    setTimeout(function () { d.remove(); }, 950);
  });
})();
