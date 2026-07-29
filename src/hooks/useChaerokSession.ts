import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, type Tier } from '@/lib/chaerok';

/**
 * 로그인 상태와 등급을 함께 들고 있는다.
 *
 * 등급은 `users/{uid}.tier`에서 읽는다 — 결제 웹훅과 운영자 부여가 모두 그 문서를
 * 쓰므로, 앱과 웹이 같은 값을 본다. 클라이언트가 이 값을 고쳐도 서버가 믿지
 * 않으므로(Firestore 규칙과 Cloud Functions가 각자 확인한다) 화면 표시용이다.
 */
export interface ChaerokSession {
  user: User | null;
  tier: Tier;
  /** 처음 인증 상태를 확인하기 전 — 로그인 화면을 깜빡이지 않게 한다 */
  loading: boolean;
  signIn: () => Promise<void>;
  signOutNow: () => Promise<void>;
  /** 로그인 실패 사유 (사용자에게 보여줄 문구) */
  error: string | null;
}

export function useChaerokSession(isEn: boolean): ChaerokSession {
  const [user, setUser] = useState<User | null>(null);
  const [tier, setTier] = useState<Tier>('free');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth(), async (u) => {
      setUser(u);
      setLoading(false);
      if (!u) {
        setTier('free');
        return;
      }
      try {
        const snap = await getDoc(doc(db(), 'users', u.uid));
        setTier(snap.exists() && snap.get('tier') === 'mind' ? 'mind' : 'free');
      } catch {
        setTier('free');
      }
    });
  }, []);

  const signIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth(), new GoogleAuthProvider());
    } catch (e) {
      const code = (e as { code?: string })?.code;
      // 사용자가 창을 닫은 건 실패가 아니다 — 아무 말도 하지 않는다
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
      if (code === 'auth/unauthorized-domain') {
        setError(
          isEn
            ? 'This domain is not authorized for Google Sign-In. Please add it to Firebase Console.'
            : '이 도메인이 Firebase 승인된 도메인 목록에 없습니다. Firebase Console에서 도메인을 추가해 주세요.'
        );
        return;
      }
      
      setError(
        code === 'auth/popup-blocked'
          ? isEn
            ? 'Your browser blocked the popup. Allow popups and try again.'
            : '브라우저가 팝업을 막았어요. 팝업을 허용한 뒤 다시 눌러 주세요.'
          : isEn
            ? "Couldn't sign in. Please try again in a moment."
            : '로그인하지 못했어요. 잠시 뒤 다시 시도해 주세요.',
      );
    }
  };

  const signOutNow = async () => {
    await signOut(auth());
  };

  return { user, tier, loading, signIn, signOutNow, error };
}
