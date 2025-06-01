// === Typing text for main headings ===
function typeLoop(el, wordList) {
  let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;

  function type() {
    const current = wordList[wordIndex];
    el.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, ++charIndex);

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordList.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? 60 : 100);
    }
  }

  type();
}

window.onload = () => {
  // Typing for main headings
  typeLoop(document.getElementById("typed-text"), ["Website Developer", "Graphic Designer", "Content Writer"]);
  typeLoop(document.getElementById("typed-projects"), ["Projects", "My Work", "What I Can Do"]);
  typeLoop(document.getElementById("typed-testimonials"), ["Testimonials", "Reviews", "Feedback"]);
  typeLoop(document.getElementById("typed-about"), ["developer", "collaborator", "creative soul"]);
  typeLoop(document.getElementById("typed-contact"), ["Connect w me!", "Hit me up!"]);

  // Typing effect for each project card title
  document.querySelectorAll('.typing-text').forEach(el => {
    const text = el.dataset.text;
    let index = 0;
    el.textContent = ""; // Always clear before starting!

    function typeChar() {
      if (index < text.length) {
        el.textContent += text.charAt(index++);
        setTimeout(typeChar, 80);
      }
    }

    // Only trigger when visible or always on mobile
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if ((entry.isIntersecting || window.innerWidth < 700) && el.textContent === "") {
          typeChar();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(el);
  });

  // Fade-in animation for .fade-in
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("invisible");
    fadeObserver.observe(el);
  });

  // Slide-in animation for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          card.classList.add('visible');
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(card);
  });

  // Modal popup for contact
  const modal = document.getElementById("contact-modal");
  const openBtn = document.getElementById("contact-btn");
  const closeBtn = document.getElementById("close-modal");

  openBtn?.addEventListener("click", () => modal.classList.add("show"));
  closeBtn?.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

  // === Testimonials Carousel (Desktop & Mobile arrows, Izaan style) ===
  let currentSlide = 0;
  const track = document.getElementById("testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const totalSlides = cards.length;

  // Set card widths for both desktop and mobile
  function setCardWidths() {
    if (window.innerWidth <= 700) {
      // On mobile, each card is 100vw
      cards.forEach(card => {
        card.style.minWidth = "100vw";
        card.style.maxWidth = "100vw";
        card.style.flex = "0 0 100vw";
      });
      track.style.width = `${totalSlides * 100}vw`;
    } else {
      // On desktop, each card is 100/totalSlides %
      cards.forEach(card => {
        card.style.minWidth = "";
        card.style.maxWidth = "";
        card.style.flex = `0 0 ${100 / totalSlides}%`;
      });
      track.style.width = `${totalSlides * 100}%`;
    }
  }

  function updateCarousel() {
    if(window.innerWidth <= 700) {
      track.style.transform = `translateX(-${currentSlide * 100}vw)`;
    } else {
      track.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    }
  }

  // Desktop arrows
  const nextReviewBtn = document.getElementById("next-review");
  const prevReviewBtn = document.getElementById("prev-review");
  if (nextReviewBtn && prevReviewBtn) {
    nextReviewBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });
    prevReviewBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }
  // Mobile arrows
  const nextReviewMob = document.getElementById("next-review-mob");
  const prevReviewMob = document.getElementById("prev-review-mob");
  if (nextReviewMob && prevReviewMob) {
    nextReviewMob.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });
    prevReviewMob.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }

  // Touch swipe for mobile
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    } else if (endX - startX > 50) {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    setCardWidths();
    updateCarousel();
  });

  setCardWidths();
  updateCarousel();
};