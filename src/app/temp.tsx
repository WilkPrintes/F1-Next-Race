// components/CountdownServerComponent.tsx
import { Countdown } from "./Timer";
import datas from "./datas";

const CountdownServerComponent = async () => {
  let targetDate = "";
  let eventName = "";
  let raceName = "";

  const res = await datas();
  if (res && !res.sprint) {
    const times = [
      { name: "Treino Livre 1", value: res.tl1 },
      { name: "Treino Livre 2", value: res.tl2 },
      { name: "Treino Livre 3", value: res.tl3 },
      { name: "Qualificação", value: res.quali },
      { name: "Corrida Principal", value: res.race },
    ];
    times.forEach((act) => {
      if (act.value && !targetDate) {
        const difference = +new Date(act.value) - +new Date();
        if (difference > 0) {
          targetDate = act.value;
          eventName = act.name;
          raceName = res.name;
        }
      }
    });
  }

  return (
    <Countdown
      eventName={eventName}
      raceName={raceName}
      initialTargetDate={targetDate}
    />
  );
};

export default CountdownServerComponent;
