import { motion } from 'motion/react';
import { GitCommit, Focus, Maximize } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Ontology() {
  const { t } = useTranslation();

  return (
    <section id="ontology" className="py-24 bg-[#362f29] text-surface-paper relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] flex items-center justify-center">
            {/* Visual representation of ontology/graph */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-md stroke-surface-amber/20" strokeWidth="1" fill="none">
                <motion.line x1="200" y1="200" x2="100" y2="100" animate={{ strokeDasharray: ["0, 100", "100, 0"] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.line x1="200" y1="200" x2="300" y2="120" animate={{ strokeDasharray: ["0, 100", "100, 0"] }} transition={{ duration: 4, repeat: Infinity }} />
                <motion.line x1="200" y1="200" x2="120" y2="280" animate={{ strokeDasharray: ["0, 100", "100, 0"] }} transition={{ duration: 2.5, repeat: Infinity }} />
                <motion.line x1="200" y1="200" x2="320" y2="280" animate={{ strokeDasharray: ["0, 100", "100, 0"] }} transition={{ duration: 3.5, repeat: Infinity }} />
                
                {/* Central Node */}
                <circle cx="200" cy="200" r="30" className="fill-chaerok-600/20 stroke-chaerok-600" strokeWidth="2" />
                <text x="200" y="205" className="fill-surface-paper text-xs font-medium" textAnchor="middle">{t('ontology.svg.ai')}</text>
                
                {/* Peripheral Nodes */}
                <circle cx="100" cy="100" r="24" className="fill-[#362f29] stroke-surface-amber/50" />
                <text x="100" y="104" className="fill-surface-paper/70 text-[10px]" textAnchor="middle">{t('ontology.svg.cloud')}</text>
                
                <circle cx="300" cy="120" r="28" className="fill-[#362f29] stroke-surface-amber/50" />
                <text x="300" y="124" className="fill-surface-paper/70 text-[10px]" textAnchor="middle">{t('ontology.svg.insight')}</text>
                
                <circle cx="120" cy="280" r="20" className="fill-[#362f29] stroke-surface-amber/50" />
                <text x="120" y="284" className="fill-surface-paper/70 text-[10px]" textAnchor="middle">{t('ontology.svg.business')}</text>
                
                <circle cx="320" cy="280" r="26" className="fill-[#362f29] stroke-node-blue/50" />
                <text x="320" y="284" className="fill-node-blue/90 text-[10px]" textAnchor="middle">{t('ontology.svg.idea')}</text>
              </svg>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
              {t('ontology.title1')}<br />
              {t('ontology.title2')}
            </h2>
            <p className="text-lg text-surface-paper/70 leading-relaxed mb-10">
              {t('ontology.desc')}
            </p>
            
            <div className="space-y-6">
              {[
                { icon: GitCommit, text: t('ontology.l1') },
                { icon: Focus, text: t('ontology.l2') },
                { icon: Maximize, text: t('ontology.l3') }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-paper/10 flex items-center justify-center text-surface-paper">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium text-surface-paper/90">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
