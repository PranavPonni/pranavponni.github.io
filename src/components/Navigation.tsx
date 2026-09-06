import React, { useState } from 'react';
import SocialLinks from './SocialLinks';
const navItems = [['Home', 'index.html'], ['Research', 'research.html'], ['Publications', 'publications.html'], ['Experience', 'experience.html'], ['Projects', 'projects.html']];
function Navigation({ currentPage }: { currentPage: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Pranav Ponnivalavan home"><span className="brand-orb" aria-hidden="true" /> PP<span className="wordmark-dot">.</span></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
      <nav id="primary-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {navItems.map(([label, path]) => <a key={path} href={path === 'index.html' ? '/' : `/${path}`} aria-current={currentPage === path ? 'page' : undefined}>{label}</a>)}
      </nav>
      <details className="header-contact" onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.currentTarget.open = false;
          event.currentTarget.querySelector('summary')?.focus();
        }
      }} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false;
      }}>
        <summary>Let’s connect <span>↗</span></summary>
        <div className="contact-options"><SocialLinks contactOnly /></div>
      </details>
    </header>
  );
}
export default Navigation;
