
    // Smooth scroll to the top of the page
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.onscroll = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block"; // Show the button when scrolling down
      } else {
        scrollToTopBtn.style.display = "none"; // Hide the button when at the top
      }
    };

    var loader = document.getElementById("preloader"); 
    
    window.addEventListener("load", function(){
        loader.style.display= "none"; 
    })



      

var loader = document.getElementById("preloader"); 
    
    window.addEventListener("load", function(){
        loader.style.display= "none"; 
    })


    

    // Get references to elements
    const gallery = document.querySelector('.gallery');
    const popup = document.querySelector('.popup');
    const popupImage = popup.querySelector('img');
    const popupDescription = popup.querySelector('.description');
    const popupDate = popup.querySelector('.date');
    const popupMethod = popup.querySelector('.method');
    const closeBtn = popup.querySelector('.close');
    const leftBtn = popup.querySelector('.left');
    const rightBtn = popup.querySelector('.right');

    // Create an array of images and their data
    const images = Array.from(gallery.querySelectorAll('img'));

    let currentIndex = -1; // Keeps track of the currently displayed image

    // Function to update the popup with the selected image
    function updatePopup(index) {
      const image = images[index];
      popupImage.src = image.src; // Set the clicked image as the popup image
      popupDescription.textContent = image.dataset.description || 'No description available.'; // Set the image description
      popupDate.textContent = image.dataset.date || 'No date available.'; // Set the date
      popupMethod.textContent = image.dataset.method || 'No method available.'; // Set the method
    }

    // Event listener for clicking an image in the gallery
    gallery.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        currentIndex = images.indexOf(e.target); // Get the index of the clicked image
        updatePopup(currentIndex); // Update the popup with the selected image
        popup.style.display = 'flex'; // Show the popup
      }
    });

    // Event listener for closing the popup
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none'; // Hide the popup
      popupImage.src = ''; // Clear the image source
      popupDescription.textContent = ''; // Clear the description
      popupDate.textContent = ''; // Clear the date
      popupMethod.textContent = ''; // Clear the method
    });

    // Event listener for the left navigation button
    leftBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to the previous image
      updatePopup(currentIndex); // Update the popup with the new image
    });

    // Event listener for the right navigation button
    rightBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length; // Move to the next image
      updatePopup(currentIndex); // Update the popup with the new image
    });

    // Close popup on clicking outside the image
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
        popupImage.src = '';
        popupDescription.textContent = '';
        popupDate.textContent = '';
        popupMethod.textContent = '';
      }
    });
