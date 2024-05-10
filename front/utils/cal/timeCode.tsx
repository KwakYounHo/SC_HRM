export type Result = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  weekday: string;
};

export const timeZoneCalculate = (timeCode: string): Result => {
  const timeFormat = Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Yangon",
    weekday: "short",
  }).format(new Date(timeCode));

  const result = {
    year: timeFormat.slice(11, 15),
    month: timeFormat.slice(8, 10),
    day: timeFormat.slice(5, 7),
    hour: timeFormat.slice(17, 19),
    minute: timeFormat.slice(20, 22),
    second: timeFormat.slice(23, 25),
    weekday: timeFormat.slice(0, 3),
  };

  return result;
};
