/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Ontology } from '@/components/sections/Ontology';
import { Privacy } from '@/components/sections/Privacy';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/layout/Footer';
import { Terms } from '@/pages/Terms';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <Ontology />
      <Privacy />
      <FAQ />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
