
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Mentoria from './pages/Mentoria';
import Cases from './pages/Cases';
import Research from './pages/Research';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [mentoriaSlug, setMentoriaSlug] = useState<string | null>(null);
  const [contactMode, setContactMode] = useState<'mentoria' | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === Page.MENTORIA || hash.startsWith('mentoria/')) {
        setCurrentPage(Page.MENTORIA);
        setMentoriaSlug(hash === Page.MENTORIA ? null : hash.split('/')[1] ?? null);
        setContactMode(null);
      } else if (hash === Page.CONSULTANCY || hash.startsWith('consultancy/')) {
        setCurrentPage(Page.CONSULTANCY);
        setMentoriaSlug(null);
        setContactMode(hash === 'consultancy' ? null : (hash.split('/')[1] === 'mentoria' ? 'mentoria' : null));
      } else if (Object.values(Page).includes(hash as Page)) {
        setCurrentPage(hash as Page);
        setMentoriaSlug(null);
        setContactMode(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page, subRoute?: string) => {
    if (page === Page.MENTORIA && subRoute) {
      window.location.hash = `mentoria/${subRoute}`;
      setCurrentPage(Page.MENTORIA);
      setMentoriaSlug(subRoute);
      setContactMode(null);
    } else if (page === Page.CONSULTANCY && subRoute === 'mentoria') {
      window.location.hash = 'consultancy/mentoria';
      setCurrentPage(Page.CONSULTANCY);
      setMentoriaSlug(null);
      setContactMode('mentoria');
    } else {
      window.location.hash = page;
      setCurrentPage(page);
      setMentoriaSlug(null);
      setContactMode(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={navigateTo} />;
      case Page.SERVICES:
        return <Solutions onNavigate={navigateTo} />;
      case Page.MENTORIA:
        return <Mentoria onNavigate={navigateTo} mentoriaSlug={mentoriaSlug} />;
      case Page.REPORTS:
        return <Cases />;
      case Page.RESEARCH:
        return <Research />;
      case Page.CONSULTANCY:
        return <Contact contactMode={contactMode} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={navigateTo}>
      {renderPage()}
    </Layout>
  );
};

export default App;
