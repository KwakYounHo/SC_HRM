import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import TodayCommute from "@/app/components/todayCommute";
import CurrentMonthCommute from "@/app/components/currentMonthCommute";
import { timeZoneCalculate } from "@/utils/cal/timeCode";
import { TodayEmployeesCommute } from "@/app/components/adminCommuteChart";

export default async function Home(): Promise<JSX.Element> {
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

  // login
  const { data: userName } = await supabase.rpc("user_name_return", {
    id: currentUser.id,
  });
  const currentDate = new Date().toJSON();
  const todayDate = timeZoneCalculate(currentDate);

  const isAdmin = async () => {
    const { data: accessLevel } = await supabase
      .from("users")
      .select("access_level")
      .eq("user_id", currentUser.id);

    if (!accessLevel) {
      return false;
    } else {
      if (accessLevel[0]?.access_level > 3) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <main className={"w-full px-4 flex flex-col gap-4"}>
      <p className={"text-2xl font-black"}>{userName}'s Dashboard</p>
      <TodayCommute
        supabase={supabase}
        user={currentUser}
        todayDate={todayDate}
      />
      <CurrentMonthCommute
        supabase={supabase}
        user={currentUser}
        todayDate={todayDate}
      />
      {(await isAdmin()) ? (
        <TodayEmployeesCommute supabase={supabase} todayDate={todayDate} />
      ) : (
        <></>
      )}
    </main>
  );
}
