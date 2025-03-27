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
    { threshold: 0.2 }
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

// Function to open modal with specific content
function openModal(header, description) {
  // Set modal content dynamically
  document.getElementById("modal-header").innerText = header;
  document.getElementById("modal-description").innerText = description;

  // Show the modal
  document.getElementById("modal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
  // Hide the modal
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


