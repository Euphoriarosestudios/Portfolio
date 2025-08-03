document.addEventListener('DOMContentLoaded', function() {
  // ===== 0. PAGE LOADER SYSTEM =====
  const loader = document.getElementById('page-loader');
  const progressBar = document.querySelector('.loader-progress');
  const minDisplayTime = 3000; // 3 seconds minimum
  const maxDisplayTime = 40000; // 40 seconds maximum
  let imagesLoaded = 0;
  let totalImages = 0;
  let startTime = Date.now();

  // Find all images on page
  const images = document.querySelectorAll('img');
  totalImages = images.length;

  // Image load handler
  function imageLoaded() {
    imagesLoaded++;
    const progress = (imagesLoaded / totalImages) * 100;
    progressBar.style.width = `${progress}%`;
    
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(minDisplayTime - elapsed, 0);
    
    if (imagesLoaded === totalImages || elapsed >= maxDisplayTime) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, Math.min(remainingTime, 1000));
    }
  }

  // Set up image load tracking
  images.forEach(img => {
    if (img.complete) imageLoaded();
    else {
      img.addEventListener('load', imageLoaded);
      img.addEventListener('error', imageLoaded);
    }
  });
document.addEventListener('DOMContentLoaded', function() {
  // ===== 0. PAGE LOADER SYSTEM =====
  const loader = document.getElementById('page-loader');
  const progressBar = document.querySelector('.loader-progress');
  const minDisplayTime = 3000; // 3 seconds minimum
  const maxDisplayTime = 40000; // 40 seconds maximum
  let imagesLoaded = 0;
  let totalImages = 0;
  let startTime = Date.now();

  // Create ambient particles
  function createParticles() {
    const colors = ['#e0a1ff55', '#a18aff55', '#ff8aac55'];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s infinite;
        opacity: 0;
        transition: opacity 1.5s ease;
      `;
      loader.appendChild(particle);
      
      // Fade in particles
      setTimeout(() => {
        particle.style.opacity = '0.7';
      }, 100);
    }
  }

  // Find all images on page
  const images = document.querySelectorAll('img');
  totalImages = images.length;

  // Image load handler
  function imageLoaded() {
    imagesLoaded++;
    const progress = (imagesLoaded / totalImages) * 100;
    progressBar.style.width = `${progress}%`;
    
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(minDisplayTime - elapsed, 0);
    
    if (imagesLoaded === totalImages || elapsed >= maxDisplayTime) {
      setTimeout(() => {
        // Fade out particles first
        document.querySelectorAll('.particle').forEach(p => {
          p.style.opacity = '0';
        });
        
        // Then fade out loader
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, Math.min(remainingTime, 1000));
    }
  }

  // Initialize particles
  createParticles();

  // Set up image load tracking
  images.forEach(img => {
    if (img.complete) imageLoaded();
    else {
      img.addEventListener('load', imageLoaded);
      img.addEventListener('error', imageLoaded);
    }
  });

  // Force hide after max display time
  const forceHideTimeout = setTimeout(() => {
    if (loader) {
      document.querySelectorAll('.particle').forEach(p => p.style.opacity = '0');
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  }, maxDisplayTime);

  // ===== [REST OF YOUR EXISTING CODE BELOW] =====
  // ... (keep all your gallery and modal code exactly as is)
  // ===== 1. GALLERY FILTER SYSTEM =====
  // ===== 2. MODAL SYSTEM =====
  // ... (all your existing functionality remains unchanged)
});


  // Force hide after max display time
  const forceHideTimeout = setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  }, maxDisplayTime);

  

  // ===== 1. GALLERY FILTER SYSTEM =====
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentFilter = 'all';
  let filteredProjects = ['Truth', 'Fear', 'Noor_Layl', 'Hope', 'Crimson_Terror']; // MOVED INSIDE

  function updateFilteredProjects() {
    filteredProjects = [];
    galleryItems.forEach(item => {
      if (currentFilter === 'all' || item.dataset.category === currentFilter) {
        if (item.style.display !== 'none') {
          const match = item.getAttribute('onclick').match(/openModal\('(.*?)'\)/);
          if (match) filteredProjects.push(match[1]);
        }
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      
      galleryItems.forEach(item => {
        item.style.display = (currentFilter === 'all' || item.dataset.category === currentFilter) 
          ? 'block' 
          : 'none';
      });
      
      updateFilteredProjects();
    });
  });

  // ===== 2. MODAL SYSTEM =====
  let currentProjectIndex = 0;

  window.openModal = function(projectId) {
    clearTimeout(forceHideTimeout); // Stop loader if modal opened manually
    if (loader) loader.remove();
    
    currentProjectIndex = filteredProjects.indexOf(projectId);
    document.getElementById(`${projectId}-modal`).style.display = 'block';
    document.addEventListener('keydown', handleKeyPress);
  };

  window.closeModal = function() {
    filteredProjects.forEach(project => {
      const modal = document.getElementById(`${project}-modal`);
      if (modal) modal.style.display = 'none';
    });
    document.removeEventListener('keydown', handleKeyPress);
  };

  window.navigateModal = function(direction) {
    closeModal();
    currentProjectIndex = (currentProjectIndex + direction + filteredProjects.length) % filteredProjects.length;
    openModal(filteredProjects[currentProjectIndex]);
  };

  function handleKeyPress(e) {
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
    if (e.key === 'Escape') closeModal();
  }

  // Initialize
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (!item.dataset.category) {
      item.dataset.category = "uncategorized";
    }
  });
  
  document.querySelector('.gallery-filter[data-filter="all"]').click();
  updateFilteredProjects();
});