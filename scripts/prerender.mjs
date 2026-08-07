/**
 * 빌드 뒤에 라우트별 정적 HTML을 만든다.
 *
 * 왜 필요한가: 이 사이트는 클라이언트 렌더링 SPA다. `dist/index.html`의
 * `<div id="root">` 안은 로딩 표시뿐이고 본문은 JS가 실행돼야 생긴다.
 * 구글은 렌더링 큐를 거쳐 나중에라도 보지만, **네이버 Yeti와 AI 크롤러
 * (GPTBot·ClaudeBot·PerplexityBot 등)는 JS를 실행하지 않는다** — 그들에게
 * 이 사이트는 빈 페이지였다.
 *
 * 그래서 빌드 시점에 본문을 정적 HTML로 심는다. React가 마운트되면
 * `root.render`가 컨테이너 내용을 통째로 지우고 다시 그리므로(현재 로딩
 * 표시가 사라지는 것과 같은 원리) 화면 동작은 달라지지 않는다.
 *
 * ⚠️ 본문 문구는 **`src/locales/ko.json`에서 읽는다**. 여기에 카피를 새로
 * 적지 않는다 — 같은 문장을 두 곳에서 관리하면 반드시 어긋난다(웹·앱 법적
 * 고지에서 이미 겪었다). 문구를 고치려면 로케일 파일을 고치면 된다.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://chaerok.komjirak.studio';
const OG_IMAGE = `${SITE}/icon.png`; // 1200x1200 정사각 — 가로형 전용 이미지가 생기면 교체한다

const ko = JSON.parse(readFileSync(path.join(ROOT, 'src/locales/ko.json'), 'utf8'));

/** 오늘 날짜(UTC, YYYY-MM-DD) — sitemap의 lastmod. 배포일이 곧 갱신일이다. */
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ─────────────────────────────────────────────────────────────
// 본문 셸 — 로케일 문구로 조립한다
// ─────────────────────────────────────────────────────────────

const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

function homeShell() {
  const { hero, features, ontology, extension, pricing, privacy, faq, footer } = ko;
  return `
<header class="s-top">
  <p class="s-brand">채록 chaerok</p>
</header>
<main>
  <h1>${esc(hero.title1)} ${esc(hero.title2)}</h1>
  <p class="s-lede">${esc(hero.desc)}</p>
  <p class="s-note">${esc(hero.floatingDesc)}</p>

  <section>
    <h2>${esc(features.title1)} ${esc(features.title2)}</h2>
    <p>${esc(features.desc)}</p>
    <h3>${esc(features.f1.title)}</h3><p>${esc(features.f1.desc)}</p>
    <h3>${esc(features.f2.title)}</h3><p>${esc(features.f2.desc)}</p>
    <h3>${esc(features.f3.title)}</h3><p>${esc(features.f3.desc)}</p>
  </section>

  <section>
    <h2>${esc(ontology.title1)} ${esc(ontology.title2)}</h2>
    <p>${esc(ontology.desc)}</p>
    ${list([ontology.l1, ontology.l2, ontology.l3])}
  </section>

  <section>
    <h2>${esc(extension.title1)} ${esc(extension.title2)}</h2>
    <p>${esc(extension.desc)}</p>
    <h3>${esc(extension.f1.title)}</h3><p>${esc(extension.f1.desc)}</p>
    <h3>${esc(extension.f2.title)}</h3><p>${esc(extension.f2.desc)}</p>
    <h3>${esc(extension.f3.title)}</h3><p>${esc(extension.f3.desc)}</p>
  </section>

  <section>
    <h2>${esc(pricing.title)}</h2>
    <p>${esc(pricing.desc)}</p>
    <h3>${esc(pricing.free.name)} — ${esc(pricing.free.price)} (${esc(pricing.free.period)})</h3>
    <p>${esc(pricing.free.desc)}</p>
    ${list(pricing.free.features)}
    <h3>${esc(pricing.pro.name)} — ${esc(pricing.pro.price)} ${esc(pricing.pro.period)}</h3>
    <p>${esc(pricing.pro.desc)}</p>
    ${list(pricing.pro.features)}
    <p class="s-note">${esc(pricing.footnote)}</p>
  </section>

  <section>
    <h2>${esc(privacy.title1)} ${esc(privacy.title2)}</h2>
    <p>${esc(privacy.desc)}</p>
    <h3>${esc(privacy.f1.title)}</h3><p>${esc(privacy.f1.desc)}</p>
    <h3>${esc(privacy.f2.title)}</h3><p>${esc(privacy.f2.desc)}</p>
    <h3>${esc(privacy.f3.title)}</h3><p>${esc(privacy.f3.desc)}</p>
  </section>

  <section>
    <h2>${esc(faq.title)}</h2>
    <h3>${esc(faq.q1)}</h3><p>${esc(faq.a1)}</p>
    <h3>${esc(faq.q2)}</h3><p>${esc(faq.a2)}</p>
    <h3>${esc(faq.q3)}</h3><p>${esc(faq.a3)}</p>
  </section>
</main>
<footer class="s-foot">
  <p>${esc(footer.desc)}</p>
  <p><a href="/terms">${esc(footer.link.terms)}</a> · <a href="/privacy">${esc(footer.link.privacy)}</a> · <a href="/delete-account">${esc(footer.link.deleteAccount)}</a></p>
  <p>${esc(footer.copy)}</p>
</footer>`;
}

/** 법적 고지·안내 페이지 — 제목과 한 줄 안내만 심는다(본문은 앱과 같은 원본이 React 쪽에 있다). */
function pageShell(heading, lede) {
  return `
<header class="s-top"><p class="s-brand"><a href="/">채록 chaerok</a></p></header>
<main>
  <h1>${esc(heading)}</h1>
  <p class="s-lede">${esc(lede)}</p>
</main>
<footer class="s-foot"><p>${esc(ko.footer.copy)}</p></footer>`;
}

// ─────────────────────────────────────────────────────────────
// 구조화 데이터 (JSON-LD)
// ─────────────────────────────────────────────────────────────

const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: '꼼지락 스튜디오',
  alternateName: 'Komjirak Studio',
  url: SITE,
  logo: `${SITE}/icon-512.png`,
  email: 'komjirak.studio@gmail.com',
  // 스토어 링크는 **공개된 것만** 넣는다. App Store·Play는 출시 후 추가한다.
  sameAs: ['https://chromewebstore.google.com/detail/pnndjhdcffpjmekjiknakoakablpocli'],
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: '채록(chaerok)',
  inLanguage: 'ko-KR',
  publisher: { '@id': `${SITE}/#org` },
};

const APP = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/#app`,
  name: '채록',
  alternateName: 'Chaerok',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'iOS, Android, Web',
  url: SITE,
  description: ko.hero.desc,
  publisher: { '@id': `${SITE}/#org` },
  // 평점은 넣지 않는다 — 실제 리뷰가 쌓이기 전의 aggregateRating은 거짓이다.
  offers: [
    { '@type': 'Offer', name: ko.pricing.free.name, price: '0', priceCurrency: 'KRW', category: 'free' },
    {
      '@type': 'Offer',
      name: ko.pricing.pro.name,
      price: '4900',
      priceCurrency: 'KRW',
      category: 'subscription',
      description: ko.pricing.pro.desc,
    },
  ],
  featureList: [...ko.pricing.free.features, ...ko.pricing.pro.features],
};

const FAQ_LD = {
  '@type': 'FAQPage',
  '@id': `${SITE}/#faq`,
  mainEntity: [
    [ko.faq.q1, ko.faq.a1],
    [ko.faq.q2, ko.faq.a2],
    [ko.faq.q3, ko.faq.a3],
  ].map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const jsonLd = (nodes) =>
  `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  })}</script>`;

// ─────────────────────────────────────────────────────────────
// 라우트 표
// ─────────────────────────────────────────────────────────────

const HOME_DESC =
  '채록은 텍스트·링크·사진을 던져 넣으면 AI 에이전트 채록이가 요약·태그·분류하고 관련 기록끼리 이어주는 개인 지식관리(두 번째 뇌) 앱입니다. 기본은 기기 안 처리이고, 무료로 시작할 수 있습니다.';

const ROUTES = [
  {
    file: 'index.html',
    loc: '/',
    title: '채록 — 던지면 AI가 정리하는 당신의 두 번째 뇌 | 메모·링크·스크린샷 자동 요약',
    desc: HOME_DESC,
    shell: homeShell(),
    ld: jsonLd([ORG, WEBSITE, APP, FAQ_LD]),
    sitemap: { changefreq: 'weekly' },
  },
  {
    file: 'terms.html',
    loc: '/terms',
    title: '이용약관 | 채록(chaerok)',
    desc: '채록 서비스 이용약관 — 서비스 제공 범위, 계정과 데이터, 구독과 결제, 서비스 변경·중단에 관한 조항입니다.',
    shell: pageShell('이용약관', '채록 서비스 이용에 관한 약관입니다.'),
    sitemap: { changefreq: 'monthly' },
  },
  {
    file: 'privacy.html',
    loc: '/privacy',
    title: '개인정보처리방침 | 채록(chaerok)',
    desc: '채록 개인정보처리방침 — 기본은 기기에서 처리하고, 클라우드 처리는 사용자가 선택했을 때만 동작합니다. 수집 항목과 보관·파기 기준을 밝힙니다.',
    shell: pageShell('개인정보처리방침', '기록은 기기 안에서 먼저 처리됩니다. 클라우드 처리는 사용자가 켰을 때만 동작합니다.'),
    sitemap: { changefreq: 'monthly' },
  },
  {
    file: 'delete-account.html',
    loc: '/delete-account',
    title: '계정 삭제 안내 | 채록(chaerok)',
    desc: '채록 계정과 데이터를 삭제하는 방법 안내입니다. 앱 설정에서 직접 삭제할 수 있고, 삭제 시 지워지는 항목과 보관 기간을 함께 설명합니다.',
    shell: pageShell('계정 삭제', '앱에서 직접 계정과 데이터를 삭제할 수 있습니다. 지워지는 항목과 절차를 안내합니다.'),
    sitemap: { changefreq: 'yearly' },
  },
  // 아래 둘은 검색 결과에 있을 이유가 없다 — 개인 기록 뷰어와 익스텐션 팝업이다.
  {
    file: 'notes.html',
    loc: '/notes',
    title: '생각 노트 | 채록(chaerok)',
    desc: '로그인한 사용자의 기록을 읽는 화면입니다.',
    shell: pageShell('생각 노트', '로그인하면 폰에서 담은 기록을 여기서 읽을 수 있습니다.'),
    noindex: true,
  },
  {
    file: 'save.html',
    loc: '/save',
    title: '채록에 담기',
    desc: '크롬 익스텐션이 여는 담기 창입니다.',
    shell: pageShell('채록에 담기', '크롬 익스텐션이 여는 창입니다.'),
    noindex: true,
  },
];

// ─────────────────────────────────────────────────────────────
// 조립
// ─────────────────────────────────────────────────────────────

function head(route) {
  const url = `${SITE}${route.loc === '/' ? '/' : route.loc}`;
  const robots = route.noindex
    ? '<meta name="robots" content="noindex, nofollow" />'
    : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />';

  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.desc)}" />`,
    robots,
    route.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    '<meta name="theme-color" content="#C9603A" />',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="채록(chaerok)" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.desc)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="1200" />',
    '<meta property="og:image:type" content="image/png" />',
    // 정사각 이미지에는 summary가 맞다. 가로형(1200x630)이 생기면 summary_large_image로 바꾼다.
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.desc)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    route.ld ?? '',
  ]
    .filter(Boolean)
    .join('\n    ');
}

const HEAD_RE = /<!--seo:head:start-->[\s\S]*?<!--seo:head:end-->/;
const BODY_RE = /<!--seo:body:start-->[\s\S]*?<!--seo:body:end-->/;

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (!HEAD_RE.test(template) || !BODY_RE.test(template)) {
  throw new Error('prerender: index.html에서 seo 마커를 찾지 못했습니다. index.html을 확인하세요.');
}

for (const route of ROUTES) {
  const html = template
    .replace(HEAD_RE, `<!--seo:head:start-->\n    ${head(route)}\n    <!--seo:head:end-->`)
    .replace(BODY_RE, `<!--seo:body:start-->${route.shell}<!--seo:body:end-->`);
  const out = path.join(DIST, route.file);
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerender: ${route.file} (${route.loc})${route.noindex ? ' [noindex]' : ''}`);
}

// sitemap — 색인 대상만. lastmod는 배포일이다.
const indexed = ROUTES.filter((r) => !r.noindex);
writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.sitemap.changefreq}</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);
console.log(`prerender: sitemap.xml (${indexed.length}개)`);

// llms.txt — AI가 이 제품을 인용할 때 쓸 사실을 한곳에 모은다.
writeFileSync(
  path.join(DIST, 'llms.txt'),
  `# 채록 (Chaerok)

> ${HOME_DESC}

만든 곳: 꼼지락 스튜디오(Komjirak Studio) · ${SITE}
플랫폼: iOS · Android · 웹 · 크롬 익스텐션
갱신: ${TODAY}

## 무엇을 하는 앱인가

- 텍스트·URL·이미지를 던져 넣으면 AI 에이전트 "채록이"가 요약하고 태그를 달아 폴더로 분류한다.
- 관련된 기록끼리 이어 두고, 아침 브리핑으로 다시 꺼내 준다.
- OS 공유 시트("채록에 담기")와 크롬 익스텐션으로 어디서든 담을 수 있다.
- 정리 위치를 사용자가 고른다: **기본은 기기 안 처리**, 클라우드 처리는 켰을 때만 동작한다.

## 요금제

- ${ko.pricing.free.name}: ${ko.pricing.free.price} (${ko.pricing.free.period}) — ${ko.pricing.free.desc}
${ko.pricing.free.features.map((f) => `  - ${f}`).join('\n')}
- ${ko.pricing.pro.name}: ${ko.pricing.pro.price} ${ko.pricing.pro.period} — ${ko.pricing.pro.desc}
${ko.pricing.pro.features.map((f) => `  - ${f}`).join('\n')}

## 자주 묻는 질문

- ${ko.faq.q1} ${ko.faq.a1}
- ${ko.faq.q2} ${ko.faq.a2}
- ${ko.faq.q3} ${ko.faq.a3}

## 링크

- 소개: ${SITE}/
- 이용약관: ${SITE}/terms
- 개인정보처리방침: ${SITE}/privacy
- 계정 삭제 안내: ${SITE}/delete-account
- 크롬 익스텐션: https://chromewebstore.google.com/detail/pnndjhdcffpjmekjiknakoakablpocli
`,
);
console.log('prerender: llms.txt');
