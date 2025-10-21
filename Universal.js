const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function() {
  // Get all elements
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.querySelector('.gallery-modal');
  const modalImg = document.querySelector('.modal-image');
  const closeBtn = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dateInfo = document.querySelector('.image-date');
  const methodInfo = document.querySelector('.image-method');
  
  let currentIndex = 0;
  const images = [];
  
  // Prepare image data array
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    images.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      date: img.getAttribute('data-date'),
      method: img.getAttribute('data-method')
    });
    
    // Add click event to each gallery item
    item.addEventListener('click', () => {
      currentIndex = index;
      updateModal();
      openModal();
    });
  });
  
  // Update modal content
  function updateModal() {
    const currentImage = images[currentIndex];
    modalImg.src = currentImage.src;
    modalImg.alt = currentImage.alt;
    dateInfo.textContent = `Created: ${currentImage.date}`;
    methodInfo.textContent = `Method: ${currentImage.method}`;
  }
  
  // Open modal
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Show previous image
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal();
  }
  
  // Show next image
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModal();
  }
  
  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
      case 'Escape':
        closeModal();
        break;
    }
  });
  
  // Close when clicking outside image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});


