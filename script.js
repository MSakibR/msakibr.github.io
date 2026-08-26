document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
  });

  // Scroll Animation
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -50px 0px" },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Skill Progress Bars
  const skillProgresses = document.querySelectorAll(".progress");
  skillProgresses.forEach((progress) => {
    const percent = progress.dataset.percent;
    progress.style.width = percent + "%";
  });

  // Smooth Scrolling for Navbar Links
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // Adjust for navbar height
          behavior: "smooth",
        });
      }
    });
  });
});

//.skill-circle
document.querySelectorAll(".skill-circle").forEach((circle) => {
  let percent = circle.getAttribute("data-percent");
  let progress = circle.querySelector(".progress");
  let strokeDashOffset = 283 - (percent / 100) * 283;
  progress.style.strokeDashoffset = strokeDashOffset;
});

//.faq-question
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle("active");
  });
});


const researchReports = {
  "Solar-Powered Smart Irrigation System with IoT":
    "media/Research_1/Solar_Irrigation_Report.pdf",
  "Federated Learning: A Privacy-Preserving Approach in AI":
    "media/Research_2/Federated_Learning_Report.pdf",
  "BanglaAccento: Bangla Regional Dialect Speech Recognition System": null,
  "Visual Grounding Repair for Multimodal Large Language Models (MLLMs)": null,
  "Shutki Vision: A Visual Dataset of Traditional Bengali Dried Fish": null,
};

function openModal(title, description) {
  document.getElementById("modal-header").innerText = title;
  document.getElementById("modal-description").innerText = description;

  const reportBtn = document.getElementById("download-report");
  const reportPath = researchReports[title];

  if (reportPath) {
    reportBtn.href = reportPath;
    reportBtn.style.display = "inline-block";
  } else {
    reportBtn.style.display = "none";
  }

  document.getElementById("modal").style.display = "flex";
}

// Function to close modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// tap highlight
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      links.forEach((l) => l.classList.remove("active"));

      // Add 'active' class to the clicked link
      this.classList.add("active");
    });
  });
});

// scrolling highlight
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // Select all sections
  const navLinks = document.querySelectorAll(".nav-link");

  function changeActiveLink() {
    let scrollPosition = window.scrollY + 150; // Adjust for better detection

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.nav-link[href="#${sectionId}"]`)
          .classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveLink);
});

// hamburger-menu
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".hamburger-menu");
  const navbar = document.querySelector(".navbar");

  // Toggle the navbar visibility when clicking the hamburger menu
  menuButton.addEventListener("click", function (event) {
    navbar.classList.toggle("show");
    event.stopPropagation(); // Prevent the click event from propagating
  });

  // Close the navbar when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target) && !menuButton.contains(event.target)) {
      navbar.classList.remove("show");
    }
  });
});

// Typing speed in ms
const baseText = " Hi, I am "; // Static part
const changingText = "M Sakib Rahman"; // The part that erases & rewrites
const speed = 100; // Typing speed in ms
const eraseSpeed = 50; // Erasing speed
const delayBeforeErase = 1500; // Pause before erasing
const delayBeforeRewrite = 800; // Pause before retyping
let i = 0;
let isDeleting = false;
let currentText = baseText; // Start with base text

function typeEffect() {
  const h1Element = document.querySelector(".hi");

  if (!isDeleting && i < changingText.length) {
    // Typing "M Sakib Rahman"
    currentText = baseText + changingText.substring(0, i + 1);
    i++;
    setTimeout(typeEffect, speed);
  } else if (!isDeleting && i === changingText.length) {
    // Pause before erasing
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, delayBeforeErase);
  } else if (isDeleting && i > 0) {
    // Erasing "M Sakib Rahman"
    currentText = baseText + changingText.substring(0, i - 1);
    i--;
    setTimeout(typeEffect, eraseSpeed);
  } else if (isDeleting && i === 0) {
    // Pause before retyping
    isDeleting = false;
    setTimeout(typeEffect, delayBeforeRewrite);
  }

  h1Element.textContent = currentText; // Update the text in <h1>
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.getElementById("send-message").addEventListener("click", function () {
  const email = document.getElementById("visitor-email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Function to show popup notification
  function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = "notification show"; // reset classes
    if (isError) notification.classList.add("error");

    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  if (!email || !message) {
    showNotification("Please enter email and message.", true);
    return;
  }

  emailjs
    .send("service_79gsum7", "template_6yfqns5", {
      email: email,
      message: message,
    })
    .then(function () {
      showNotification("Message sent successfully!");
      document.getElementById("visitor-email").value = "";
      document.getElementById("message").value = "";
    })
    .catch(function () {
      showNotification("Failed to send message!", true);
    });
});

// Achievement Slider
let currentIndex = 0;
const slides = document.querySelectorAll(".slider-wrapper .achievement-card");

function showSlide(index) {
  const wrapper = document.querySelector(".slider-wrapper");
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Optional: Auto-slide every 5 seconds
setInterval(() => {
  nextSlide();
}, 5000);

// Gallery Modal
const galleryModal = document.getElementById("gallery-modal");
const viewAllBtn = document.getElementById("view-all-btn");

viewAllBtn.onclick = function () {
  galleryModal.style.display = "block";
};

function closeGallery() {
  galleryModal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target == galleryModal) {
    galleryModal.style.display = "none";
  }
};

// Gallery Modal
function closeGallery() {
  document.getElementById("gallery-modal").style.display = "none";
}

// Lightbox functionality
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.querySelector(".lightbox-img");

function openLightbox(img) {
  lightboxModal.style.display = "flex";
  lightboxImg.src = img.src;
}

function closeLightbox() {
  lightboxModal.style.display = "none";
}

// Close lightbox when clicking outside image
lightboxModal.onclick = function (e) {
  if (e.target === lightboxModal) closeLightbox();
};

function filterProjects(category) {
  let cards = document.querySelectorAll(".project-card");
  let buttons = document.querySelectorAll(".filter-buttons button");

  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach((card) => {
    card.style.display =
      category === "all" || card.dataset.category === category
        ? "block"
        : "none";
  });
}

function filterMLProjects(category, btn) {
  const mlCards = document.querySelectorAll("#ml-projects .project-card");
  const mlText = document.getElementById("ml-custom-text");
  const buttons = btn.parentElement.querySelectorAll("button");

  // Active button style
  buttons.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  // Hide everything by default
  mlCards.forEach((card) => (card.style.display = "none"));
  mlText.style.display = "none";

  // Show Library cards or Custom text
  if (category === "ml-library") {
    mlCards.forEach((card) => (card.style.display = "block"));
  } else if (category === "ml-custom") {
    mlText.style.display = "block";
  }
}

// Orbiting Icons
const icons = document.querySelectorAll(".orbit li");
const image = document.querySelector(".circular-image img");

function floatOrbit() {
  if (window.innerWidth <= 768) return; // ⛔ disable on mobile
  const imgWidth = image.offsetWidth;
  const imgHeight = image.offsetHeight;
  const centerX = imgWidth / 2;
  const centerY = imgHeight / 2;

  // Adjust radii: taller and slightly narrower
  const rx = centerX * 0.98; // horizontal slightly smaller
  const ry = centerY * 1.2; // vertical slightly taller
  const offsetY = -15; // lift orbit a bit upward

  icons.forEach((icon, i) => {
    let angle = (i / icons.length) * 2 * Math.PI;

    function move() {
      angle += 0.01; // rotation speed
      const x = rx * Math.cos(angle);
      const y = ry * Math.sin(angle) + offsetY; // move orbit slightly up
      icon.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      requestAnimationFrame(move);
    }

    move();
  });
}

// Start floating orbit
floatOrbit();

// Recalculate if window resizes
window.addEventListener("resize", floatOrbit);

function filterMLProjects(category, button) {
  // 1. Update active class on filter buttons
  const filterButtons = document.querySelectorAll(
    "#ml-projects .filter-buttons button",
  );
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  // 2. Select all project cards inside the ML grid
  const cards = document.querySelectorAll("#mlProjectGrid .project-card");

  // 3. Show / Hide cards based on category
  cards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.classList.remove("hide");
      card.classList.add("show");
    } else {
      card.classList.remove("show");
      card.classList.add("hide");
    }
  });
}
