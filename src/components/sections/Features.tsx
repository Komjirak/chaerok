import { motion } from 'motion/react';
import { AgentPulse } from '../ui/AgentPulse';
import { PenTool, BrainCircuit, Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: PenTool,
      title: t('features.f1.title'),
      description: t('features.f1.desc'),
      bgColor: "bg-surface-amber/30",
      iconColor: "text-chaerok-600 bg-chaerok-100"
    },
    {
      icon: BrainCircuit,
      title: t('features.f2.title'),
      description: t('features.f2.desc'),
      bgColor: "bg-white",
      iconColor: "text-ink-dark bg-surface-paper"
    },
    {
      icon: Network,
      title: t('features.f3.title'),
      description: t('features.f3.desc'),
      bgColor: "bg-white",
      iconColor: "text-node-blue bg-blue-50"
    }
  ];

  return (
    <section id="features" className="py-24 bg-surface-paper">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-amber/50 text-chaerok-600 mb-6">
            <AgentPulse />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            {t('features.badge')}
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            {t('features.desc')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`rounded-2xl p-8 shadow-ambient border border-surface-amber/50 ${feature.bgColor}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${feature.iconColor}`}>
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif font-medium mb-4">{feature.title}</h3>
              <p className="text-ink-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
