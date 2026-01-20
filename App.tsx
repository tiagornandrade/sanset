
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Cases from './pages/Cases';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (Object.values(Page).includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={navigateTo} />;
      case Page.INFRASTRUCTURE:
        return <Solutions onNavigate={navigateTo} />;
      case Page.REPORTS:
        return <Cases />;
      case Page.CONSULTANCY:
        return <Contact />;
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
