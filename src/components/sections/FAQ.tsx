import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export function FAQ() {
  const { t } = useTranslation();

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1')
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2')
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3')
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-surface-paper">
      <div className="max-w-[800px] mx-auto px-5 lg:px-10">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">
          {t('faq.title')}
        </h2>
        
        <div className="space-y-4 mb-24">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-surface-amber/50 rounded-2xl overflow-hidden shadow-sm"
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left font-medium text-lg hover:bg-surface-amber/10 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown className={cn("w-5 h-5 text-ink-muted transition-transform duration-300", openIndex === idx && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-ink-muted leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="text-center bg-surface-paper border border-surface-amber rounded-3xl p-12">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">{t('faq.cta.title')}</h2>
          <p className="text-ink-muted mb-10">{t('faq.cta.desc')}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-ink-dark hover:bg-ink-dark/80 px-8">
              {t('faq.cta.btn1')}
            </Button>
            <Button size="lg" className="bg-ink-dark hover:bg-ink-dark/80 px-8">
              {t('faq.cta.btn2')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
