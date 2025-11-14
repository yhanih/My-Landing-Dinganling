import React from 'react';
import clsx from 'clsx';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'rounded-lg border border-white/5 bg-surface/80 p-6 shadow-card backdrop-blur',
      'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-20px_rgba(15,23,42,0.75)]',
      className,
    )}
    {...props}
  />
));

Card.displayName = 'Card';

export default Card;
