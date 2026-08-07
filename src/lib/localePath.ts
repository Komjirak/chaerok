import { useLocation } from 'react-router-dom';
import { isEnglishPath } from '@/i18n';

/**
 * 지금 보고 있는 언어의 주소 접두어 — 한국어는 없고, 영어는 `/en`.
 *
 * 링크마다 이걸 붙이지 않으면 영어 페이지에서 메뉴를 눌렀을 때 한국어로
 * 떨어진다. 언어가 주소에 있는 구조에서는 링크도 같이 움직여야 한다.
 */
export function useLangPrefix(): '' | '/en' {
  const { pathname } = useLocation();
  return isEnglishPath(pathname) ? '/en' : '';
}

/**
 * 지금 언어에 맞는 절대 경로를 만든다. `/` 는 접두어 자체가 되고
 * (`/en/`가 아니라 `/en`), 해시는 그대로 뒤에 붙는다.
 */
export function useLocalePath(): (to: string) => string {
  const prefix = useLangPrefix();
  return (to: string) => {
    if (!prefix) return to;
    if (to === '/') return prefix;
    if (to.startsWith('/#')) return `${prefix}${to.slice(1)}`;
    return `${prefix}${to}`;
  };
}

/** 같은 화면의 다른 언어 주소 — 언어 전환 버튼이 여기로 옮긴다. */
export function counterpartPath(pathname: string, next: 'ko' | 'en'): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (next === 'ko') return bare;
  return bare === '/' ? '/en' : `/en${bare}`;
}
