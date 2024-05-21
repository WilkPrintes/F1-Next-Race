// components/CountdownServerComponent.tsx
import { Countdown } from "./Timer";
import datas from "./datas";

const CountdownServerComponent = async () => {
  let targetDate = "";
  let eventName = "";
  let raceName = "";
  let times: { name: string; value: string | null }[] = [];

  interface scheduleItemProps {
    day: string;
    month: string;
    hour: string;
    eventName: string;
    actual: number;
  }

  let selected: number;

  const ScheduleItem = ({
    day,
    month,
    hour,
    eventName,
    actual,
  }: scheduleItemProps) => {
    const bg = actual == selected ? "bg-text_primary" : "bg-bg_label";
    return (
      <div className={`flex ${bg}  p-3 rounded-2xl items-center gap-4`}>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {day}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {month}
          </span>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {eventName}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{hour}</p>
        </div>
      </div>
    );
  };

  const res = await datas();
  if (res && !res.sprint) {
    times = [
      { name: "Treino Livre 1", value: res.tl1 },
      { name: "Treino Livre 2", value: res.tl2 },
      { name: "Treino Livre 3", value: res.tl3 },
      { name: "Qualificação", value: res.quali },
      { name: "Corrida Principal", value: res.race },
    ];
    times.forEach((act, index) => {
      if (act.value && !targetDate) {
        const difference = +new Date(act.value) - +new Date();
        if (difference > 0) {
          targetDate = act.value;
          eventName = act.name;
          raceName = res.name;
          selected = index;
        }
      }
    });
  }

  const mesesAbreviados: { [key: number]: string } = {
    0: "Jan",
    1: "Fev",
    2: "Mar",
    3: "Abr",
    4: "Mai",
    5: "Jun",
    6: "Jul",
    7: "Ago",
    8: "Set",
    9: "Out",
    10: "Nov",
    11: "Dez",
  };

  return (
    <div className="flex items-center">
      <Countdown
        eventName={eventName}
        raceName={raceName}
        initialTargetDate={targetDate}
      />
      <div className="flex flex-col justify-center gap-4 p-3">
        <h2 className="font-bold text-text_primary text-3xl">
          Calendário da Semana
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {times.slice(0, 2).map((item, index) => {
              if (item.value) {
                const dateObj: Date = new Date(item.value);
                return (
                  <ScheduleItem
                    key={index}
                    actual={index}
                    day={dateObj.getDate().toString()}
                    month={mesesAbreviados[dateObj.getMonth()]}
                    hour={dateObj
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .toString()}
                    eventName={item.name}
                  />
                );
              }
              return null;
            })}
          </div>
          <div className="flex gap-2">
            {times.slice(2, 4).map((item, index) => {
              if (item.value) {
                const dateObj: Date = new Date(item.value);
                return (
                  <ScheduleItem
                    key={index + 2}
                    actual={index + 2}
                    day={dateObj.getDate().toString()}
                    month={mesesAbreviados[dateObj.getMonth()]}
                    hour={dateObj
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .toString()}
                    eventName={item.name}
                  />
                );
              }
              return null;
            })}
          </div>
          {times.slice(4).map((item, index) => {
            if (item.value) {
              const dateObj: Date = new Date(item.value);
              return (
                <ScheduleItem
                  key={index + 4}
                  actual={index + 4}
                  day={dateObj.getDate().toString()}
                  month={mesesAbreviados[dateObj.getMonth()]}
                  hour={dateObj
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .toString()}
                  eventName={item.name}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CountdownServerComponent;
