(function () {
  "use strict";

  // Contact form: build a mailto: link from the fields and hand off to the
  // visitor's own email client, so no backend or third-party form service is needed.
  var CONTACT_EMAIL = "info@squirrelhat.org";
  var form = document.getElementById("sh-contact-form");
  var sentView = document.getElementById("sh-sent");
  var sentName = document.getElementById("sh-sent-name");
  var resetBtn = document.getElementById("sh-reset");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var subject = "Hello from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email
      ];
      if (company) bodyLines.push("Company: " + company);
      bodyLines.push("", message);

      var mailto = "mailto:" + encodeURIComponent(CONTACT_EMAIL) +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;

      sentName.textContent = name.split(" ")[0];
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
