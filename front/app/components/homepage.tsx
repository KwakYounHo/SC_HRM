import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { timeZoneCalculate, type Result } from "@/utils/cal/timeCode";

type timeZoneCalculateResult = (Result | null)[];

export default async function Home(): Promise<JSX.Element> {
  "use server";

  const supabase = createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // no-login
  if (!currentUser) {
    return (
      <div className={"flex flex-col gap-4 justify-center items-center"}>
        <p>
          You must <strong className={"text-2xl"}>login</strong> to use this
          website
        </p>
        <button>
          <Link
            href={"/login"}
            className={
              "px-32 py-2 border rounded-md hover:bg-slate-500 hover:text-white transition-colors"
            }
          >
            Login
          </Link>
        </button>
      </div>
    );
  }

  const currentDate = new Date().toJSON();
  const todayDate = currentDate.slice(0, 10);

  const { data: userName } = await supabase.rpc("user_name_return", {
    id: currentUser.id,
  });

  const commuteTimeRecord = async (): Promise<timeZoneCalculateResult> => {
    const { data: commuteStatus } = await supabase
      .from("commute")
      .select("arrival, departure")
      .eq("user_id", currentUser.id)
      .gte("arrival", `${todayDate}T00:00:00`)
      .lt("arrival", `${todayDate}T23:59:59`);

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

  // login
  return (
    <main className={"w-full px-4 flex flex-col gap-4"}>
      <p className={"text-2xl font-black"}>{userName}'s Dashboard</p>
      <div>
        <a href="#today-commute">
          <p
            id={"today-commute"}
            className={"capitalize text-lg border-b mb-2"}
          >
            #today commute
          </p>
        </a>
        <table className={"border-collapse table-auto w-full"}>
          <thead className={"text-sm"}>
            <tr>
              <th className={"border p-2 bg-slate-200 dark:bg-gray-900"}>
                Commute
              </th>
              <th className={"border p-2 bg-slate-200 dark:bg-gray-900"}>
                Departure
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {(await commuteTimeRecord()).map((element, i) =>
                element ? (
                  <td key={i} className={"border p-2 text-sm text-center"}>
                    {element.hour}:{element.minute}
                  </td>
                ) : (
                  <td key={i} className={"border p-2 text-sm text-center"}>
                    No Record
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
