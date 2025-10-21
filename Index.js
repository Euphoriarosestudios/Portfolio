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
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }
});
  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;

    if (hash.startsWith('#filter-')) {
      const filter = hash.replace('#filter-', '');

      // Trigger the corresponding button click
      const button = document.querySelector(`.filter-button[data-filter="${filter}"]`);
      if (button) button.click();
    }
  });
// ...existing code...

// Activate Euphoria-Arts filter if hash is #euphoria-arts on page load or hash change
function activateEuphoriaArtsFilter() {
  if (window.location.hash === "#euphoria-arts") {
    // Find the Euphoria-Arts filter button
    var filterBtn = document.querySelector('.gallery-filter[data-filter="animations"]');
    if (filterBtn) {
      filterBtn.click();
      // Optionally scroll to the gallery grid
      var grid = document.querySelector('.gallery-grid');
      if (grid) grid.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", activateEuphoriaArtsFilter);
// Run on hash change (if user clicks the nav again)
window.addEventListener("hashchange", activateEuphoriaArtsFilter);

// ...existing code...


// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.querySelector('.gallery-grid');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterButtons = Array.from(document.querySelectorAll('.gallery-filter'));

  // Utility: sanitize hash token (allow letters, numbers, -, _)
  function sanitizeToken(token) {
    if (!token) return null;
    // Accept tokens like "filter=animations" or "animations"
    token = decodeURIComponent(token.replace(/^#/, '').trim());
    // If it includes "filter=" extract value
    const m = token.match(/filter=([a-z0-9_-]+)/i);
    if (m) return m[1].toLowerCase();
    // Otherwise extract first safe token
    const m2 = token.match(/([a-z0-9_-]+)/i);
    return m2 ? m2[1].toLowerCase() : null;
  }

  // Parse filter from URL: check search ?filter=..., then hash #filter=... or simple hash
  function getFilterFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('filter')) return params.get('filter').toLowerCase();
    } catch (e) {}
    return sanitizeToken(window.location.hash) || null;
  }

  // Apply filter ('all' shows everything)
  function applyFilter(filter, updateUrl = true, smoothScroll = true) {
    if (!filter || filter === 'all') {
      galleryItems.forEach(it => it.style.display = '');
      filter = 'all';
    } else {
      galleryItems.forEach(it => {
        const cat = (it.dataset.category || '').toLowerCase();
        // allow multiple categories separated by spaces or commas
        const categories = cat.split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
        const match = categories.includes(filter);
        it.style.display = match ? '' : 'none';
      });
    }

    // update active button UI
    filterButtons.forEach(btn => {
      const btnFilter = (btn.dataset.filter || 'all').toLowerCase();
      if (btnFilter === filter) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // update URL without causing jump
    if (updateUrl) {
      const newHash = '#filter=' + encodeURIComponent(filter);
      // replaceState to avoid creating history entries on each click
      history.replaceState(null, '', newHash);
    }

    // scroll gallery into view (if requested)
    if (smoothScroll && galleryGrid) {
      setTimeout(() => {
        galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  // Attach click handlers to filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const f = (btn.dataset.filter || 'all').toLowerCase();
      applyFilter(f, true, true);
    });
  });

  // On hashchange (back/forward) re-apply filter
  window.addEventListener('hashchange', () => {
    const f = getFilterFromUrl();
    applyFilter(f || 'all', false, true);
  });

  // Initial load: parse URL and apply filter
  const initialFilter = getFilterFromUrl();
  applyFilter(initialFilter || 'all', false, false);
});
// ...existing code...
