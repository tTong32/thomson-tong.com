document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => { modal.style.opacity = 1; }, 100);
    }

    const scrollArrow = document.getElementById('scrollArrow');
    const aboutSection = document.getElementById('about');

    if (!scrollArrow || !aboutSection) return;
    scrollArrow.addEventListener('click', () => {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center'});
        scrollArrow.classList.add('hidden'); // hide after click
    });

    const revealSections = document.querySelectorAll('#about, #projects');
    if (!revealSections.length) return;

    revealSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
        section.classList.add('visible');
        }
    });

    if (!('IntersectionObserver' in window)) {
        function fallbackReveal() {
        revealSections.forEach(section => {
            const secTop = section.getBoundingClientRect().top;
            if (secTop < window.innerHeight * 0.95) {
            section.classList.add('visible');
            }
        });
        }
        window.addEventListener('scroll', fallbackReveal);
        fallbackReveal();
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.01
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === "about"){ 
                scrollArrow.classList.add('hidden'); 
                navMenu.classList.add('visible');
            }
            if (entry.target.id === "projects"){
                
                const cards = entry.target.querySelectorAll(".project.card");
                cards.forEach(card => {
                    const title = card.querySelector('h3');
                    const desc = card.querySelector('p');
   
                    typeWriter(title);
                    typeWriter(desc);
                });
            }
            obs.unobserve(entry.target);
        }
        });
    }, observerOptions);

    revealSections.forEach(section => observer.observe(section));

    if ('scrollRestoration' in history){
        history.scrollRestoration = 'manual';
    }
});

function typeWriter(element, callback) {
    let i = 0;
    const speed = 120;
    const text = element.getAttribute("data-text") || element.textContent.trim();
    element.textContent = "";

  function typing() {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
    } else {
        setTimeout(() => element.classList.remove("typing"), 500);
        if (typeof callback === "function") callback();
    }
  }

  element.classList.add("typing");
  typing();
}

