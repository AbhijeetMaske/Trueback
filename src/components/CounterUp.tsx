import React, { useEffect, useState } from 'react';
import { animate } from 'motion/react';

interface CounterUpProps {
  value: number;
  duration?: number;
  formatter?: (val: number) => string;
  className?: string;
}

export const CounterUp: React.FC<CounterUpProps> = ({ 
  value, 
  duration = 2, 
  formatter = (val) => val.toLocaleString(undefined, { minimumFractionDigits: 2 }),
  className = ""
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate: (latest) => setDisplayValue(latest),
      ease: "easeOut"
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span className={className}>{formatter(displayValue)}</span>;
};
