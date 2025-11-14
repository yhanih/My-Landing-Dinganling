import React from 'react';
import clsx from 'clsx';
import reavaTheme from '../../../config/theme/reavaTheme.js';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed';

const variantClasses = {
  primary: reavaTheme.buttons.primary,
  secondary: reavaTheme.buttons.secondary,
  outline: reavaTheme.buttons.outline,
  ghost: reavaTheme.buttons.ghost,
};

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-lg',
};

const Button = React.forwardRef(
  ({ as: Component = 'button', className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variantClass = variantClasses[variant] || variantClasses.primary;
    const sizeClass = sizeClasses[size] || sizeClasses.md;

    return (
      <Component
        ref={ref}
        className={clsx(baseClasses, variantClass, sizeClass, className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
