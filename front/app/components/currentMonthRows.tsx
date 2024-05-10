import { timeZoneCalculate } from "@/utils/cal/timeCode";

type Props = {
  arrival: string;
  departure: string | null;
} | null;

type IntervalResult = {
  hour: number;
  minute: number;
  second: number;
} | null;

export function CurrentMonthRows({ ...props }: Props): JSX.Element {
  const defaultClassName = "border p-2";
  const arrivalRow = timeZoneCalculate(props.arrival);
  const departureRow = props.departure
    ? timeZoneCalculate(props.departure)
    : null;

  const commuteInterval = (): IntervalResult => {
    const arrivalTime = new Date(props.arrival).getTime();
    const departureTime = props.departure
      ? new Date(props.departure).getTime()
      : null;
    if (departureTime) {
      const interval = departureTime - arrivalTime;
      const result = {
        hour: Math.floor(interval / (1000 * 60 * 60)),
        minute: Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60)),
        second: Math.floor((interval % (1000 * 60)) / 1000),
      };
      return result;
    } else {
      return null;
    }
  };
  const rowData = {
    date: { day: arrivalRow.day, weekday: arrivalRow.weekday },
    commute: `${arrivalRow.hour}:${arrivalRow.minute}`,
    departure: props.departure
      ? `${departureRow?.hour}:${departureRow?.minute}`
      : null,
    interval: commuteInterval(),
  };

  return (
    <tr className={"text-center text-sm md:text-base"}>
      <td className={defaultClassName}>
        {rowData.date.day} ({rowData.date.weekday})
      </td>
      <td className={defaultClassName}>{rowData.commute}</td>
      {rowData.departure ? (
        <td className={defaultClassName}>{rowData.departure}</td>
      ) : (
        <td className={`${defaultClassName} text-gray-400`}>No data</td>
      )}
      {rowData.interval ? (
        <td className={defaultClassName}>
          <p className={"inline-block"}>{rowData.interval.hour} Hour</p>
          {" / "}
          <p className={"inline-block"}>{rowData.interval.minute} Minute</p>
        </td>
      ) : (
        <td className={`${defaultClassName} text-gray-400`}>No data</td>
      )}
    </tr>
  );
}
