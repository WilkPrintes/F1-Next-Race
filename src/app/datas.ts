import { addHours } from "date-fns";

export default async function datas() {
  let round = 8;

  const response = await fetch("http://ergast.com/api/f1/current.json");
  const data = await response.json();
  const round8Data = data.MRData.RaceTable.Races.find(
    (race: { round: string }) => race.round === "8"
  );

  if (round8Data) {
    const adjustTimezone = (dateString: any, timeString: any) => {
      const date = new Date(`${dateString}T${timeString}`);
      return addHours(date, 0).toISOString();
    };

    // Mapeando os dados para o formato desejado
    return {
      id: 8,
      name: round8Data.raceName,
      tl1: adjustTimezone(
        round8Data.FirstPractice.date,
        round8Data.FirstPractice.time
      ),
      sprint: round8Data.Sprint !== undefined,
      squali: round8Data.SprintQualifying
        ? adjustTimezone(
            round8Data.SprintQualifying.date,
            round8Data.SprintQualifying.time
          )
        : null,
      srace: round8Data.Sprint
        ? adjustTimezone(round8Data.Sprint.date, round8Data.Sprint.time)
        : null,
      tl2: adjustTimezone(
        round8Data.SecondPractice.date,
        round8Data.SecondPractice.time
      ),
      tl3: round8Data.ThirdPractice
        ? adjustTimezone(
            round8Data.ThirdPractice.date,
            round8Data.ThirdPractice.time
          )
        : null,
      quali: adjustTimezone(
        round8Data.Qualifying.date,
        round8Data.Qualifying.time
      ),
      race: adjustTimezone(round8Data.date, round8Data.time),
    };
  }

  return null;
}
