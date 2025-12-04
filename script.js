const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
});


const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

/* ⛔ מוחקים את השפעת העכבר */
const mouse = { x: null, y: null };

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = (Math.random() - 0.5) * 1.8;
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
const particleCount = 18;

for (let i = 0; i < particleCount; i++){
  particles.push(new Particle());
}

/* ✅ קווים רק בין חלקיקים, בצבע שחור */
function connectParticles() {
  for (let i = 0; i < particles.length; i++){
    for (let j = i + 1; j < particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 30, 200, ${1 - dist / 130})`; // ✅ שחור עם שקיפות
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = '#ffffffff'; // ✅ רקע בהיר נקי
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.move();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animate);
}

animate();


const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

// בוחר את כל האלמנטים עם קלאסי אנימציה
const animatedElements = document.querySelectorAll('.animate-up, .animate-down, .animate-left, .animate-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));


(function(){

  const modal = document.getElementById("videoModal");
  const video = document.getElementById("recommendationVideo");
  const openBtns = document.querySelectorAll("#openVideoBtn, #openVideoBtn2");
  const closeBtn = document.getElementById("closeVideoBtn");

  if(!modal || !video) return;

  function openModal(){
    modal.classList.add("show");
    video.currentTime = 0;
    video.play().catch(()=>{});
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal(){
    modal.classList.remove("show");
    video.pause();
    document.documentElement.style.overflow = "";
  }

  openBtns.forEach(btn =>{
    btn.addEventListener("click", e=>{
      e.preventDefault();
      openModal();
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e=>{
    if(e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e=>{
    if(e.key === "Escape") closeModal();
  });

})();

const items1 = document.querySelectorAll(".timeline-item");
const line = document.querySelector(".timeline-line");
const circles = document.querySelectorAll(".timeline-circle");

function updateTimeline() {
  const viewportHeight = window.innerHeight;
  const firstRect = items1[0].getBoundingClientRect();
  let maxHeight = 0;

  items1.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const reached = rect.top < viewportHeight * 0.7;

    if (reached) {
      circles[index].classList.add("filled");
      const distance = rect.bottom - firstRect.top;
      if (distance > maxHeight) maxHeight = distance;
    } else {
      circles[index].classList.remove("filled");
    }
  });

  // עדכון הקו לפי האיטם האחרון של הטיימליין בלבד
  const lastRect = items1[items1.length - 1].getBoundingClientRect();
  if (lastRect.top < viewportHeight * 0.6) {
    const distanceToLast = lastRect.bottom - firstRect.top;
    if (distanceToLast > maxHeight) maxHeight = distanceToLast;
  }

  // אם כל הסקשן עוד לא נכנס למסך
  if (firstRect.top > viewportHeight * 0.6) {
    line.style.height = "0px";
    return;
  }

  line.style.height = maxHeight + "px";
}

window.addEventListener("scroll", updateTimeline);
updateTimeline();

