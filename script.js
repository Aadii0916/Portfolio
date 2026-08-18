/**
 * ADITYA GUPTA — PORTFOLIO JAVASCRIPT
 * Interactive functionality: Typewriter, Scrollspy, Mobile Drawer, Copy Toast
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Typewriter Animation Effect
    // -------------------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        'Machine Learning Engineer',
        'Deep Learning & NLP Specialist',
        'Generative AI Developer',
        'Python & Predictive Systems Builder'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        if (!typewriterElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at complete word
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // -------------------------------------------------------------------------
    // 2. Mobile Drawer Navigation Toggle
    // -------------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                hamburgerBtn.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                mobileDrawer.classList.remove('open');
                hamburgerBtn.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. ScrollSpy (Active Navigation Link Highlighting)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // -------------------------------------------------------------------------
    // 4. Copy Email to Clipboard with Toast Notification
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');
    const toast = document.getElementById('toast');
    const copyBtnText = document.getElementById('copy-btn-text');

    if (copyEmailBtn && emailText && toast) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailText.textContent.trim();
            try {
                await navigator.clipboard.writeText(email);

                // Show feedback in button
                if (copyBtnText) copyBtnText.textContent = 'Copied!';
                copyEmailBtn.style.borderColor = '#10b981';
                copyEmailBtn.style.color = '#10b981';

                // Show toast notification
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                    if (copyBtnText) copyBtnText.textContent = 'Copy';
                    copyEmailBtn.style.borderColor = '';
                    copyEmailBtn.style.color = '';
                }, 2500);
            } catch (err) {
                console.error('Failed to copy email: ', err);
            }
        });
    }
});
