import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko.json';
import en from './locales/en.json';

export const LANG_STORAGE_KEY = 'chaerok-lang';

/**
 * 초기 언어 — 앱(src/i18n/deviceLanguage.ts)과 같은 규칙: 저장된 선택이
 * 있으면 그게 항상 이기고, 없으면 **지역**(국가) 기준으로 한국이면 ko,
 * 그 외는 전부 en. Footer의 언어 전환 버튼이 선택을 저장한다.
 *
 * 언어(language) 대신 지역 로캘로 판정하는 이유는 앱과 동일하다 — 브라우저의
 * Intl 로캘도 OS의 지역 설정을 반영하므로, "한국에 있는 사람"이라는 같은
 * 의미로 앱·웹이 같은 결론을 낸다.
 */
function resolveInitialLanguage(): 'ko' | 'en' {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ko' || saved === 'en') return saved;
  } catch {
    // localStorage 접근 불가(프라이빗 모드 등) — 감지로 넘어간다
  }
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale ?? '';
    return locale.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  } catch {
    return 'ko';
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en }
    },
    lng: resolveInitialLanguage(),
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
