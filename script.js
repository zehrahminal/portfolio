// Defensive script.js — updated typed words for hero and robust guards
(function () {
  'use strict';

  function safeLog(...args) {
    try { console.log(...args); } catch (e) {}
  }

  // Typing loop (guarded)
  function typeLoop(el, wordList) {
    if (!el || !Array.isArray(wordList) || wordList.length === 0) return;
    let wordIndex = 0,
        charIndex = 0,
        isDeleting = false;

    function type() {
      try {
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
      } catch (err) {
        safeLog('typeLoop error', err);
      }
    }

    type();
  }

  document.addEventListener('DOMContentLoaded', () => {
    try {
      // remove the no-js class so CSS fallback is disabled when JS runs
      try { document.documentElement.classList.remove('no-js'); } catch (err) { safeLog('remove no-js failed', err); }

      // UPDATED typed words per your request (exact strings)
      typeLoop(document.getElementById("typed-text"), ["website developer", "researcher", "aspiring technologist"]);
      typeLoop(document.getElementById("typed-projects"), ["Projects", "My Work", "What I Can Do"]);
      typeLoop(document.getElementById("typed-testimonials"), ["Testimonials", "Reviews", "Feedback"]);
      typeLoop(document.getElementById("typed-about"), ["developer", "collaborator", "creative soul"]);
      typeLoop(document.getElementById("typed-contact"), ["Connect w me!", "Hit me up!"]);

      // Typing effect for each project card title (guarded)
      document.querySelectorAll('.typing-text').forEach(el => {
        try {
          const text = el.dataset.text || '';
          if (!text) return;
          let index = 0;
          el.textContent = "";

          function typeChar() {
            if (index < text.length) {
              el.textContent += text.charAt(index++);
              setTimeout(typeChar, 80);
            }
          }

          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if ((entry.isIntersecting || window.innerWidth < 700) && el.textContent === "") {
                typeChar();
                observer.disconnect();
              }
            });
          }, { threshold: 0.5 });

          observer.observe(el);
        } catch (err) {
          safeLog('typing-text error for element', el, err);
        }
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
        try {
          if (!el.classList.contains('invisible')) el.classList.add("invisible");
          fadeObserver.observe(el);
        } catch (err) {
          safeLog('fade-in observe error', err, el);
        }
      });

      // Slide-in animation for project cards
      document.querySelectorAll('.project-card').forEach(card => {
        try {
          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                card.classList.add('visible');
                observer.unobserve(card);
              }
            });
          }, { threshold: 0.3 });

          observer.observe(card);
        } catch (err) {
          safeLog('project-card observe error', err, card);
        }
      });

      // Modal popup for contact
      const modal = document.getElementById("contact-modal");
      const openBtn = document.getElementById("contact-btn");
      const closeBtn = document.getElementById("close-modal");

      openBtn?.addEventListener("click", () => modal?.classList.add("show"));
      closeBtn?.addEventListener("click", () => modal?.classList.remove("show"));
      window.addEventListener("click", e => {
        if (e.target === modal) modal?.classList.remove("show");
      });

      // Testimonials Carousel
      const track = document.getElementById("testimonial-track");
      const cards = document.querySelectorAll(".testimonial-card");
      const totalSlides = cards ? cards.length : 0;
      let currentSlide = 0;

      function setCardWidths() {
        try {
          if (!track || totalSlides === 0) return;
          if (window.innerWidth <= 700) {
            cards.forEach(card => {
              card.style.minWidth = "100vw";
              card.style.maxWidth = "100vw";
              card.style.flex = "0 0 100vw";
            });
            track.style.width = `${totalSlides * 100}vw`;
          } else {
            cards.forEach(card => {
              card.style.minWidth = "";
              card.style.maxWidth = "";
              card.style.flex = `0 0 ${100 / totalSlides}%`;
            });
            track.style.width = `${totalSlides * 100}%`;
          }
        } catch (err) {
          safeLog('setCardWidths error', err);
        }
      }

      function updateCarousel() {
        try {
          if (!track || totalSlides === 0) return;
          if (window.innerWidth <= 700) {
            track.style.transform = `translateX(-${currentSlide * 100}vw)`;
          } else {
            track.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
          }
        } catch (err) {
          safeLog('updateCarousel error', err);
        }
      }

      const nextReviewBtn = document.getElementById("next-review");
      const prevReviewBtn = document.getElementById("prev-review");
      if (nextReviewBtn && prevReviewBtn && totalSlides > 0) {
        nextReviewBtn.addEventListener("click", () => {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateCarousel();
        });
        prevReviewBtn.addEventListener("click", () => {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          updateCarousel();
        });
      }

      const nextReviewMob = document.getElementById("next-review-mob");
      const prevReviewMob = document.getElementById("prev-review-mob");
      if (nextReviewMob && prevReviewMob && totalSlides > 0) {
        nextReviewMob.addEventListener("click", () => {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateCarousel();
        });
        prevReviewMob.addEventListener("click", () => {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          updateCarousel();
        });
      }

      if (track && totalSlides > 0) {
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
      }

      window.addEventListener("resize", () => {
        try {
          setCardWidths();
          updateCarousel();
        } catch (err) {
          safeLog('resize handler error', err);
        }
      });

      setCardWidths();
      updateCarousel();

    } catch (err) {
      safeLog('Initialization error', err);
    }
  });
})();
