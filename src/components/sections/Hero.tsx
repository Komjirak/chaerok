import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { AgentPulse } from '../ui/AgentPulse';
import { Feather } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
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
            
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2">
                {t('hero.btnStart')}
                <Feather className="w-5 h-5" strokeWidth={1.5} />
              </Button>
              <Button variant="secondary" size="lg">
                {t('hero.btnHow')}
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Abstract representation of the app interface */}
            <div className="relative w-full max-w-[320px] aspect-[1/2.1] bg-surface-dark rounded-[40px] shadow-ambient p-4 overflow-hidden border-8 border-surface-dark">
              {/* App UI Mockup */}
              <div className="h-full w-full bg-surface-dark flex flex-col gap-4 text-surface-paper">
                <div className="flex justify-between items-center mt-2 px-2">
                  <div className="w-12 h-4 bg-surface-paper/20 rounded-full"></div>
                  <div className="w-6 h-6 rounded-full bg-surface-paper/20"></div>
                </div>
                
                <div className="px-2 pt-4 pb-2">
                  <div className="text-sm text-surface-paper/60 mb-2">오늘의 브리핑</div>
                  <div className="text-xl font-serif font-medium leading-snug mb-4">
                    어제부터 1건을 채록했어요. 요약하자면...
                  </div>
                  <div className="w-full h-24 bg-surface-paper/10 rounded-xl mb-4"></div>
                  <div className="w-3/4 h-4 bg-surface-paper/20 rounded-md"></div>
                </div>
                
                <div className="mt-auto px-2 pb-4">
                  <div className="w-full h-12 bg-chaerok-600 rounded-xl flex items-center justify-center font-medium gap-2 text-white">
                    <Feather className="w-4 h-4" /> 기록하기
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-1/3 bg-surface-paper p-5 rounded-2xl shadow-ambient w-64 border border-surface-amber"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-chaerok-100 flex items-center justify-center text-chaerok-600">
                    <AgentPulse />
                  </div>
                  <div className="text-sm font-medium text-ink-dark">{t('hero.floatingTitle')}</div>
                </div>
                <div className="text-sm text-ink-muted leading-relaxed">
                  {t('hero.floatingDesc')}
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
