import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { AgentPulse } from '../ui/AgentPulse';
import { Feather, Star, BookOpen, Cloud, Sparkles, Pencil, Calendar, ShoppingBag, StickyNote, FileText, Bookmark, Folder, Camera, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6794663892';
const PLAY_TESTING_URL = 'https://play.google.com/apps/testing/com.chaerok.komjirak';

function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[10%] text-chaerok-400/40">
        <Star className="w-12 h-12 fill-current" />
      </motion.div>
      <motion.div animate={{ y: [0, 30, 0], x: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[80%] left-[5%] text-surface-amber/80">
        <Cloud className="w-16 h-16 fill-current" />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[15%] right-[10%] text-chaerok-600/30">
        <BookOpen className="w-10 h-10" strokeWidth={1.5} />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] right-[15%] text-surface-amber/60">
        <Sparkles className="w-14 h-14" strokeWidth={1.5} />
      </motion.div>
      <motion.div animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[20%] left-[45%] text-chaerok-100/50 hidden md:block">
        <Pencil className="w-10 h-10 fill-current" />
      </motion.div>
      <motion.div animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="absolute bottom-[20%] left-[30%] text-chaerok-600/20">
        <Calendar className="w-8 h-8" strokeWidth={1.5} />
      </motion.div>
      <motion.div animate={{ y: [0, -25, 0], x: [0, 10, 0], rotate: [0, 15, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute top-[10%] left-[70%] text-surface-amber/70 hidden lg:block">
        <ShoppingBag className="w-12 h-12 fill-current" />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[40%] right-[5%] text-chaerok-400/30">
        <StickyNote className="w-10 h-10" strokeWidth={1.5} />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="absolute bottom-[15%] left-[55%] text-chaerok-100/60 hidden md:block">
        <FileText className="w-10 h-10 fill-current" />
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute top-[60%] right-[8%] text-surface-amber/50">
        <Bookmark className="w-8 h-8" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}

/**
 * 앱의 핵심 순간 — "던지면 채록이가 정리한다" — 를 실제 앱 화면 흐름
 * (사진+메모 말풍선 → 채록이 답변 → 폴더에 담긴 노트)으로 재현한 목업.
 * 스크린샷 이미지를 그대로 싣는 대신 순차 등장 애니메이션으로 흐름을 보여준다.
 */
function PhoneMockup() {
  const { t } = useTranslation();

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <div className="relative w-full max-w-[320px] aspect-[1/2.1] bg-surface-dark rounded-[40px] shadow-ambient p-2.5 border-8 border-surface-dark">
      <div className="h-full w-full bg-surface-paper rounded-[26px] flex flex-col overflow-hidden">

        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div className="font-serif font-semibold text-ink-dark tracking-tight">채록</div>
          <AgentPulse />
        </div>

        <div className="flex-1 px-3 pt-2 flex flex-col gap-3 overflow-hidden">
          <motion.div {...appear(0.6)} className="self-end max-w-[85%]">
            <div className="bg-chaerok-600 text-white rounded-2xl rounded-br-md px-4 py-3 text-[13px] leading-relaxed shadow-sm">
              {t('hero.mock.userMsg')}
              <div className="mt-1.5 text-white/75 text-[11px] flex items-center gap-1">
                <Camera className="w-3 h-3" /> {t('hero.mock.userPhoto')}
              </div>
            </div>
          </motion.div>

          <motion.div {...appear(1.5)} className="self-start max-w-[95%] flex gap-2">
            <div className="w-7 h-7 rounded-full bg-chaerok-100 flex items-center justify-center shrink-0 mt-0.5">
              <Feather className="w-3.5 h-3.5 text-chaerok-600" />
            </div>
            <div className="bg-surface-white rounded-2xl rounded-bl-md px-4 py-3 text-[13px] leading-relaxed text-ink-dark shadow-sm border border-surface-amber/60">
              <p>{t('hero.mock.agentMsg')}</p>
              <p className="mt-1.5 text-ink-muted">{t('hero.mock.agentFolder')}</p>
            </div>
          </motion.div>

          <motion.div {...appear(2.4)} className="self-start w-[88%] ml-9">
            <div className="bg-surface-white rounded-xl border border-surface-amber px-3.5 py-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Folder className="w-4 h-4 text-chaerok-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-medium text-ink-dark truncate">{t('hero.mock.noteTitle')}</div>
                  <div className="text-[11px] text-ink-muted">{t('hero.mock.noteFolder')}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-muted/50 shrink-0" />
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-amber/60 text-chaerok-800">{t('hero.mock.tag1')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-amber/60 text-chaerok-800">{t('hero.mock.tag2')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-3 pb-4 pt-2">
          <div className="flex items-center gap-2 bg-surface-white border border-surface-amber rounded-2xl pl-4 pr-1.5 py-1.5">
            <span className="flex-1 text-[12px] text-ink-muted">{t('hero.mock.input')}</span>
            <div className="w-8 h-8 rounded-xl bg-chaerok-600 text-white flex items-center justify-center">
              <Feather className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-2 sm:-right-4 lg:-right-8 -bottom-4 bg-surface-paper/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-ambient w-[240px] sm:w-[280px] border border-surface-amber z-20"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-chaerok-100 flex items-center justify-center text-chaerok-600 shrink-0">
            <AgentPulse />
          </div>
          <div className="text-[13px] sm:text-sm font-medium text-ink-dark leading-tight">{t('hero.floatingTitle')}</div>
        </div>
        <div className="text-[11px] sm:text-[13px] text-ink-muted leading-[1.5] tracking-tight">
          {t('hero.floatingDesc')}
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storeButton = "gap-2 rounded-full px-5 border-surface-amber/60 bg-white text-ink-dark hover:bg-surface-amber/20 shadow-sm transition-all hover:-translate-y-0.5";

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-24">
      <BackgroundElements />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-amber/50 text-chaerok-800 text-sm font-medium mb-8">
              <AgentPulse />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-tight mb-6">
              {t('hero.title1')}<br />
              <span className="text-chaerok-600">{t('hero.title2')}</span>
            </h1>

            <p className="text-lg text-ink-muted leading-relaxed mb-10">
              {t('hero.desc')}
            </p>

            <div className="flex flex-col gap-3 items-center lg:items-start">
              <p className="text-sm font-medium text-ink-muted/80">{t('hero.platformLabel') || "Available on"}</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button onClick={() => window.open(APP_STORE_URL, '_blank', 'noopener')} variant="outline" size="sm" className={storeButton}>
                  <span className="font-semibold">App Store</span>
                  <span className="text-[10px] font-normal text-ink-muted">{t('hero.iosNote')}</span>
                </Button>
                <Button onClick={() => window.open(PLAY_TESTING_URL, '_blank', 'noopener')} variant="outline" size="sm" className={storeButton}>
                  <span className="font-semibold">Google Play</span>
                  <span className="text-[10px] font-normal text-ink-muted">{t('hero.androidNote')}</span>
                </Button>
                <Button onClick={() => navigate('/notes')} variant="outline" size="sm" className={storeButton}>
                  <span className="font-semibold">Web App</span>
                </Button>
                <Button onClick={() => navigate('/#extension')} variant="outline" size="sm" className={storeButton}>
                  <span className="font-semibold">Chrome Extension</span>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
