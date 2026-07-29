import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '@/assets/logo.png';

export function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface-paper/80 border-b border-surface-amber/30">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-chaerok-600 hover:text-chaerok-800 transition-colors">
          <img src={logoImg} alt="채록 로고" className="w-8 h-8 object-contain" />
          <span className="font-serif font-semibold text-xl tracking-tight">{t('header.title')}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.features')}</Link>
          <Link to="/#ontology" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.ontology')}</Link>
          <Link to="/#pricing" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.pricing')}</Link>
          <Link to="/#faq" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.faq')}</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Link to="/notes"><Button size="sm">{t('header.try')}</Button></Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-ink-muted hover:text-chaerok-600 hover:bg-surface-amber/40 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-surface-paper/95 backdrop-blur-lg border-b border-surface-amber/40 shadow-lg"
          >
            <nav className="flex flex-col px-5 py-4 space-y-3">
              <Link
                to="/#features"
                onClick={closeMenu}
                className="py-2 text-base font-medium text-ink-dark hover:text-chaerok-600 border-b border-surface-amber/20 transition-colors"
              >
                {t('header.nav.features')}
              </Link>
              <Link
                to="/#ontology"
                onClick={closeMenu}
                className="py-2 text-base font-medium text-ink-dark hover:text-chaerok-600 border-b border-surface-amber/20 transition-colors"
              >
                {t('header.nav.ontology')}
              </Link>
              <Link
                to="/#pricing"
                onClick={closeMenu}
                className="py-2 text-base font-medium text-ink-dark hover:text-chaerok-600 border-b border-surface-amber/20 transition-colors"
              >
                {t('header.nav.pricing')}
              </Link>
              <Link
                to="/#faq"
                onClick={closeMenu}
                className="py-2 text-base font-medium text-ink-dark hover:text-chaerok-600 border-b border-surface-amber/20 transition-colors"
              >
                {t('header.nav.faq')}
              </Link>
              <div className="pt-2 sm:hidden">
                <Link to="/notes" onClick={closeMenu} className="w-full"><Button size="sm" className="w-full justify-center">{t('header.try')}</Button></Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
