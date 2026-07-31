import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-1 bg-surface-paper py-24">
      <div className="max-w-[800px] mx-auto px-5 lg:px-10">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">
          {isEn ? 'Privacy Policy' : '개인정보 처리방침'}
        </h1>
        <p className="text-sm text-ink-muted mb-12">
          {isEn ? 'Last Updated: July 26, 2026 · Effective: July 26, 2026' : '최종 개정일 2026년 7월 26일 · 시행일 2026년 7월 26일'}
        </p>

        <div className="text-lg text-ink-dark leading-relaxed mb-16 p-6 bg-surface-amber/30 rounded-2xl border border-surface-amber/50">
          <p>
            {isEn
              ? "Chaerok basically processes user records within the device. This document explains what information is sent, when, and where."
              : "채록(Chaerok)은 이용자의 기록을 기기 안에서 처리하는 것을 기본으로 합니다. 이 문서는 어떤 정보가, 언제, 어디로 전달되는지를 설명합니다."
            }
          </p>
        </div>

        <div className="bg-white border border-surface-amber/50 rounded-2xl p-8 mb-16">
          <h2 className="text-xl font-medium mb-4">{isEn ? 'Table of Contents' : '목차'}</h2>
          <ol className="list-decimal pl-5 space-y-2 text-ink-muted">
            <li><a href="#s1" className="hover:text-chaerok-600">{isEn ? '1. Default Processing - On Device' : '기본 처리 방식 — 기기에서 처리'}</a></li>
            <li><a href="#s2" className="hover:text-chaerok-600">{isEn ? '2. When Cloud Processing is Selected' : '클라우드에서 처리를 선택한 경우'}</a></li>
            <li><a href="#s3" className="hover:text-chaerok-600">{isEn ? '3. Note Synchronization' : '노트 동기화'}</a></li>
            <li><a href="#s4" className="hover:text-chaerok-600">{isEn ? '4. Login Account' : '로그인 계정'}</a></li>
            <li><a href="#s5" className="hover:text-chaerok-600">{isEn ? '5. Usage Records' : '사용량 기록'}</a></li>
            <li><a href="#s6" className="hover:text-chaerok-600">{isEn ? '6. Information Not Collected' : '수집하지 않는 정보'}</a></li>
            <li><a href="#s7" className="hover:text-chaerok-600">{isEn ? '7. Retention and Deletion' : '보관 및 삭제'}</a></li>
            <li><a href="#s8" className="hover:text-chaerok-600">{isEn ? '8. Third-Party Processing' : '처리 위탁'}</a></li>
            <li><a href="#s9" className="hover:text-chaerok-600">{isEn ? '9. User Rights' : '이용자의 권리'}</a></li>
            <li><a href="#s10" className="hover:text-chaerok-600">{isEn ? '10. Inquiries' : '문의'}</a></li>
          </ol>
        </div>

        <div className="space-y-12">
          <article id="s1" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '1. Default Processing - On Device' : '1. 기본 처리 방식 — 기기에서 처리'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "By default, the original text, URLs, and images you enter, as well as the summaries, tags, and embeddings generated from them, are stored only in the on-device database and are not transmitted anywhere. It also works without an internet connection."
                : "기본 설정에서는 입력하신 텍스트·URL·이미지 원문과 그로부터 만들어진 요약·태그·임베딩이 모두 기기 내 데이터베이스에만 저장되며, 어디로도 전송되지 않습니다. 인터넷 연결 없이도 동작합니다."
              }
            </p>
          </article>

          <article id="s2" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '2. When Cloud Processing is Selected' : '2. 클라우드에서 처리를 선택한 경우'}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn
                ? 'Only when you select "Process in Cloud" in the settings, the content to be organized (entered text or shared link content) is sent to Google (Gemini API), the AI processing provider, via the Chaerok server.'
                : '설정에서 "클라우드에서 처리"를 선택하신 경우에만, 정리 대상 콘텐츠 (입력하신 텍스트 또는 공유된 링크의 내용)가 채록 서버를 거쳐 AI 처리 제공사인 Google(Gemini API)로 전송됩니다.'
              }
            </p>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? <>Chaerok is contracted at a paid tier, and content sent at this tier is <strong className="font-medium text-ink-dark">not used for Google's model training or product improvement.</strong> The AI processing itself simply returns the result to the device and does not keep a separate record of the content.</>
                : <>채록은 유료 등급으로 계약되어 있으며, 이 등급에서 전송된 콘텐츠는 <strong className="font-medium text-ink-dark">Google의 모델 학습이나 제품 개선에 사용되지 않습니다.</strong> AI 처리 과정 자체는 결과를 곧바로 기기로 돌려줄 뿐, 별도로 콘텐츠를 남기지 않습니다.</>
              }
            </p>
          </article>

          <article id="s3" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '3. Note Synchronization' : '3. 노트 동기화 (여러 기기에서 이어 쓰기)'}</h2>
            <p className="text-ink-muted leading-relaxed mb-6">
              {isEn
                ? 'If you select "Process in Cloud" and log in, your thought notes are kept in the Chaerok database so you can continue writing on other devices with the same account.'
                : '"클라우드에서 처리"를 선택하고 로그인하신 경우, 같은 계정의 다른 기기에서도 이어 쓸 수 있도록 생각 노트가 채록의 데이터베이스에 보관됩니다.'
              }
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-surface-amber/50">
                <thead className="bg-surface-amber/30">
                  <tr>
                    <th className="p-4 border-b border-surface-amber/50 font-medium">{isEn ? 'Items Stored' : '보관하는 항목'}</th>
                    <th className="p-4 border-b border-surface-amber/50 font-medium">{isEn ? 'Items Not Stored' : '보관하지 않는 항목'}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-muted">
                  <tr>
                    <td className="p-4 border-b border-surface-amber/50">
                      {isEn ? 'Original records, titles, summaries, tags, folder names' : '기록 원문, 제목, 요약, 태그, 폴더 이름'}
                    </td>
                    <td className="p-4 border-b border-surface-amber/50">
                      {isEn ? 'Attached image files (kept only on device)' : '첨부하신 이미지 파일 자체 (기기에만 남습니다)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? 'This data can only be accessed with your own account, and access by other users or unauthenticated requests is blocked. If you select "Process on Device", synchronization does not work, and the records do not leave the device.'
                : '이 데이터는 본인 계정으로만 접근할 수 있으며, 다른 이용자는 물론 로그인하지 않은 요청도 접근이 차단됩니다. "기기에서 처리"를 선택하신 경우에는 동기화가 동작하지 않으며, 기록은 기기 밖으로 나가지 않습니다.'
              }
            </p>
          </article>

          <article id="s4" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '4. Login Account' : '4. 로그인 계정'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "Cloud processing requires login. If you log in with a Google or Apple account, Chaerok keeps only the unique identifier (UID) of the account, which is used only to identify the user and check the subscription tier. Passwords are not passed to Chaerok."
                : "클라우드 처리는 로그인이 필요합니다. Google 또는 Apple 계정으로 로그인하시면 채록은 해당 계정의 고유 식별자(UID)만 보관하며, 이를 이용자를 구분하고 구독 등급을 확인하는 데에만 사용합니다. 비밀번호는 채록에 전달되지 않습니다."
              }
            </p>
          </article>

          <article id="s5" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '5. Usage Records' : '5. 사용량 기록'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "To settle cloud processing costs and prevent excessive use, the server records only the cumulative processing cost for this cycle and the number of feature calls per account. What you recorded is not included in this aggregation."
                : "클라우드 처리 비용을 정산하고 과다 사용을 막기 위해, 서버는 계정별로 이번 주기의 누적 처리 비용과 기능별 호출 횟수만 기록합니다. 무엇을 기록하셨는지에 해당하는 내용은 이 집계에 포함되지 않습니다."
              }
            </p>
          </article>

          <article id="s6" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '6. Information Not Collected' : '6. 수집하지 않는 정보'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? 'The Company does not collect location information, contacts, or advertising identifiers without user consent. "Share usage analytics" is disabled by default, and even if enabled, only anonymous statistics that cannot identify individuals are sent.'
                : '회사는 이용자의 동의 없이 위치 정보, 연락처, 광고 식별자를 수집하지 않습니다. "사용 분석 공유"는 기본값이 꺼짐이며, 켠 경우에도 개인을 식별할 수 없는 익명 통계만 전송됩니다.'
              }
            </p>
          </article>

          <article id="s7" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '7. Retention and Deletion' : '7. 보관 및 삭제'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? 'Records are kept until the user deletes the app or manually deletes them from the thought note. If you delete from the thought note, it is also deleted from other synchronized devices and databases. If you only delete the app, the records on the device disappear, but the synchronized copy remains. You can delete synchronized copies, your login account, and usage aggregations yourself with "Delete account" at the bottom of Settings, or request it through the account deletion page if you no longer have the app.'
                : '기록은 이용자가 앱을 삭제하거나 생각 노트에서 직접 삭제할 때까지 보관됩니다. 생각 노트에서 삭제하시면 동기화된 다른 기기와 데이터베이스에서도 함께 삭제됩니다. 앱만 삭제하신 경우 기기의 기록은 사라지지만 동기화본은 남습니다. 동기화본·로그인 계정·사용량 집계는 앱의 설정 맨 아래 "계정 삭제"에서 직접 지우실 수 있고, 앱이 없으시면 계정 삭제 안내 페이지로 요청하실 수 있습니다.'
              }
            </p>
          </article>

          <article id="s8" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '8. Third-Party Processing' : '8. 처리 위탁'}</h2>
            <p className="text-ink-muted leading-relaxed mb-6">
              {isEn ? 'The Company entrusts the following tasks to provide the service.' : '회사는 서비스 제공을 위해 아래와 같이 업무를 위탁하고 있습니다.'}
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-surface-amber/50">
                <thead className="bg-surface-amber/30">
                  <tr>
                    <th className="p-4 border-b border-surface-amber/50 font-medium">{isEn ? 'Entrusted To' : '수탁자'}</th>
                    <th className="p-4 border-b border-surface-amber/50 font-medium">{isEn ? 'Task' : '위탁 업무'}</th>
                    <th className="p-4 border-b border-surface-amber/50 font-medium">{isEn ? 'Transferred Info' : '이전되는 정보'}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-muted">
                  <tr className="border-b border-surface-amber/50">
                    <td className="p-4">Google LLC<br/><span className="text-sm opacity-70">(Firebase)</span></td>
                    <td className="p-4">{isEn ? 'Authentication, DB, Server' : '인증, 데이터베이스, 서버 운영'}</td>
                    <td className="p-4">{isEn ? 'Account ID, Sync Data' : '계정 식별자, 동기화를 켠 경우의 노트 데이터'}</td>
                  </tr>
                  <tr className="border-b border-surface-amber/50">
                    <td className="p-4">Google LLC<br/><span className="text-sm opacity-70">(Gemini API)</span></td>
                    <td className="p-4">{isEn ? 'AI Processing' : 'AI 요약·분류 처리'}</td>
                    <td className="p-4">{isEn ? 'Content (if Cloud is ON)' : '클라우드 처리를 켠 경우의 처리 대상 콘텐츠'}</td>
                  </tr>
                  <tr>
                    <td className="p-4">RevenueCat, Inc.</td>
                    <td className="p-4">{isEn ? 'Subscription status' : '구독 결제 상태 관리'}</td>
                    <td className="p-4">{isEn ? 'Account ID, Sub status' : '계정 식별자, 구독 상태'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-muted/70 leading-relaxed">
              {isEn
                ? 'The servers of the above entrustees may be located overseas. If the user uses only "Process on Device" and is not logged in, no information is transferred.'
                : '위 수탁자의 서버는 국외에 위치할 수 있습니다. 이용자가 "기기에서 처리"만 사용하고 로그인하지 않은 경우에는 어떤 정보도 이전되지 않습니다.'
              }
            </p>
          </article>

          <article id="s9" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '9. User Rights' : '9. 이용자의 권리'}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn
                ? "Users may request access, correction, deletion, or suspension of processing of their personal information at any time. You can directly process it in the app as follows."
                : "이용자는 언제든지 자신의 개인정보에 대해 열람·정정·삭제·처리정지를 요구할 수 있습니다. 앱 내에서는 다음과 같이 직접 처리하실 수 있습니다."
              }
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink-muted leading-relaxed mb-4">
              {isEn
                ? <>
                    <li>Delete record - Delete the item directly from the thought note</li>
                    <li>Stop cloud transmission - Settings → Processing method → Select "Process on Device"</li>
                    <li>Disconnect account - Settings → Account → Logout</li>
                    <li>Delete account - "Delete account" at the bottom of Settings</li>
                  </>
                : <>
                    <li>기록 삭제 — 생각 노트에서 항목을 직접 삭제</li>
                    <li>클라우드 전송 중단 — 설정 → 처리 방식 → "기기에서 처리" 선택</li>
                    <li>계정 연결 해제 — 설정 → 계정 → 로그아웃</li>
                    <li>계정 삭제 — 설정 맨 아래 "계정 삭제"</li>
                  </>
              }
            </ul>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? <>Deleting your account erases the notes kept in the cloud, your subscription tier record, and usage records together, and it takes effect immediately. If you no longer have the app installed, you can request deletion through the <a href="/delete-account" className="text-chaerok-600 hover:underline">account deletion page</a> or the inquiry channel below, and we will process it without delay.</>
                : <>계정을 삭제하시면 클라우드에 보관된 기록·구독 등급 기록·사용량 기록이 함께 지워지며, 즉시 처리됩니다. 앱을 이미 삭제하신 경우에는 <a href="/delete-account" className="text-chaerok-600 hover:underline">계정 삭제 안내 페이지</a> 또는 아래 문의 채널로 요청해 주시면 지체 없이 처리합니다.</>
              }
            </p>
          </article>

          <article id="s10" className="scroll-mt-24">
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? '10. Inquiries' : '10. 문의'}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn ? "Privacy-related inquiries can be submitted through the official Komjirak Studio channel (" : "개인정보 관련 문의는 꼼지락 스튜디오 공식 채널 ("}
              <a href="https://komjirak.studio" target="_blank" rel="noopener noreferrer" className="text-chaerok-600 hover:underline">komjirak.studio</a>
              {isEn ? ")." : ")을 통해 접수할 수 있습니다."}
            </p>
            <p className="text-sm text-ink-muted/70">
              {isEn ? 'If this policy changes, it will be announced in advance through the app and this page.' : '이 방침이 변경되는 경우 앱과 이 페이지를 통해 사전에 공지합니다.'}
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
