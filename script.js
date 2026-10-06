function toggleDetails(achievementId) {
  var achievementDetails = document.getElementById(achievementId);
  achievementDetails.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = Array.from(document.querySelectorAll('.topnav a'));

  function clearActive() {
    navLinks.forEach(a => a.classList.remove('active'));
  }

  function setActiveFromPath() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const hash = location.hash || '';

    // First try to match full page links (projects.html, Achievements.html, etc.)
    let matched = false;
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      const hrefPath = href.split('#')[0].replace(/^\//, '').toLowerCase();
      const hrefHash = href.includes('#') ? '#' + href.split('#')[1] : '';
      if (hrefPath && hrefPath === path && (!hrefHash || hrefHash === hash)) {
        clearActive();
        a.classList.add('active');
        matched = true;
      }
    });

    // If no page-match, try to match hash anchors (for single-page index sections)
    if (!matched && hash) {
      const targetLink = navLinks.find(a => a.getAttribute('href') === hash);
      if (targetLink) {
        clearActive();
        targetLink.classList.add('active');
        matched = true;
      }
    }

    // Fallback: if on index (no explicit match), mark Home if present
    if (!matched) {
      const section = document.body.dataset.navSection;
      const fallback = navLinks.find(a => section ? a.textContent.trim().toLowerCase() === section : /home/i.test(a.textContent));
      if (fallback) {
        clearActive();
        fallback.classList.add('active');
      }
    }
  }

  setActiveFromPath();
  window.addEventListener('popstate', setActiveFromPath);
  window.addEventListener('hashchange', setActiveFromPath);

  // If we're on the index page, use IntersectionObserver to update active link while scrolling
  const currentPath = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (currentPath === '' || currentPath === 'index.html') {
    const sectionLinks = navLinks.filter(a => a.getAttribute('href') && a.getAttribute('href').startsWith('#'));
    const sectionIds = sectionLinks.map(a => a.getAttribute('href').slice(1));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (sections.length) {
      const orderedSections = [...sections].sort((a, b) => a.offsetTop - b.offsetTop);
      const updateActiveSection = () => {
        const offset = (document.querySelector('.topnav')?.offsetHeight || 80) + 20;
        const reached = orderedSections.filter(section => section.getBoundingClientRect().top <= offset);
        const section = reached[reached.length - 1] || orderedSections[0];
        const link = sectionLinks.find(a => a.getAttribute('href') === '#' + section.id);
        if (link) {
          clearActive();
          link.classList.add('active');
        }
      };
      let scrollQueued = false;
      window.addEventListener('scroll', () => {
        if (!scrollQueued) {
          scrollQueued = true;
          requestAnimationFrame(() => {
            scrollQueued = false;
            updateActiveSection();
          });
        }
      }, { passive: true });
      window.addEventListener('resize', updateActiveSection);
      updateActiveSection();
    }
  }
});
