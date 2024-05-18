// CountdownWrapper.tsx
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CountdownServerComponent = dynamic(() => import("./temp"), {
  ssr: false,
});

const CountdownWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <CountdownServerComponent />;
  }

  return null;
};

export default CountdownWrapper;
