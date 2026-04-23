// Select DOM elements
const navbar = document.getElementById("navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const closeSuccess = document.getElementById("closeSuccess");
const propertyGrid = document.getElementById("propertyGrid");

// Hero Typing and Background Animation
const wordsToType = [
  "Open Plots",
  "Flats",
  "Villas",
  "Ventures",
  "Real Estate",
  "Visit Olive Green Properties Rk Group",
];
const bgImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
];

const typingText = document.getElementById("typingText");
const heroSlider = document.getElementById("heroSlider");

if (typingText && heroSlider) {
  heroSlider.innerHTML = "";
  bgImages.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = `hero-slide ${index === 0 ? "active" : ""}`;
    slide.style.backgroundImage = `url('${img}')`;
    heroSlider.appendChild(slide);
  });

  const slides = heroSlider.querySelectorAll(".hero-slide");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 100;

    // Apply background style only to the last big text
    if (wordIndex === wordsToType.length - 1) {
      typingText.style.backgroundColor = "rgba(26, 54, 34, 0.85)";
      typingText.style.padding = "0px 15px";
      typingText.style.borderRadius = "8px";
      typingText.style.color = "white";
    } else {
      typingText.style.backgroundColor = "transparent";
      typingText.style.padding = "0";
      typingText.style.color = "var(--secondary-color)";
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000;
      if (wordIndex === wordsToType.length - 1) {
        typeSpeed = 4000; // reading time for long phrase
      }
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      slides[wordIndex].classList.remove("active");
      wordIndex = (wordIndex + 1) % wordsToType.length;
      slides[wordIndex].classList.add("active");
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
}

// Render Properties - propertiesList is loaded from data.js
if (propertyGrid) {
  propertiesList.forEach((prop) => {
    const badgeHTML = prop.badge
      ? `<div class="badge">${prop.badge}</div>`
      : "";
    const cardHTML = `
            <div class="property-card scale-up ${prop.delay}">
                <a href="property-details.html?id=${prop.id}" class="card-img" style="display: block; background-color: #fff;">
                    <img src="${prop.image}" alt="${prop.title}" loading="lazy" ${prop.imageStyle ? `style="${prop.imageStyle}"` : ""}>
                    ${badgeHTML}
                </a>
                <div class="card-content">
                    <h3><a href="property-details.html?id=${prop.id}">${prop.title}</a></h3>
                    <p class="property-location" style="color: var(--secondary-color); font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;"><i class="fa-solid fa-location-dot"></i> ${prop.location}</p>
                    <p>${prop.description}</p>
                    <div class="card-actions">
                        <a href="https://wa.me/917842007299?text=I'm%20interested%20in%20${encodeURIComponent(prop.title)}" class="btn btn-outline btn-sm" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                        <a href="property-details.html?id=${prop.id}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        `;
    propertyGrid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Hero Search Functionality
const heroSearchForm = document.getElementById("heroSearchForm");
const searchInput = document.getElementById("searchInput");
const propertyType = document.getElementById("propertyType");

if (heroSearchForm && searchInput && propertyGrid) {
  heroSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedType = propertyType ? propertyType.value.toLowerCase() : "";

    // Scroll to properties section
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      const headerOffset = 80;
      const elementPosition = propertiesSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Filter properties
    const cards = propertyGrid.querySelectorAll(".property-card");
    let hasResults = false;

    cards.forEach((card) => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      const location = card
        .querySelector(".property-location")
        .innerText.toLowerCase();
      const description = card
        .querySelector("p:not(.property-location)")
        .innerText.toLowerCase();

      const matchesSearch =
        title.includes(searchTerm) ||
        location.includes(searchTerm) ||
        description.includes(searchTerm);
      const matchesType =
        selectedType === "" ||
        title.includes(selectedType) ||
        description.includes(selectedType);

      if (matchesSearch && matchesType) {
        card.style.display = "block";
        hasResults = true;
      } else {
        card.style.display = "none";
      }
    });

    // Handle no results message
    const existingNoResults = document.getElementById("noResultsMsg");
    if (!hasResults && !existingNoResults) {
      const msg = document.createElement("p");
      msg.id = "noResultsMsg";
      msg.style.gridColumn = "1 / -1";
      msg.style.textAlign = "center";
      msg.style.padding = "40px";
      msg.style.fontSize = "1.2rem";
      msg.innerText =
        "No properties found matching your search. Please try a different term.";
      propertyGrid.appendChild(msg);
    } else if (hasResults && existingNoResults) {
      existingNoResults.remove();
    }
  });
}

// 1. Sticky Navbar & Styling on Scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 2. Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate hamburger to X (optional simple toggle)
  if (navLinks.classList.contains("active")) {
    hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    hamburger.style.color = "#1a3622"; // Primary color
  } else {
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    hamburger.style.color = navbar.classList.contains("scrolled")
      ? "#1a3622"
      : "#ffffff";
  }
});

// Close mobile menu when a link is clicked
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      hamburger.style.color = navbar.classList.contains("scrolled")
        ? "#1a3622"
        : "#ffffff";
    }
  });
});

// 3. Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Offset for fixed navbar
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// 4. Form Submission Simulation
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form button to show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Simple validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !phone || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Show loading state
    submitBtn.innerHTML =
      '<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
    submitBtn.disabled = true;

    // Send API call to FormSubmit
    fetch("https://formsubmit.co/ajax/d9666708652@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hide form, show success message
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        formSuccess.classList.remove("hidden");
        formSuccess.classList.add("bounce-in");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Sorry, there was an error sending your message. Please try again.");
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

// Close success message
if (closeSuccess) {
  closeSuccess.addEventListener("click", () => {
    formSuccess.classList.add("hidden");
    formSuccess.classList.remove("bounce-in");
  });
}

// 5. Scroll Animations using Intersection Observer
const animationElements = document.querySelectorAll(
  ".slide-in-left, .slide-in-right, .scale-up, .fade-in-up",
);

// Initially hide all elements intended to be animated on scroll
animationElements.forEach((el) => {
  // Only apply to elements not in hero (hero animates on load)
  if (!el.closest(".hero")) {
    el.style.opacity = "0";
    el.style.animationPlayState = "paused";
  }
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15,
};

const animateOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Restart the animation
      entry.target.style.animationPlayState = "running";
      // Unobserve once animated
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animationElements.forEach((el) => {
  if (!el.closest(".hero")) {
    animateOnScroll.observe(el);
  }
});

// Handle initial state of hamburger color based on scroll
window.dispatchEvent(new Event("scroll"));

// 6. On-Load Video Popup Logic
document.addEventListener("DOMContentLoaded", () => {
  const videoModal = document.getElementById("videoPopupModal");
  const closeVideoModal = document.getElementById("closeVideoModal");
  const introVideo = document.getElementById("introVideo");

  if (videoModal && closeVideoModal) {
    // Show modal 5 seconds after the user visits the website
    const popupDelay = 5000;

    let popupShown = false;

    const showPopup = () => {
      if (popupShown) return;
      popupShown = true;
      videoModal.classList.add("show-modal");
      if (introVideo) {
        introVideo.play().catch((error) => {
          console.log("Auto-play was prevented by the browser.", error);
        });
      }
    };

    let popupTimer = setTimeout(showPopup, popupDelay);

    // If "clicks website" meant start timer on first click, uncomment below:
    // document.body.addEventListener('click', () => {
    //   clearTimeout(popupTimer);
    //   popupTimer = setTimeout(showPopup, 5000);
    // }, { once: true });

    // Close modal logic
    const closeModal = () => {
      videoModal.classList.remove("show-modal");
      if (introVideo) {
        introVideo.pause();
      }
    };

    closeVideoModal.addEventListener("click", closeModal);

    // Close if clicked outside the video container
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });
  }
});

// 7. Auto-play Gallery Videos on Scroll (Play when completely swiped into view)
document.addEventListener("DOMContentLoaded", () => {
  const galleryVideos = document.querySelectorAll(".video-card video");

  // Play video when 50% of it is visible on screen
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Mute logic needed for browser autoplay to succeed without direct user interaction
        video.muted = true;
        video
          .play()
          .catch((e) => console.log("Video auto-play blocked by browser.", e));
      } else {
        // Pause it when it's out of view
        video.pause();
      }
    });
  }, observerOptions);

  galleryVideos.forEach((video) => {
    videoObserver.observe(video);
  });
});

// 8. Video Slider Navigation (For Desktop Buttons)
document.addEventListener("DOMContentLoaded", () => {
  const videoSlider = document.getElementById("videoSlider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (videoSlider && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      const cardWidth = videoSlider.querySelector(".video-card").offsetWidth;
      // Scroll by width + gap (gap is 30px)
      videoSlider.scrollBy({ left: -(cardWidth + 30), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      const cardWidth = videoSlider.querySelector(".video-card").offsetWidth;
      videoSlider.scrollBy({ left: cardWidth + 30, behavior: "smooth" });
    });
  }

  // Testimonial Slider Navigation
  const testimonialSlider = document.getElementById("testimonialSlider");
  const testPrevBtn = document.getElementById("testPrevBtn");
  const testNextBtn = document.getElementById("testNextBtn");
  const testimonialWrapper = document.querySelector(
    ".testimonial-slider-wrapper",
  );

  if (testimonialSlider && testPrevBtn && testNextBtn && testimonialWrapper) {
    let testimonialInterval;

    const scrollNextTestimonial = () => {
      const cardWidth =
        testimonialSlider.querySelector(".testimonial-card").offsetWidth;
      // If we are near the end of the scroll, loop back to the beginning
      if (
        testimonialSlider.scrollLeft + testimonialSlider.clientWidth >=
        testimonialSlider.scrollWidth - 1
      ) {
        testimonialSlider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Otherwise, scroll to the next card
        testimonialSlider.scrollBy({
          left: cardWidth + 30,
          behavior: "smooth",
        });
      }
    };

    const startAutoScroll = () => {
      stopAutoScroll(); // Prevent multiple intervals
      testimonialInterval = setInterval(scrollNextTestimonial, 5000); // Autoplay every 5 seconds
    };

    const stopAutoScroll = () => {
      clearInterval(testimonialInterval);
    };

    testPrevBtn.addEventListener("click", () => {
      const cardWidth =
        testimonialSlider.querySelector(".testimonial-card").offsetWidth;
      testimonialSlider.scrollBy({
        left: -(cardWidth + 30),
        behavior: "smooth",
      });
      startAutoScroll(); // Reset timer on manual navigation
    });

    testNextBtn.addEventListener("click", () => {
      scrollNextTestimonial(); // Use the same logic for consistency
      startAutoScroll(); // Reset timer on manual navigation
    });

    testimonialWrapper.addEventListener("mouseenter", stopAutoScroll);
    testimonialWrapper.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll(); // Start the slider on page load
  }
});

// 10. Auto-redirect to properties section on load
document.addEventListener("DOMContentLoaded", () => {
  const propertiesSection = document.getElementById("properties");
  if (
    propertiesSection &&
    (!window.location.hash ||
      window.location.hash === "#home" ||
      window.location.hash === "")
  ) {
    // Update URL to match without filling up the history stack
    try {
      history.replaceState(null, null, "#properties");
    } catch (e) {
      // Ignore SecurityError for file:// protocol
    }

    // Scroll with offset after everything is initialized
    setTimeout(() => {
      const headerOffset = 80;
      const elementPosition = propertiesSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 500); // Small delay ensures images/layout have rendered before scroll
  }
});
