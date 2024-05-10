import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase";
import { timeZoneCalculate, type Result } from "@/utils/cal/timeCode";

type Props = {
  supabase: SupabaseClient<Database>;
  user: User;
  todayDate: Result;
};

type timeZoneCalculateResult = (Result | null)[];

export default async function TodayCommute({
  supabase,
  user,
  todayDate,
}: Props) {
  const commuteTimeRecord = async (): Promise<timeZoneCalculateResult> => {
    const forQueryDate = `${todayDate.year}-${todayDate.month}-${todayDate.day}`;
    const { data: commuteStatus } = await supabase
      .from("commute")
      .select("arrival, departure")
      .eq("user_id", user.id)
      .gte("arrival", `${forQueryDate}T00:00:00+06:30`)
      .lt("arrival", `${forQueryDate}T23:59:59+06:30`);

    if (commuteStatus) {
      const arrivalTime = commuteStatus[0]?.arrival
        ? timeZoneCalculate(commuteStatus[0].arrival)
        : null;
      const departureTime = commuteStatus[0]?.departure
        ? timeZoneCalculate(commuteStatus[0].departure)
        : null;
      return [arrivalTime, departureTime];
    } else {
      console.error("arrival Data, departure Data select failed");
      return [null, null];
    }
  };

  const tableColumn = ["commute", "departure"];

  return (
    <div className={"my-10"}>
      <p id={"today-commute"} className={"capitalize text-lg border-b mb-2"}>
        <a href="#today-commute">#today commute</a>
      </p>
      <table className={"border-collapse table-auto w-full"}>
        <thead className={"text-sm"}>
          <tr>
            {tableColumn.map((element, i) => {
              return (
                <th
                  className={
                    "border p-2 bg-slate-200 dark:bg-gray-900 capitalize"
                  }
                  key={i}
                >
                  {element}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {(await commuteTimeRecord()).map((element, i) =>
              element ? (
                <td key={i} className={"border p-2 font-semibold text-center"}>
                  {element.hour}:{element.minute}
                </td>
              ) : (
                <td
                  key={i}
                  className={"border p-2 text-sm text-center text-gray-400"}
                >
                  No Record
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
