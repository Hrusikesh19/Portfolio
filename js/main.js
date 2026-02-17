// ================= LOADER =================
window.addEventListener("load", () => {
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loader");
  const robot = document.querySelector(".floating-robot");

  let width = 0;

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);

      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.8s ease";

      setTimeout(() => {
        loader.style.display = "none";

        // START scroll typing AFTER boot
        initScrollTyping();

        // Reveal robot AFTER boot
        if (robot) {
          robot.style.opacity = "1";
          robot.style.pointerEvents = "auto";
        }

      }, 800);

    } else {
      width += 2;
      progressBar.style.width = width + "%";
    }
  }, 30);
});


// ================= SCROLL TYPING =================
function initScrollTyping() {
  const titles = document.querySelectorAll(".box-title");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeTitle(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.6
  });

  titles.forEach(title => {
    observer.observe(title);
  });

  function typeTitle(title) {
    const text = title.getAttribute("data-text");
    let index = 0;

    title.textContent = "";
    title.classList.add("typing");

    function type() {
      if (index < text.length) {
        title.textContent += text.charAt(index);
        index++;
        setTimeout(type, 80);
      } else {
        title.classList.remove("typing");
      }
    }

    type();
  }
}


// ================= MENU =================
document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");
  const body = document.body;

  if (!menuBtn || !menuOverlay) return;

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menuOverlay.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  menuOverlay.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-links")) {
      menuOverlay.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });
  document.querySelectorAll(".menu-links a").forEach(link => {
  link.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});


});


// ================= ROBOT EYE TRACKING =================
document.addEventListener("mousemove", (e) => {
  const pupils = document.querySelectorAll(".robot-pupil");

  pupils.forEach(pupil => {
    const rect = pupil.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX
    );

    const radius = 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });
});
