'use strict';

function toggleDetails(achievementId) {
  document.getElementById(achievementId)?.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = [...document.querySelectorAll('.topnav a')];
  const topnav = document.querySelector('.topnav');
  const isHome = location.pathname === '/' || location.pathname.endsWith('/index.html');
  const setActive = (selected) => {
    for (const link of navLinks) {
      const active = link === selected;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', link.dataset.section ? 'location' : 'page');
      else link.removeAttribute('aria-current');
    }
  };
  const updateOffset = () => {
    document.documentElement.style.setProperty('--nav-offset', ((topnav?.offsetHeight || 80) + 20) + 'px');
  };
  updateOffset();

  if (isHome) {
    const sections = navLinks.filter(link => link.dataset.section).map(link => ({link, section: document.getElementById(link.dataset.section)})).filter(item => item.section);
    const updateSection = () => {
      const line = (topnav?.offsetHeight || 80) + 24;
      const reached = sections.filter(item => item.section.getBoundingClientRect().top <= line);
      const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const current = atEnd ? sections[sections.length - 1] : reached[reached.length - 1] || sections[0];
      if (current) setActive(current.link);
    };
    let scheduled = false;
    const scheduleUpdate = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => { scheduled = false; updateSection(); });
      }
    };
    window.addEventListener('scroll', scheduleUpdate, {passive: true});
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    window.addEventListener('resize', () => { updateOffset(); scheduleUpdate(); });
    document.fonts?.ready.then(scheduleUpdate);
    updateSection();
  } else {
    const pageLink = navLinks.find(link => new URL(link.href).pathname === location.pathname);
    const section = document.body.dataset.navSection;
    const fallback = navLinks.find(link => link.dataset.page === section || link.dataset.section === section);
    if (pageLink || fallback) setActive(pageLink || fallback);
    window.addEventListener('resize', updateOffset);
  }

  const revealProject = () => {
    if (!location.hash) return;
    const project = document.getElementById(location.hash.slice(1));
    const details = project?.querySelector('details.project-full-details');
    if (details) {
      details.open = true;
      requestAnimationFrame(() => project.scrollIntoView({block: 'start', behavior: 'instant'}));
    }
  };
  revealProject();
  window.addEventListener('hashchange', revealProject);
});
