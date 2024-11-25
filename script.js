let currentIndex = 0;

function showSlide(index) {
  const images = document.querySelector(".product-details-carousel-images");
  const totalSlides = images.children.length;

  // Ensure index is within bounds
  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100; // Shift by 100% for each slide
  images.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Initialize the first slide
showSlide(currentIndex);

