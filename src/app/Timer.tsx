"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  initialTargetDate: string;
  eventName: string;
  raceName: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  initialTargetDate,
  eventName,
  raceName,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const calculateTimeLeft = (): TimeLeft | undefined => {
        const difference = +new Date(initialTargetDate) - +new Date();
        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        return undefined;
      };

      // Initial calculation
      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isClient, initialTargetDate]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-4xl">{raceName}</h2>
      <h2 className="font-bold text-text_primary text-4xl">{eventName}</h2>
      <h2 className="font-bold text-2xl">Começa em</h2>
      <div className="flex w-full items-center justify-center p-2 gap-2">
        {timeLeft ? (
          <>
            <div className="flex flex-col bg-bg_label w-24 h-32 justify-center rounded-xl items-center content-center">
              <span className="text-3xl">{timeLeft.days}</span>
              <span>Dias</span>
            </div>
            <div className="flex flex-col bg-bg_label w-24 h-32 justify-center rounded-xl items-center content-center">
              <span className="text-3xl">{timeLeft.hours}</span>
              <span>Horas</span>
            </div>
            <div className="flex flex-col bg-bg_label w-24 h-32 justify-center rounded-xl items-center content-center">
              <span className="text-3xl">{timeLeft.minutes}</span>
              <span>Minutos</span>
            </div>
            <div className="flex flex-col bg-bg_label w-24 h-32 justify-center rounded-xl items-center content-center">
              <span className="text-3xl">{timeLeft.seconds}</span>
              <span>Segundos</span>
            </div>
          </>
        ) : (
          <span>Event has started!</span>
        )}
      </div>
    </div>
  );
};
