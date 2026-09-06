import React, { useEffect } from 'react';
import { Main, Timeline, Research, Publications, Project, Navigation, Footer } from './components';
import './index.scss';
import AeroBackground from './components/AeroBackground';

const pages: Record<string, { title: string; component: React.ReactNode }> = {
  'index.html': { title: 'Home', component: <Main /> },
  'research.html': { title: 'Research', component: <Research /> },
  'publications.html': { title: 'Publications', component: <Publications /> },
  'experience.html': { title: 'Experience', component: <Timeline /> },
  'projects.html': { title: 'Projects', component: <Project /> },
};
function App() {
  const path = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const page = pages[path];
  useEffect(() => { document.title = `${page?.title || 'Page not found'} · Pranav Ponnivalavan`; }, [page]);
  return (
    <div className="aero-site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="atmosphere" aria-hidden="true" />
      <AeroBackground />
      <Navigation currentPage={path} />
      <main id="main-content">
        {page ? page.component : <section className="not-found"><h1>Page not found</h1><a href="/">Return home ↗</a></section>}
      </main>
      <Footer />
    </div>
  );
}
export default App;
