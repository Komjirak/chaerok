import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: 'chaerok-c0830.firebaseapp.com',
  projectId: 'chaerok-c0830',
  appId: '1:409220964793:web:2f29fd3b9c8c8aa6915668',
  storageBucket: 'chaerok-c0830.firebasestorage.app',
  messagingSenderId: '409220964793',
};

/**
 * 채록 백엔드 연결.
 *
 * 이 값들은 공개돼도 되는 웹 설정이다 — iOS 앱 번들에도 그대로 들어 있다.
 * 실제 접근 통제는 Firestore 보안 규칙이 한다: 본인 노트만 읽고, 쓰기는
 * Pro 등급만 가능하다.
 *
 * 앱 저장소의 app.json → expo.extra.firebase 와 같아야 한다.
 * 한쪽만 고치면 앱과 웹이 서로 다른 프로젝트를 보게 된다.
 */
const firebaseConfig = {
  ...DEFAULT_FIREBASE_CONFIG,
  apiKey:
    typeof import.meta.env.VITE_FIREBASE_API_KEY === 'string' &&
    import.meta.env.VITE_FIREBASE_API_KEY.trim().length > 0
      ? import.meta.env.VITE_FIREBASE_API_KEY.trim()
      : DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain:
    typeof import.meta.env.VITE_FIREBASE_AUTH_DOMAIN === 'string' &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN.trim().length > 0
      ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN.trim()
      : DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId:
    typeof import.meta.env.VITE_FIREBASE_PROJECT_ID === 'string' &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID.trim().length > 0
      ? import.meta.env.VITE_FIREBASE_PROJECT_ID.trim()
      : DEFAULT_FIREBASE_CONFIG.projectId,
  appId:
    typeof import.meta.env.VITE_FIREBASE_APP_ID === 'string' &&
    import.meta.env.VITE_FIREBASE_APP_ID.trim().length > 0
      ? import.meta.env.VITE_FIREBASE_APP_ID.trim()
      : DEFAULT_FIREBASE_CONFIG.appId,
  storageBucket:
    typeof import.meta.env.VITE_FIREBASE_STORAGE_BUCKET === 'string' &&
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET.trim().length > 0
      ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET.trim()
      : DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId:
    typeof import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID === 'string' &&
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID.trim().length > 0
      ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID.trim()
      : DEFAULT_FIREBASE_CONFIG.messagingSenderId,
};

let app: FirebaseApp | null = null;

function ensureApp(): FirebaseApp {
  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error('Firebase initialization failed', error);
      app = initializeApp(DEFAULT_FIREBASE_CONFIG);
    }
  }
  return app;
}

export function auth(): Auth {
  return getAuth(ensureApp());
}

export function db(): Firestore {
  return getFirestore(ensureApp());
}

// ── 노트 스키마 ────────────────────────────────────────────
//
// 앱의 src/db/types.ts와 src/sync/noteSync.ts가 쓰는 모양이다.
// 여기서 바꾸면 폰에서 빈 노트가 되므로, 앱 쪽과 함께 고쳐야 한다.

export interface NoteTag {
  name: string;
  type: 'concept' | 'person' | 'project' | 'place' | 'keyword';
}

export interface RemoteNote {
  id: string;
  createdAt: number;
  updatedAt: number;
  type: 'text' | 'url' | 'image' | 'todo';
  sourceApp: string | null;
  rawContent: string;
  sourceUrl: string | null;
  title: string;
  summary: string;
  folderName: string | null;
  tags: NoteTag[];
  processedByLayer: 'L1' | 'L2' | 'L3';
  processedByModel: string;
  /** 삭제 툼스톤 — 목록에서 빼야 한다 */
  deleted?: boolean;
}

export type Tier = 'free' | 'mind';

/**
 * 추적 파라미터를 **표시에서만** 걷어낸다.
 * 저장된 URL은 건드리지 않는다 — 원문 접근이 깨질 수 있다.
 * 앱의 src/agent/urlDisplay.ts와 같은 규칙.
 */
export function cleanUrlForDisplay(raw: string): string {
  const DROP = new Set(['gclid', 'fbclid', 'igshid', 'xmt', 'slof', 'ref', 'ref_src', 'mc_cid']);
  try {
    const u = new URL(raw);
    for (const k of [...u.searchParams.keys()]) {
      if (k.toLowerCase().startsWith('utm_') || DROP.has(k.toLowerCase())) {
        u.searchParams.delete(k);
      }
    }
    return u.toString();
  } catch {
    return raw;
  }
}

/** 목록에서 읽기 좋은 날짜 */
export function relativeDate(ms: number, isEn: boolean): string {
  if (!ms) return '';
  const d = new Date(ms);
  const days = Math.floor((Date.now() - ms) / 86_400_000);
  if (days === 0) return isEn ? 'Today' : '오늘';
  if (days === 1) return isEn ? 'Yesterday' : '어제';
  if (days < 7) return isEn ? `${days} days ago` : `${days}일 전`;
  return d.toLocaleDateString(isEn ? 'en-US' : 'ko-KR', { month: 'short', day: 'numeric' });
}
