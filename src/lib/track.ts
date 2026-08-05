/**
 * 익명 사용 통계 — 채록 서버의 track 함수로 보낸다 (앱과 같은 수집 경로).
 *
 * 페이지뷰·UV는 Vercel Analytics(쿠키리스)가 담당하고, 여기는 퍼널 이벤트
 * (담기 창 열림·저장 성공 등)만 센다. 처리방침 6조와 1:1 — installId는
 * 무작위 값으로 계정과 무관하고, 이벤트 이름·횟수 외에는 아무것도 싣지 않는다.
 */

const TRACK_URL = 'https://us-central1-chaerok-c0830.cloudfunctions.net/track';
const ID_KEY = 'chaerok-install-id';

function installId(): string {
  try {
    const saved = localStorage.getItem(ID_KEY);
    if (saved) return saved;
    const fresh = crypto.randomUUID();
    localStorage.setItem(ID_KEY, fresh);
    return fresh;
  } catch {
    return crypto.randomUUID();
  }
}

/** 실패는 조용히 버린다 — 통계가 저장 흐름을 막으면 안 된다 */
export function trackEvent(name: string, platform: 'web' | 'ext' = 'web'): void {
  if (import.meta.env.DEV) return;
  try {
    void fetch(TRACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ installId: installId(), platform, events: [{ name, count: 1 }] }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}
