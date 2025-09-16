document.addEventListener('DOMContentLoaded', () => {
  // Fade in welcome modal
  const modal = document.getElementById('welcomeModal');
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => { modal.style.opacity = 1; }, 100);
  }

  const projects = document.getElementById('projects');
  if (!projects) return;

  if (!('IntersectionObserver' in window)) {
    function fallbackReveal() {
      const triggerBottom = window.innerHeight * 0.7;
      const secTop = projects.getBoundingClientRect().top;
      console.log('Fallback: secTop=', secTop, 'triggerBottom=', triggerBottom);
      if (secTop < triggerBottom) projects.classList.add('visible');
    }
    window.addEventListener('scroll', fallbackReveal);
    fallbackReveal();
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.05 
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      console.log('IO entry:', entry.target.id, 'isIntersecting=', entry.isIntersecting, 'intersectionRatio=', entry.intersectionRatio);
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  observer.observe(projects);
});

