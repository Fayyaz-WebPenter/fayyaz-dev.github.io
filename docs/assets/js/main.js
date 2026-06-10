/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * GSAP Scroll Animations
   */
  gsap.registerPlugin(ScrollTrigger);

  // Skills progress bar animation with GSAP
  document.querySelectorAll('.skills-animation').forEach((item) => {
    let progressBars = item.querySelectorAll('.progress .progress-bar');
    gsap.from(progressBars, {
      width: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        once: true
      }
    });
  });

  // Section titles reveal
  document.querySelectorAll('.section-title').forEach((title) => {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
      }
    });
  });

  // Staggered reveal for portfolio and service items
  gsap.from('.portfolio-item', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: '.isotope-container',
      start: "top 80%",
    }
  });

  gsap.from('.service-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.services',
      start: "top 80%",
    }
  });

  /**
   * Hero Parallax Effect
   */
  gsap.to(".hero-parallax-img", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  /**
   * Magnetic UI Effect
   */
  const magneticElements = document.querySelectorAll('.social-links a, .php-email-form button');
  
  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(this, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    el.addEventListener('mouseleave', function() {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const loadingElement = document.querySelector('.loading');
  const errorElement = document.querySelector('.error-message');
  const sentElement = document.querySelector('.sent-message');

  // Reset message visibility
  loadingElement.style.display = 'block';  // Show loading spinner
  errorElement.style.display = 'none';     // Hide error message
  sentElement.style.display = 'none';      // Hide success message

  const formData = new FormData(this);

  // Change the fetch URL to Formspree's endpoint for form submission
  fetch('https://formspree.io/f/xeooenob', {  // Replace with your Formspree endpoint
      method: 'POST',
      body: formData,
  })
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
      loadingElement.style.display = 'none';  // Hide loading spinner

      // Show success or error message based on the response
      if (data.success) {
          sentElement.textContent = data.message || 'Your message has been sent. Thank you!';  // Set success message
          sentElement.style.display = 'block';     // Show success message
      } else {
          errorElement.textContent = data.message || 'Something went wrong. Please try again.';  // Set error message
          errorElement.style.display = 'block';     // Show error message
      }
  })
  .catch(() => {
      loadingElement.style.display = 'none';  // Hide loading spinner on error
      errorElement.textContent = 'An unexpected error occurred. Please try again later.';
      errorElement.style.display = 'block';   // Show error message
  });
});
ock';  // Show loading spinner
  errorElement.style.display = 'none';     // Hide error message
  sentElement.style.display = 'none';      // Hide success message

  const formData = new FormData(this);

  // Change the fetch URL to Formspree's endpoint for form submission
  fetch('https://formspree.io/f/xeooenob', {  // Replace with your Formspree endpoint
      method: 'POST',
      body: formData,
  })
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
      loadingElement.style.display = 'none';  // Hide loading spinner

      // Show success or error message based on the response
      if (data.success) {
          sentElement.textContent = data.message || 'Your message has been sent. Thank you!';  // Set success message
          sentElement.style.display = 'block';     // Show success message
      } else {
          errorElement.textContent = data.message || 'Something went wrong. Please try again.';  // Set error message
          errorElement.style.display = 'block';     // Show error message
      }
  })
  .catch(() => {
      loadingElement.style.display = 'none';  // Hide loading spinner on error
      errorElement.textContent = 'An unexpected error occurred. Please try again later.';
      errorElement.style.display = 'block';   // Show error message
  });
});
