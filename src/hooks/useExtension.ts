import { useEffect, useState } from 'react';

/**
 * 크롬 익스텐션이 이 브라우저에 깔려 있는지.
 *
 * 익스텐션의 콘텐츠 스크립트(`site-bridge.js`)가 채록 도메인에서만 돌면서
 * `<html data-chaerok-extension="1.0.0">`을 남긴다. 그 표시를 읽는다.
 *
 * 메시지(`externally_connectable`) 대신 DOM을 쓰는 이유는 익스텐션 쪽 주석에
 * 적어뒀다 — 요약하면 페이지가 익스텐션 ID를 알아야 하는데 그 ID가
 * 스토어 등록 전후로 바뀌기 때문이다.
 *
 * `document_start`에 주입되므로 보통은 첫 렌더에 이미 붙어 있다. 다만
 * 방금 설치한 사람은 새로고침 전까지 표시가 없으므로, 늦게 오는 신호도 받는다.
 */
export function useExtension(): { installed: boolean; version: string | null } {
  const [version, setVersion] = useState<string | null>(
    () =>
      (typeof document !== 'undefined' &&
        document.documentElement.dataset.chaerokExtension) ||
      null,
  );

  useEffect(() => {
    if (version) return;

    const onReady = (e: Event) => {
      const detail = (e as CustomEvent<{ version?: string }>).detail;
      setVersion(detail?.version ?? '1');
    };
    document.addEventListener('chaerok:extension-ready', onReady);

    // 탭으로 돌아왔을 때 한 번 더 본다 — 설치하고 오는 흐름이 그렇다
    const recheck = () => {
      const v = document.documentElement.dataset.chaerokExtension;
      if (v) setVersion(v);
    };
    window.addEventListener('focus', recheck);

    return () => {
      document.removeEventListener('chaerok:extension-ready', onReady);
      window.removeEventListener('focus', recheck);
    };
  }, [version]);

  return { installed: !!version, version };
}
