import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase";
import { Result, timeZoneCalculate } from "@/utils/cal/timeCode";

type TodayEmployeesCommuteProps = {
  supabase: SupabaseClient<Database>;
  todayDate: Result;
};

type EmployeesMemberProps = {
  supabase: SupabaseClient<Database>;
};

export async function EmployeesMember({
  supabase,
}: EmployeesMemberProps): Promise<JSX.Element> {
  const { data } = await supabase
    .from("users")
    .select("user_name, joindate, position")
    .lte("access_level", 3)
    .order("joindate", { ascending: true });

  const columns = ["user name", "join", "position", "payday"];

  return (
    <div className={"mb-10 animate-in"}>
      <p id={"employees-member"} className={"capitalize text-lg border-b mb-2"}>
        <a href={"#employees-member"}>#current member</a>
      </p>
      <table className={"border-collapse table-fixed w-full"}>
        <thead>
          <tr className={"border"}>
            {columns.map((element, i) => {
              return (
                <th
                  key={i}
                  className={"bg-slate-200 dark:bg-gray-200 p-2 capitalize"}
                >
                  {element}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((element, i) => {
              const joinDate = timeZoneCalculate(element.joindate);
              return (
                <tr key={i} className={"text-sm md:text-base"}>
                  <td className={"border p-2"}>{element.user_name}</td>
                  <td className={"border p-2 text-center"}>
                    {`${joinDate.year}-${joinDate.month}-${joinDate.day}`}
                  </td>
                  <td className={"border p-2 capitalize text-center"}>
                    {element.position}
                  </td>
                  <td className={"border p-2 text-center"}>
                    {Number(joinDate.day) - 1}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className={"text-sm md:text-base text-gray-400"}>
              <td className={"col-span-3 capitalize"}>empty data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export async function TodayEmployeesCommute({
  supabase,
  todayDate,
  ...props
}: TodayEmployeesCommuteProps): Promise<JSX.Element> {
  const forQuery = `${todayDate.year}-${todayDate.month}-${todayDate.day}`;
  const { data: todayEmployeesCommute } = await supabase
    .from("commute")
    .select("user_name, arrival, departure")
    .gte("arrival", `${forQuery}T00:00:00+06:30`)
    .lt("arrival", `${forQuery}T23:59:59+06:30`)
    .order("arrival", { ascending: false });

  const todayEmployeesCommuteColumn: string[] = [
    "No",
    "name",
    "arrival",
    "departure",
  ];

  return (
    <div className={"mb-10 animate-in"}>
      <p
        id={"today-employees-commute"}
        className={"capitalize text-lg border-b mb-2"}
      >
        <a href="#current-month-commute">
          #today employees commute : {`${todayDate.year}-${todayDate.month}`}
        </a>
      </p>
      <table className={"border-collapse table-auto w-full"}>
        <thead>
          <tr className={"border"}>
            {todayEmployeesCommuteColumn.map((element, i) => {
              return (
                <th
                  key={i}
                  className={"bg-slate-200 dark:bg-gray-200 p-2 capitalize"}
                >
                  {element}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {todayEmployeesCommute?.map((element, i) => {
            const arrivalTime = timeZoneCalculate(element.arrival);
            const departureTime = element.departure
              ? timeZoneCalculate(element.departure)
              : null;
            return (
              <tr key={i} className={"text-sm md:text-base"}>
                <td className={"p-2 border"}>{i + 1}</td>
                <td className={"p-2 border"}>{element.user_name}</td>
                <td className={"p-2 border text-center"}>
                  {`${arrivalTime.hour}:${arrivalTime.minute}`}
                </td>
                {departureTime ? (
                  <td
                    className={"p-2 border text-center"}
                  >{`${departureTime.hour}:${departureTime.minute}`}</td>
                ) : (
                  <td className={"p-2 border text-gray-400 text-center"}>
                    No data
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
