// components/CountdownServerComponent.tsx
import { Countdown } from "./Timer";
import datas from "./datas";

const CountdownServerComponent = async () => {
  let targetDate = "";
  let eventName = "";
  let raceName = "";

  const res = await datas();
  res?.forEach((actual) => {
    const { sprint } = actual;
    if (!sprint) {
      const { tl1, tl2, tl3, quali, race } = actual;
      const times = [
        { name: "Treino Livre 1", value: tl1 },
        { name: "Treino Livre 2", value: tl2 },
        { name: "Treino Livre 3", value: tl3 },
        { name: "Qualificação", value: quali },
        { name: "Corrida Principal", value: race },
      ];
      times.forEach((act) => {
        const difference = +new Date(act.value) - +new Date();
        if (difference > 0) {
          targetDate = act.value;
          eventName = act.name;
          raceName = actual.name;
        }
      });
    }
  });

  return (
    <Countdown
      eventName={eventName}
      raceName={raceName}
      initialTargetDate={targetDate}
    />
  );
};

export default CountdownServerComponent;
