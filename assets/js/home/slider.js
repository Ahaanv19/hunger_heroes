/**
 * Hero Slider Component
 * Auto-rotating image slider with dot navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slider-item');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        dot.classList.add('bg-green-600');
      } else {
        dot.classList.remove('bg-green-600');
        dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
      }
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(index);
      startAutoSlide();
    });
  });

  // Start auto-sliding
  startAutoSlide();
});
