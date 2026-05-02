import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownTimerProps {
  expiryDate: Date;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  }>({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +expiryDate - +new Date();
      
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [expiryDate]);

  const TimeUnit = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden bg-brand-indigo/10 rounded-lg w-10 h-10 flex items-center justify-center border border-brand-indigo/20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-lg font-mono font-black text-brand-indigo"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[8px] font-black uppercase tracking-tighter mt-1 opacity-60">{label}</span>
    </div>
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <span className="text-brand-indigo font-black mb-4">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-brand-indigo font-black mb-4">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};
