document.addEventListener('DOMContentLoaded', () => {

  // ==================== HEADER ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu    = document.getElementById('mobile-menu');

  // Toggle Mobile Menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();                    // Prevent outside click from firing immediately
      mobileMenu.classList.toggle('hidden');
      
      // Toggle hamburger <-> X icon
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Close mobile menu when clicking on any link inside it
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Close mobile menu when clicking outside (Improved)
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      // Only close if click is outside both the menu and the button
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        
        const icon = mobileMenuBtn?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    }
  });

  // ==================== USER DROPDOWN (Logged-in) ====================
  const userButtons = document.getElementById('user-buttons');
  if (userButtons) {
    const dropdown = document.getElementById('user-dropdown');
    
    if (dropdown) {
      // Click on button to toggle
      userButtons.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!userButtons.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    }
  }

  // ==================== FOOTER - Scroll to Top ====================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==================== GENERAL - Header Shadow on Scroll ====================
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });
  }

  // ==================== NEWSLETTER (Optional) ====================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email');
      if (email && email.value.trim()) {
        alert("Thank you for subscribing to DealLock!");
        email.value = '';
      }
    });
  }

 

});

 const steps = {
    1: { 
      number: "STEP 1", 
      title: "Find a Deal", 
      desc: "Identify a fast-selling, discounted, auction or declutter item you want to secure." 
    },
    2: { 
      number: "STEP 2", 
      title: "Pay to Lock", 
      desc: "Sign up or log in, submit the item link. We assess and if approved, pay 50% upfront to lock it." 
    },
    3: { 
      number: "STEP 3", 
      title: "We Secure the Item", 
      desc: "DealLock.ng completes the purchase and holds the item securely for you." 
    },
    4: { 
      number: "STEP 4", 
      title: "Complete Your Payment", 
      desc: "Pay the remaining balance within the agreed Validity Period." 
    },
    5: { 
      number: "STEP 5", 
      title: "Pickup or Delivery", 
      desc: "Once full payment is confirmed, the item is released for pickup or delivery." 
    },
    6: { 
      number: "STEP 6", 
      title: "What If You Can't Complete?", 
      desc: "If you fail to pay the balance, we will resell the item. You receive a refund minus holding fees." 
    }
  };

  function showStep(stepNum) {
    const content = document.getElementById('step-content');
    const pen = document.getElementById('pen-icon');
    const numberEl = document.getElementById('phone-step-number');
    const titleEl = document.getElementById('phone-step-title');
    const descEl = document.getElementById('phone-step-desc');

    const step = steps[stepNum];

    content.classList.add('opacity-0');

    setTimeout(() => {
      numberEl.textContent = step.number;
      titleEl.textContent = step.title;
      descEl.textContent = step.desc;

      // Pen writing animation
      pen.style.transition = 'transform 0.6s ease';
      pen.style.transform = 'rotate(20deg)';

      setTimeout(() => pen.style.transform = 'rotate(-15deg)', 350);

      content.classList.remove('opacity-0');
    }, 250);

    // Highlight active step
    document.querySelectorAll('.step-card').forEach(card => {
      card.classList.remove('ring-2', 'ring-emerald-600', 'bg-emerald-50');
    });
    document.getElementById(`step-${stepNum}`).classList.add('ring-2', 'ring-emerald-600', 'bg-emerald-50');
  }

  // Show Step 1 by default
  window.onload = () => showStep(1);
