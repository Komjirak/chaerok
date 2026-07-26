import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImg from '@/assets/logo.png';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface-paper/80 border-b border-surface-amber/30">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-chaerok-600 hover:text-chaerok-800 transition-colors">
          <img src={logoImg} alt="채록 로고" className="w-8 h-8 object-contain" />
          <span className="font-serif font-semibold text-xl tracking-tight">{t('header.title')}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.features')}</Link>
          <Link to="/#ontology" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.ontology')}</Link>
          <Link to="/#faq" className="text-sm font-medium text-ink-muted hover:text-chaerok-600 transition-colors">{t('header.nav.faq')}</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button size="sm">{t('header.try')}</Button>
        </div>
      </div>
    </header>
  );
}
