import dynamic from "next/dynamic";
import Header from "./Header";

const CountdownServerComponent = dynamic(() => import("./temp"), { ssr: true });

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background items-center justify-center">
      <Header />
      <div className="flex flex-col p-6 h-full rounded-3xl bg-foreground">
        <div className="flex flex-col gap-5 p-5 text-center">
          <CountdownServerComponent />
        </div>
      </div>
    </main>
  );
}
