// ── Initialize Lucide Icons ──
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', open);
  
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

// ── Modernistic Reveal Animations ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card, .review-card, .value-item, .loc-item, .assessment-container, .contact-form, .reveal')
  .forEach(el => revealObserver.observe(el));

// ── WhatsApp Form Submission ──
function sendWhatsApp(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;
  
  const ownerNumber = "919025011711"; // Revive Clinic WhatsApp
  
  const text = `*New Appointment Request - REVIVE Clinic*%0A%0A` +
               `*Name:* ${name}%0A` +
               `*Phone:* ${phone}%0A` +
               `*Service:* ${service}%0A` +
               `*Message:* ${message || "No message provided"}`;
  
  const whatsappUrl = `https://wa.me/${ownerNumber}?text=${text}`;
  
  // Show success and redirect
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Redirecting to WhatsApp...';
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    success.style.display = 'block';
    btn.textContent = 'Send Appointment Request';
    e.target.reset();
  }, 1000);
}

// ── Quick Assessment Tool Logic ──
const assessmentOptions = document.getElementById('assessmentOptions');
const assessmentResult = document.getElementById('assessmentResult');

if (assessmentOptions) {
  assessmentOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.assess-btn');
    if (!btn) return;
    
    // UI Feedback
    document.querySelectorAll('.assess-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const target = btn.dataset.target;
    let resultHTML = '';
    
    if (target === 'dermatology') {
      resultHTML = `
        <div class="result-card">
          <i data-lucide="user" style="color:var(--teal-light); width:48px; height:48px; margin:0 auto 16px; display:block;"></i>
          <h4>Dermatology Care</h4>
          <p>Based on your skin concerns, we recommend a consultation with our Specialist Dermatologist for a customized skin ritual.</p>
          <a href="#contact" class="btn-primary">Book Skin Consult</a>
        </div>`;
    } else if (target === 'trichology') {
      resultHTML = `
        <div class="result-card">
          <i data-lucide="scissors" style="color:var(--teal-light); width:48px; height:48px; margin:0 auto 16px; display:block;"></i>
          <h4>Trichology Analysis</h4>
          <p>For hair and scalp issues, our Trichology expert will perform a deep scalp analysis to identify the root cause of hair fall.</p>
          <a href="#contact" class="btn-primary">Book Hair Consult</a>
        </div>`;
    } else if (target === 'psychiatry') {
      resultHTML = `
        <div class="result-card">
          <i data-lucide="brain" style="color:var(--teal-light); width:48px; height:48px; margin:0 auto 16px; display:block;"></i>
          <h4>Mental Wellness</h4>
          <p>Our empathetic psychiatric and counseling team is here to support you. We provide a safe, confidential space for your mental peace.</p>
          <a href="#contact" class="btn-primary">Book Wellness Session</a>
        </div>`;
    }
    
    assessmentResult.innerHTML = resultHTML;
    lucide.createIcons(); // Re-initialize icons in the new HTML
  });
}
