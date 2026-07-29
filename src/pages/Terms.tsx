import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Terms() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isEn = i18n.language === 'en';

  return (
    <main className="flex-1 bg-surface-paper py-24">
      <div className="max-w-[800px] mx-auto px-5 lg:px-10">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">
          {isEn ? 'Terms of Service' : '서비스 이용약관'}
        </h1>
        <p className="text-sm text-ink-muted mb-12">
          {isEn ? 'Last Updated: July 26, 2026 · Effective: July 26, 2026' : '최종 개정일 2026년 7월 26일 · 시행일 2026년 7월 26일'}
        </p>

        <div className="text-lg text-ink-dark leading-relaxed mb-16 p-6 bg-surface-amber/30 rounded-2xl border border-surface-amber/50">
          <p>
            {isEn 
              ? "These terms define the conditions, procedures, and the rights and obligations of the user and Komjirak Studio (hereinafter referred to as the 'Company') in providing the Chaerok service (hereinafter referred to as the 'Service')."
              : "이 약관은 꼼지락 스튜디오(이하 '회사')가 제공하는 채록(Chaerok) 서비스 (이하 '서비스')의 이용 조건과 절차, 이용자와 회사의 권리·의무를 정합니다."
            }
          </p>
        </div>

        <div className="space-y-12">
          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 1 (Provision of Service)' : '제1조 (서비스의 제공)'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn 
                ? "The Company provides a personal knowledge management service that summarizes, classifies, and connects the text, URLs, and images entered by the user through an AI agent ('Chaerok'). Records are processed on the user's device by default, and cloud AI models are used only if the user explicitly chooses to do so."
                : '회사는 이용자가 입력한 텍스트·URL·이미지를 AI 에이전트("채록이")를 통해 요약·분류·연결하여 보관하는 개인 지식관리 서비스를 제공합니다. 기록의 처리는 원칙적으로 이용자 기기 내에서 이루어지며, 이용자가 선택한 경우에 한해 클라우드 AI 모델이 사용됩니다.'
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 2 (Accounts and Data)' : '제2조 (계정 및 데이터)'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "The service can be used on a per-device basis without a separate login, in which case the records do not leave the device. A login is required only when the user selects 'Process in Cloud', at which point the content to be organized is sent to the AI processing provider via the Company's servers. Detailed scopes are governed by the Privacy Policy."
                : '서비스는 별도 로그인 없이 기기 단위로 이용할 수 있으며, 이 경우 기록은 기기 밖으로 나가지 않습니다. 이용자가 "클라우드에서 처리"를 선택한 경우에 한해 로그인이 필요하며, 정리 대상 콘텐츠가 회사 서버를 거쳐 AI 처리 제공사로 전송됩니다. 자세한 범위는 개인정보 처리방침에 따릅니다.'
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 3 (User Obligations)' : '제3조 (이용자의 의무)'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "Users must comply with relevant laws, the provisions of these terms, user guides, and notices related to the service, and must not record content that infringes on the rights of others."
                : '이용자는 관계 법령, 이 약관의 규정, 이용 안내 및 서비스와 관련하여 공지한 사항을 준수해야 하며, 타인의 권리를 침해하는 콘텐츠를 기록해서는 안 됩니다.'
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 4 (Rights to Content)' : '제4조 (콘텐츠의 권리)'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? <>The rights to the records entered by the user and the summaries and tags generated from them belong to <strong className="font-medium text-ink-dark">the user.</strong> The company processes such data only to the extent necessary to provide the service and does not use it for its own purposes or provide it to third parties.</>
                : <>이용자가 서비스에 입력한 기록과 그로부터 생성된 요약·태그의 권리는{' '}<strong className="font-medium text-ink-dark">이용자에게 있습니다.</strong> 회사는 서비스 제공에 필요한 범위에서만 해당 데이터를 처리하며, 이를 회사의 목적으로 이용하거나 제3자에게 제공하지 않습니다.</>
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 5 (Subscription and Payment)' : '제5조 (구독 및 결제)'}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn
                ? "Paid subscriptions, such as Chaerok Pro, are subject to the payment policies of the app market (App Store / Google Play) where the user subscribed."
                : "채록 Pro 등 유료 구독은 이용자가 가입한 앱 마켓(App Store / Google Play)의 결제 정책을 따릅니다."
              }
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink-muted leading-relaxed">
              {isEn
                ? <>
                    <li>Subscriptions are billed to your store account and will automatically renew unless canceled at least 24 hours before the end of the period.</li>
                    <li>Cancellations can be made on the subscription management screen of each store, and even after cancellation, you can use the service until the end of the already paid period.</li>
                    <li>Refunds are subject to the refund policies of each app market and cannot be processed directly by the Company.</li>
                    <li>Subscription prices are subject to change, in which case users will be notified in advance and their consent obtained.</li>
                  </>
                : <>
                    <li>구독은 스토어 계정으로 청구되며, 기간 종료 24시간 전까지 해지하지 않으면 자동 갱신됩니다.</li>
                    <li>해지는 각 스토어의 구독 관리 화면에서 할 수 있으며, 해지 후에도 이미 결제된 기간이 끝날 때까지 이용할 수 있습니다.</li>
                    <li>환불은 각 앱 마켓의 환불 정책에 따르며, 회사는 직접 환불을 처리할 수 없습니다.</li>
                    <li>구독 가격은 변경될 수 있으며, 변경 시 사전에 공지하고 동의를 받습니다.</li>
                  </>
              }
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 6 (Changes and Termination of Service)' : '제6조 (서비스의 변경 및 중단)'}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn
                ? "The Company may change or suspend the contents of the Service. In the event of material changes affecting paid subscriptions or service termination, we will notify you at least 30 days in advance and provide instructions on how to handle the remaining period."
                : "회사는 서비스의 내용을 변경하거나 중단할 수 있습니다. 유료 구독에 영향을 주는 중대한 변경이나 서비스 종료의 경우, 최소 30일 전에 공지하고 잔여 기간에 대한 처리 방안을 함께 안내합니다."
              }
            </p>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "Even if the service is terminated, the records stored on the user's device will remain, and the Company will provide a way to download the records."
                : "서비스가 종료되는 경우에도 이용자의 기기에 저장된 기록은 그대로 남으며, 회사는 기록을 내려받을 수 있는 방법을 함께 제공합니다."
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 7 (Disclaimer)' : '제7조 (면책)'}</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              {isEn
                ? "Summaries, classifications, and connection information generated by AI are for reference only, and the Company does not fully guarantee their accuracy. Please check the original text for important information together."
                : "AI가 생성한 요약·분류·연결 정보는 참고용이며, 회사는 그 정확성을 완전히 보증하지 않습니다. 중요한 정보는 원문을 함께 확인해 주세요."
              }
            </p>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "The Company is not responsible for service interruptions caused by events beyond its control, such as natural disasters or communication failures."
                : "천재지변, 통신 장애 등 회사의 통제를 벗어난 사유로 인한 서비스 중단에 대해서는 책임을 지지 않습니다."
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 8 (Governing Law and Dispute Resolution)' : '제8조 (준거법 및 분쟁 해결)'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn
                ? "These terms shall be construed in accordance with the laws of the Republic of Korea. In the event of a dispute related to the use of the service, the Company and the user will consult in good faith for an amicable resolution. If no agreement is reached, a lawsuit may be filed with the competent court under the Civil Procedure Act."
                : "이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 분쟁이 발생한 경우 회사와 이용자는 원만한 해결을 위해 성실히 협의합니다. 협의가 이루어지지 않는 경우 민사소송법상의 관할 법원에 소를 제기할 수 있습니다."
              }
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-serif mb-4 text-ink-dark">{isEn ? 'Article 9 (Inquiries)' : '제9조 (문의)'}</h2>
            <p className="text-ink-muted leading-relaxed">
              {isEn ? "Inquiries related to the service can be submitted through the official Komjirak Studio channel (" : "서비스 관련 문의는 꼼지락 스튜디오 공식 채널 ("}
              <a href="https://komjirak.studio" target="_blank" rel="noopener noreferrer" className="text-chaerok-600 hover:underline">komjirak.studio</a>
              {isEn ? ")." : ")을 통해 접수할 수 있습니다."}
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
