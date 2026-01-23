/* ============================================================
   NAVIGATION & MOBILE MENU
   ============================================================ */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
});

mobileOverlay.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

function closeMobileMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
}

/* ============================================================
   PARTICLE BACKGROUND ANIMATION
   ============================================================ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.radius = 2 + Math.random() * 2;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 3);
    ctx.fillStyle = 'rgba(23, 96, 198, 1)';
    ctx.fill();
  }
}

const particles = [];
const particleCount = 12;

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 30, 200, ${1 - dist / 130})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.move();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();


/* ============================================================
   FAQ ACCORDION
   ============================================================ */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".faq-question");
  btn.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

/* ============================================================
   SCROLL REVEAL ANIMATIONS (Intersection Observer)
   ============================================================ */
const animatedElements = document.querySelectorAll('.animate-up, .animate-down, .animate-left, .animate-right');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => animationObserver.observe(el));


/* ============================================================
   VIDEO MODAL LOGIC
   ============================================================ */
(function () {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("recommendationVideo");
  const openBtns = document.querySelectorAll("#openVideoBtn, #openVideoBtn2");
  const closeBtn = document.getElementById("closeVideoBtn");

  if (!modal || !video) return;

  function openModal() {
    modal.classList.add("show");
    video.currentTime = 0;
    video.play().catch(() => { });
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    video.pause();
    document.documentElement.style.overflow = "";
  }

  openBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
})();

/* ============================================================
   TIMELINE PROGRESS LOGIC
   ============================================================ */
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineLine = document.querySelector(".timeline-line");
const timelineCircles = document.querySelectorAll(".timeline-circle");

function updateTimeline() {
  const viewportHeight = window.innerHeight;
  if (!timelineItems.length) return;

  const firstRect = timelineItems[0].getBoundingClientRect();
  let maxHeight = 0;

  timelineItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const reached = rect.top < viewportHeight * 0.7;

    if (reached) {
      timelineCircles[index].classList.add("filled");
      const distance = rect.bottom - firstRect.top;
      if (distance > maxHeight) maxHeight = distance;
    } else {
      timelineCircles[index].classList.remove("filled");
    }
  });

  // Handle the last segment
  const lastRect = timelineItems[timelineItems.length - 1].getBoundingClientRect();
  if (lastRect.top < viewportHeight * 0.6) {
    const distanceToLast = lastRect.bottom - firstRect.top;
    if (distanceToLast > maxHeight) maxHeight = distanceToLast;
  }

  // Reset if section is not reached
  if (firstRect.top > viewportHeight * 0.6) {
    timelineLine.style.height = "0px";
    return;
  }

  timelineLine.style.height = maxHeight + "px";
}

window.addEventListener("scroll", updateTimeline);
updateTimeline();


/* ============================================================
   ACCESSIBILITY WIDGET LOGIC
   ============================================================ */
const accessBtn = document.getElementById('accessibilityBtn');
const accessMenu = document.getElementById('accessibilityMenu');
const closeAccessMenu = document.getElementById('closeMenu');
const increaseText = document.getElementById('increaseText');
const decreaseText = document.getElementById('decreaseText');
const toggleContrast = document.getElementById('toggleContrast');
const resetAccessibility = document.getElementById('resetAccessibility');

let textSizeLevel = 0;

accessBtn.addEventListener('click', () => {
  accessMenu.classList.toggle('active');
});

closeAccessMenu.addEventListener('click', () => {
  accessMenu.classList.remove('active');
});

increaseText.addEventListener('click', () => {
  if (textSizeLevel < 2) textSizeLevel++;
  updateTextSize();
});

decreaseText.addEventListener('click', () => {
  if (textSizeLevel > 0) textSizeLevel--;
  updateTextSize();
});

toggleContrast.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

resetAccessibility.addEventListener('click', () => {
  document.body.classList.remove('high-contrast');
  document.documentElement.classList.remove('large-text', 'larger-text', 'normal-text');
  textSizeLevel = 0;
});

function updateTextSize() {
  document.documentElement.classList.remove('normal-text', 'large-text', 'larger-text');
  if (textSizeLevel === 0) document.documentElement.classList.add('normal-text');
  if (textSizeLevel === 1) document.documentElement.classList.add('large-text');
  if (textSizeLevel === 2) document.documentElement.classList.add('larger-text');
}





/* ============================================================
   COOKIE CONSENT & GOOGLE ANALYTICS
   ============================================================ */
const STORAGE_KEY = "cookie-consent";
let gaLoaded = false;

function showCookieBar() {
  const bar = document.getElementById("cookieBar");
  if (bar) bar.style.display = "block";
}

function hideCookieBar() {
  const bar = document.getElementById("cookieBar");
  if (bar) bar.style.display = "none";
}

function openCookieSettings() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved) {
    document.getElementById("analyticsCheckbox").checked = !!saved.analytics;
  }
  document.getElementById("cookieModal").style.display = "flex";
}

function closeCookieSettings() {
  document.getElementById("cookieModal").style.display = "none";
}

function acceptAllCookies() {
  saveConsent(true);
}

function rejectAllCookies() {
  saveConsent(false);
}

function saveCookiePreferences() {
  const analytics = document.getElementById("analyticsCheckbox").checked;
  saveConsent(analytics);
}

function saveConsent(analytics) {
  const consent = {
    essential: true,
    analytics: analytics
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  closeCookieSettings();
  hideCookieBar();

  if (analytics) {
    loadGoogleAnalytics();
  }
}

function loadGoogleAnalytics() {
  if (gaLoaded) return;
  gaLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-KEK344KMNF";
  document.head.appendChild(script);

  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-KEK344KMNF", {
      anonymize_ip: true
    });
  };
}

// Initialize Consent
(function initConsent() {
  const existingConsent = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!existingConsent) {
    showCookieBar();
  } else if (existingConsent.analytics) {
    loadGoogleAnalytics();
  }
})();






/* ============================================================
   FORM SUBMISSION (EmailJS Integration)
   ============================================================ */
emailjs.init("SwP5gNyPiaOwSkX2q");

function handleFormSubmit(formSelector, statusSelector) {
  const form = document.querySelector(formSelector);
  const status = document.querySelector(statusSelector);
  if (!form || !status) return;

  status.textContent = "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_w5e5zyw", "template_vl96hr9", form)
      .then(() => {
        status.textContent = "ההודעה נשלחה בהצלחה!";
        status.style.color = "green";
        form.reset();
      }, (error) => {
        status.textContent = "שגיאה בשליחת ההודעה. נסה שוב.";
        status.style.color = "red";
        console.error(error);
      });
  });
}

// Initialize form handlers
handleFormSubmit(".contact-card", "#formStatus");
handleFormSubmit(".footer-form", ".footer-form-note");


