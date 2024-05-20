"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`absolute flex items-center justify-center w-screen transition-all duration-1500 ${
          load ? "bg-background h-full" : "bg-background h-20 top-10 left-0"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-1000 ${
            load ? "animate-pulse gap-2" : "gap-2"
          }`}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
            alt="F1 Logo"
            width={load ? 300 : 130}
            height={load ? 300 : 130}
            className="transition-all duration-1000"
          />
          <span
            className={`font-bold transition-all duration-1000 ${
              load ? "text-5xl" : "text-3xl"
            }`}
          >
            Próxima Corrida
          </span>
        </div>
      </div>
    </>
  );
}
