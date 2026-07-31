import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * 계정 삭제 안내.
 *
 * App Store와 Google Play 모두 계정을 만들 수 있는 앱에 계정 삭제 경로를
 * 요구하고, Play는 **앱을 지운 사람도 요청할 수 있는 웹 주소**를 따로 받는다
 * (Play Console → 앱 콘텐츠 → 데이터 보안). 이 페이지가 그 주소다.
 *
 * 페이지가 직접 삭제를 수행하지는 않는다. 여기서 계정을 지우려면 웹에서 다시
 * 로그인을 받아야 하는데, 그건 삭제하려는 사람에게 계정을 하나 더 만들라는
 * 소리에 가깝다. 앱 안의 경로를 알려주고 앱이 없는 사람에게 연락 수단을 주면
 * 요건을 충족한다.
 */
export function DeleteAccount() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isEn = i18n.language === 'en';

  return (
    <main className="flex-1 bg-surface-paper py-24">
      <div className="max-w-[800px] mx-auto px-5 lg:px-10">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">
          {isEn ? 'Delete your account' : '계정 삭제'}
        </h1>
        <p className="text-sm text-ink-muted mb-12">
          {isEn
            ? 'Chaerok · Komjirak Studio'
            : '채록(Chaerok) · 꼼지락 스튜디오'}
        </p>

        <div className="text-lg text-ink-dark leading-relaxed mb-16 p-6 bg-surface-amber/30 rounded-2xl border border-surface-amber/50">
          <p>
            {isEn
              ? 'You can erase your Chaerok account and everything kept in the cloud. Notes stored on your device are a separate thing — they are never touched by this.'
              : '채록 계정과 클라우드에 보관된 기록을 지울 수 있어요. 기기 안에 있는 기록은 이와 별개로, 지워지지 않아요.'}
          </p>
        </div>

        <div className="space-y-12">
          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">
              {isEn ? 'From the app' : '앱에서 바로 지우기'}
            </h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn
                ? 'This is the fastest way, and it takes effect immediately.'
                : '가장 빠른 방법이고, 누르는 즉시 처리돼요.'}
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-ink-muted leading-relaxed">
              {isEn ? (
                <>
                  <li>Open Chaerok and sign in with the account you want to delete</li>
                  <li>Go to the Settings tab</li>
                  <li>
                    Scroll to the bottom and tap{' '}
                    <strong className="font-medium text-ink-dark">Delete account</strong>
                  </li>
                </>
              ) : (
                <>
                  <li>채록 앱을 열고, 지우려는 계정으로 로그인해요</li>
                  <li>설정 탭으로 가요</li>
                  <li>
                    맨 아래{' '}
                    <strong className="font-medium text-ink-dark">「계정 삭제」</strong>를 눌러요
                  </li>
                </>
              )}
            </ol>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">
              {isEn ? 'Without the app' : '앱이 없다면'}
            </h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn ? (
                <>
                  Email{' '}
                  <a
                    href="mailto:komjirak.studio@gmail.com?subject=Chaerok%20account%20deletion"
                    className="text-chaerok-600 hover:underline"
                  >
                    komjirak.studio@gmail.com
                  </a>{' '}
                  from the address you signed up with and ask us to delete your account. We reply
                  within 7 business days.
                </>
              ) : (
                <>
                  가입하신 이메일 주소로{' '}
                  <a
                    href="mailto:komjirak.studio@gmail.com?subject=%EC%B1%84%EB%A1%9D%20%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD"
                    className="text-chaerok-600 hover:underline"
                  >
                    komjirak.studio@gmail.com
                  </a>{' '}
                  으로 삭제를 요청해 주세요. 영업일 기준 7일 안에 처리하고 결과를 알려드려요.
                </>
              )}
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">
              {isEn ? 'What is erased' : '지워지는 것'}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-ink-muted leading-relaxed">
              {isEn ? (
                <>
                  <li>Your login account</li>
                  <li>Notes kept in the cloud — content, summaries, folders, and tags</li>
                  <li>Your subscription tier record</li>
                  <li>Usage records</li>
                </>
              ) : (
                <>
                  <li>로그인 계정</li>
                  <li>클라우드에 올라간 기록 — 본문·요약·폴더·태그</li>
                  <li>구독 등급 기록</li>
                  <li>사용량 기록</li>
                </>
              )}
            </ul>
            <p className="text-ink-muted leading-relaxed mt-4">
              {isEn
                ? 'This cannot be undone.'
                : '되돌릴 수 없어요.'}
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">
              {isEn ? 'What stays' : '남는 것'}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-ink-muted leading-relaxed">
              {isEn ? (
                <>
                  <li>
                    Notes on your device. Chaerok keeps records on the device by default, so they
                    exist whether or not you have an account. They go away when you uninstall the app.
                  </li>
                  <li>
                    Your store subscription. Deleting the account does not stop the billing — cancel
                    it in the App Store or Google Play as well.
                  </li>
                </>
              ) : (
                <>
                  <li>
                    기기 안의 기록. 채록은 기본적으로 기기에 기록을 담기 때문에, 계정이 있든 없든
                    그 기록은 그대로 있어요. 앱을 삭제하면 함께 사라져요.
                  </li>
                  <li>
                    스토어 구독. 계정을 지워도 청구는 멈추지 않아요. App Store 또는 Google Play에서
                    따로 해지해 주세요.
                  </li>
                </>
              )}
            </ul>
          </article>
        </div>

        <p className="text-sm text-ink-muted mt-16">
          {isEn ? (
            <>
              For how we handle personal information, see the{' '}
              <Link to="/privacy" className="text-chaerok-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </>
          ) : (
            <>
              개인정보를 어떻게 다루는지는{' '}
              <Link to="/privacy" className="text-chaerok-600 hover:underline">
                개인정보처리방침
              </Link>
              에 적어두었어요.
            </>
          )}
        </p>
      </div>
    </main>
  );
}
