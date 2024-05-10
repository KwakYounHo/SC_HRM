import { Database } from "@/lib/supabase";
import { type Result } from "@/utils/cal/timeCode";
import { CurrentMonthRows } from "@/app/components/currentMonthRows";
import type { SupabaseClient, User } from "@supabase/supabase-js";

type Props = {
  supabase: SupabaseClient<Database>;
  user: User;
  todayDate: Result;
};

export default async function CurrentMonthCommute({
  supabase,
  user,
  todayDate,
}: Props): Promise<JSX.Element> {
  const forQueryDate = `${todayDate.year}-${todayDate.month}`;
  const tableColumn = ["date", "commute", "departure", "working hour"];

  const { data } = await supabase
    .from("commute")
    .select("arrival, departure")
    .eq("user_id", user.id)
    .gte("arrival", `${forQueryDate}-01T00:00:00+06:30`)
    .lt("arrival", `${forQueryDate}-31T23:59:59+06:30`)
    .order("arrival", { ascending: false });

  let tableRows;

  if (data) {
    tableRows =
      data.length > 0 ? (
        data.map((element, i) => {
          return (
            <CurrentMonthRows
              arrival={element.arrival}
              departure={element.departure}
              key={i}
            />
          );
        })
      ) : (
        <tr>
          <td colSpan={4} className={"text-center border p-2 text-gray-400"}>
            No Record
          </td>
        </tr>
      );
  }

  return (
    <div className={"mb-10"}>
      <p
        id={"current-month-commute"}
        className={"capitalize text-lg border-b mb-2"}
      >
        <a href="#current-month-commute">#current month commute</a>
      </p>
      <table className={"border-collapse table-auto w-full"}>
        <thead>
          <tr>
            {tableColumn.map((element, i) => {
              return (
                <th
                  className={
                    "border capitalize bg-slate-200 dark:bg-gray-900 p-2"
                  }
                  key={i}
                >
                  {element}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
