"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  interface CountdownProps {
    targetDate: string;
  }

  const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | undefined>();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient) {
        const calculateTimeLeft = (): TimeLeft | undefined => {
          const difference = +new Date(targetDate) - +new Date();
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

        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [isClient, timeLeft, targetDate]);

    if (!isClient) {
      return null;
    }

    return (
      <div>
        <h2 className=" font-bold text-2xl">Começa em</h2>

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

  const targetDate = "2024-05-17T12:30:00";

  return (
    <main className="flex min-h-screen bg-background items-center justify-between p-5">
      <div className="flex flex-col w-full h-full rounded-3xl bg-foreground ">
        <div className="flex w-full text-center gap-2 p-5 ">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
            alt="F1 Logo"
          />
          <span className=" font-bold text-3xl">Próxima Corrida</span>
        </div>
        <div className="flex flex-col gap-5 w-full  p-5 text-center bg-foreground">
          <h2 className=" font-bold text-4xl">
            Grande Prêmio da Emilia-Romagna
          </h2>
          <h2 className=" font-bold text-3xl">Treino Livre 2</h2>
          <Countdown targetDate={targetDate} />
        </div>
      </div>
    </main>
  );
}
