import { type FormEvent, useEffect, useState } from 'react';
import { LogIn, Search, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useChaerokSession } from '@/hooks/useChaerokSession';
import { auth } from '@/lib/chaerok';
import logoImg from '@/assets/logo.png';

/**
 * 운영자용 계정 조회 — RevenueCat 대시보드의 가려진 UID(`RHCs••••izT2`)가
 * 누구인지 이메일로 푼다. CLI 판은 앱 저장소 `npm run server:whois`.
 *
 * 어디에도 링크하지 않는다 — 주소를 아는 사람만 연다. 그렇지만 문은
 * 서버(whois 함수)가 지킨다: ADMIN_EMAILS에 있는 계정의 토큰이 아니면
 * 403이고, 이 페이지는 그걸 그대로 보여줄 뿐이다.
 *
 * 내부 도구라 다국어를 태우지 않는다 — 화면 문구는 한국어 고정.
 */

interface WhoisUser {
  email: string | null;
  uid: string;
  tier: 'free' | 'pro';
  tierSource: string | null;
  provider: string | null;
  createdAt: string | null;
  lastSignInAt: string | null;
}

type State =
  | { kind: 'idle' }
  | { kind: 'busy' }
  | { kind: 'forbidden' }
  | { kind: 'error' }
  | { kind: 'done'; users: WhoisUser[]; total: number };

function fmtDate(iso: string | null): string {
  if (!iso) return '-';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '-' : d.toISOString().slice(0, 10);
}

export function Admin() {
  const { user, loading, signIn, error: authError } = useChaerokSession(false);
  const [query, setQuery] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  useEffect(() => {
    document.title = '채록 · 계정 조회';
  }, []);

  const run = async (q: string) => {
    setState({ kind: 'busy' });
    try {
      const token = await auth().currentUser!.getIdToken();
      const res = await fetch('/api/whois', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ query: q }),
      });
      if (res.status === 403) return setState({ kind: 'forbidden' });
      if (!res.ok) return setState({ kind: 'error' });
      const body = (await res.json()) as { users: WhoisUser[]; total: number };
      setState({ kind: 'done', users: body.users ?? [], total: body.total ?? 0 });
    } catch {
      setState({ kind: 'error' });
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void run(query.trim());
  };

  return (
    <main className="flex-1 bg-surface-paper">
      <div className="max-w-[860px] mx-auto px-5 lg:px-10 py-12">
        <header className="flex items-center gap-2.5 mb-2">
          <img src={logoImg} alt="" className="w-7 h-7 object-contain" />
          <h1 className="text-2xl font-serif">계정 조회</h1>
        </header>
        <p className="text-sm text-ink-muted mb-8 leading-relaxed">
          RevenueCat에 보이는 가려진 ID 조각(예: <code className="text-chaerok-800">RHCs izT2</code>)이나
          이메일을 넣으면 누구인지 찾아줍니다. 비워두고 조회하면 전체 계정이 나옵니다.
        </p>

        {loading ? null : !user ? (
          <div className="text-center py-14">
            <div className="w-11 h-11 mx-auto mb-3.5 rounded-xl bg-surface-amber/60 grid place-items-center text-ink-muted">
              <LogIn className="w-5 h-5" />
            </div>
            <p className="text-sm text-ink-muted mb-6">운영자 계정으로 로그인해 주세요.</p>
            <Button onClick={signIn}>Google로 로그인</Button>
            {authError ? <p className="mt-3 text-sm text-chaerok-800">{authError}</p> : null}
          </div>
        ) : (
          <>
            <form onSubmit={submit} className="flex gap-2 mb-8">
              <label className="flex-1 flex items-center gap-2 bg-surface-white border border-surface-amber rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-ink-muted shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="RHCs izT2 · 이메일 · UID 조각 — 비우면 전체"
                  className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-ink-muted"
                />
              </label>
              <Button type="submit" disabled={state.kind === 'busy'}>
                {state.kind === 'busy' ? '조회 중...' : '조회'}
              </Button>
            </form>

            {state.kind === 'forbidden' ? (
              <Notice
                icon={<ShieldAlert className="w-5 h-5" />}
                title="운영자 계정이 아닙니다"
                body="이 도구는 ADMIN_EMAILS에 등록된 계정만 쓸 수 있습니다. 서버 설정(server/.env)을 확인해 주세요."
              />
            ) : state.kind === 'error' ? (
              <Notice
                icon={<ShieldAlert className="w-5 h-5" />}
                title="조회하지 못했습니다"
                body="whois 함수가 배포돼 있는지, 네트워크가 정상인지 확인하고 다시 시도해 주세요."
              />
            ) : state.kind === 'done' && state.users.length === 0 ? (
              <Notice
                icon={<Search className="w-5 h-5" />}
                title="맞는 계정이 없습니다"
                body="RevenueCat의 익명 ID($RCAnonymousID)일 수 있습니다 — 대시보드에서 customer를 클릭해 별칭(alias) 목록의 다른 ID로 다시 찾아보세요."
              />
            ) : state.kind === 'done' ? (
              <>
                <p className="text-xs text-ink-muted mb-3 tabular-nums">
                  {state.total}개 일치{state.total > state.users.length ? ` · 앞 ${state.users.length}개만 표시` : ''}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse bg-surface-white rounded-xl overflow-hidden border border-surface-amber/60 text-sm">
                    <thead className="bg-surface-amber/30">
                      <tr>
                        <th className="p-3 border-b border-surface-amber/60 font-medium">이메일</th>
                        <th className="p-3 border-b border-surface-amber/60 font-medium">등급</th>
                        <th className="p-3 border-b border-surface-amber/60 font-medium">UID</th>
                        <th className="p-3 border-b border-surface-amber/60 font-medium whitespace-nowrap">가입 · 마지막 로그인</th>
                      </tr>
                    </thead>
                    <tbody className="text-ink-muted">
                      {state.users.map((u) => (
                        <tr key={u.uid} className="border-b border-surface-amber/40 last:border-b-0">
                          <td className="p-3">
                            <span className="text-ink-dark">{u.email ?? '(이메일 없음)'}</span>
                            {u.provider ? (
                              <span className="block text-xs opacity-70">{u.provider}</span>
                            ) : null}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {u.tier === 'pro' ? (
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-amber text-chaerok-800">
                                pro{u.tierSource === 'manual' ? ' · 수동 부여' : ''}
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 rounded-full border border-surface-amber">free</span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-xs break-all">{u.uid}</td>
                          <td className="p-3 whitespace-nowrap text-xs">
                            {fmtDate(u.createdAt)} · {fmtDate(u.lastSignInAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}

function Notice({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-11 h-11 mx-auto mb-3.5 rounded-xl bg-surface-amber/60 grid place-items-center text-ink-muted">
        {icon}
      </div>
      <h2 className="text-lg font-serif mb-2">{title}</h2>
      <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">{body}</p>
    </div>
  );
}
