import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'ref'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-chaerok-600 focus:ring-offset-2 focus:ring-offset-surface-paper disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-chaerok-600 text-white hover:bg-chaerok-800",
      secondary: "bg-surface-amber text-ink-dark hover:bg-chaerok-100",
      outline: "border border-chaerok-600 text-chaerok-600 hover:bg-surface-amber",
      ghost: "text-ink-dark hover:text-chaerok-600 hover:bg-surface-amber/50",
    };
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg rounded-xl",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
