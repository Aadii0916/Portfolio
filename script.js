document.addEventListener('DOMContentLoaded', function() {

   
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    
    const sections = document.querySelectorAll('.section-container');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
            }
        });
    }, observerOptions);

    
    sections.forEach(section => {
        observer.observe(section);
    });

    
    // --- Contact Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
       
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset(); 
    });

});