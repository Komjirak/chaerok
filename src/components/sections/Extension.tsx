import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Download, MousePointerClick, NotebookPen, Puzzle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { useExtension } from '@/hooks/useExtension';

/**
 * 크롬 익스텐션 안내 + 원터치 설치 버튼.
 *
 * 2026-08-05 웹스토어 승인 — 이 주소가 채워진 순간부터 버튼이 스토어 설치
 * 한 번 누르기로 바뀐다. 아래 zip 경로는 스토어가 응답하지 않을 때를 위한
 * 폴백으로 남겨둔다(주소를 비우면 그 흐름으로 되돌아간다).
 *
 * utm은 붙이지 않는다 — 스토어가 「링크 복사」에 얹어주는 값이라 우리 유입
 * 분석에 쓰이지도 않고, 주소만 길어진다.
 */
const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/pnndjhdcffpjmekjiknakoakablpocli';

const EXTENSION_ZIP = '/chaerok-extension.zip';

export function Extension() {
  const { t } = useTranslation();
  const { installed } = useExtension();
  const [showSteps, setShowSteps] = useState(false);

  const onStore = !!CHROME_STORE_URL;

  const install = () => {
    if (onStore) {
      window.open(CHROME_STORE_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    // 내려받기와 설치 안내를 함께 띄운다. 받아만 두고 무엇을 해야 할지
    // 모르는 것이 이 방식의 유일한 함정이라 그 자리에서 말해준다.
    const a = document.createElement('a');
    a.href = EXTENSION_ZIP;
    a.download = 'chaerok-extension.zip';
    a.click();
    setShowSteps(true);
  };

  return (
    <section id="extension" className="py-16 md:py-20 bg-surface-amber/30">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-surface-paper text-chaerok-800 text-sm font-medium mb-6">
              <Puzzle className="w-4 h-4" strokeWidth={1.5} />
              {t('extension.badge')}
            </div>

            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
              {t('extension.title1')}<br className="md:hidden" /> {t('extension.title2')}
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-10">
              {t('extension.desc')}
            </p>

            {installed ? (
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 h-14 px-6 rounded-xl bg-surface-paper text-chaerok-800 font-medium">
                  <Check className="w-5 h-5" strokeWidth={2} />
                  {t('extension.installed')}
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.assign('/notes')}
                >
                  {t('extension.openNotes')}
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2" onClick={install}>
                  {onStore ? (
                    <Puzzle className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <Download className="w-5 h-5" strokeWidth={1.5} />
                  )}
                  {onStore ? t('extension.btnStore') : t('extension.btnDownload')}
                </Button>
                {!onStore && (
                  <button
                    type="button"
                    onClick={() => setShowSteps((v) => !v)}
                    className="text-ink-muted hover:text-chaerok-600 text-sm underline underline-offset-4 transition-colors"
                  >
                    {t('extension.howTo')}
                  </button>
                )}
              </div>
            )}

            {!installed && showSteps && (
              <motion.ol
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 space-y-3 text-sm text-ink-muted list-none"
              >
                {[t('extension.step1'), t('extension.step2'), t('extension.step3')].map(
                  (step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-surface-paper text-chaerok-600 flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ),
                )}
              </motion.ol>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              {
                icon: MousePointerClick,
                title: t('extension.f1.title'),
                desc: t('extension.f1.desc'),
              },
              {
                icon: NotebookPen,
                title: t('extension.f2.title'),
                desc: t('extension.f2.desc'),
              },
              {
                icon: Check,
                title: t('extension.f3.title'),
                desc: t('extension.f3.desc'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-6 rounded-2xl bg-surface-paper border border-surface-amber"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-chaerok-100 text-chaerok-600 flex items-center justify-center">
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-medium text-ink-dark mb-1">{item.title}</div>
                  <div className="text-sm text-ink-muted leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
