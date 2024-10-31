let currentSlide = 1; // Default slide is Digital Painting

window.onload = function() {
    changeSlide(1); // Ensure the first slide (Digital Painting) is shown on load
}

function changeSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const aboutMeSection = document.getElementById('aboutMe');
    const characterDetailsSection = document.getElementById('characterDetails');

    currentSlide = slideIndex;

    // Move the slider
    const offset = -currentSlide * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}vw)`;

    // Show/hide sections based on the current slide
    if (currentSlide === 0) {
        aboutMeSection.style.display = 'none'; 
        characterDetailsSection.style.display = 'block'; /* Show when Character Design is active */
    } else if (currentSlide === 1) {
        aboutMeSection.style.display = 'block'; 
        characterDetailsSection.style.display = 'none'; 
    } else {
        aboutMeSection.style.display = 'none'; 
        characterDetailsSection.style.display = 'none'; 
    }
}
