/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Ontology } from '@/components/sections/Ontology';
import { Extension } from '@/components/sections/Extension';
import { Privacy } from '@/components/sections/Privacy';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/layout/Footer';
import { Terms } from '@/pages/Terms';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { DeleteAccount } from '@/pages/DeleteAccount';
import { Notes } from '@/pages/Notes';
import { Save } from '@/pages/Save';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/track';

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
      <Extension />
      <Privacy />
      <Pricing />
      <FAQ />
    </main>
  );
}

/**
 * 소개·문서·생각 노트는 공통 껍데기(헤더·푸터)를 쓴다.
 * /save는 익스텐션이 여는 작은 팝업 창이라 껍데기를 붙이지 않는다 —
 * 460px 폭에서 헤더와 푸터는 방해만 된다.
 */
function Shell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/notes" element={<Notes />} />
        {/* Play·App Store가 요구하는 계정 삭제 안내 — 주소를 바꾸면 스토어 설정도 함께 고쳐야 한다 */}
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

/**
 * 경로가 바뀔 때마다 페이지뷰를 센다. Vercel Analytics도 같은 것을 세지만,
 * 이쪽은 앱·익스텐션과 **같은 집계**로 들어가 운영 대시보드 한 곳에서 보인다.
 */
function PageViews() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageViews />
      <Routes>
        <Route path="/save" element={<Save />} />
        <Route path="/*" element={<Shell />} />
      </Routes>
      {/* 쿠키리스 페이지뷰·UV — Vercel 대시보드에서 Web Analytics를 켜야 수집된다 */}
      <Analytics />
    </BrowserRouter>
  );
}
