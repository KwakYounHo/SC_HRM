import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton(): Promise<JSX.Element> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = async (): Promise<string> => {
    const { data } = await supabase.rpc("user_name_return", {
      id: user!.id,
    });

    return data!;
  };

  const signOut = async (): Promise<void> => {
    "use server";

    const signOutClient = createClient();
    await signOutClient.auth.signOut();

    return redirect("/");
  };

  const commuteStatus = async (): Promise<JSX.Element> => {
    "use server";

    const userNameSupabase = createClient();
    const {
      data: { user },
    } = await userNameSupabase.auth.getUser();

    if (!user) return <></>;

    const today = new Date().toJSON();
    const todayDate = today.slice(0, 10);

    const { data } = await userNameSupabase
      .from("commute")
      .select("*")
      .eq("user_id", user.id)
      .gte("arrival", `${todayDate}T00:00:00`)
      .lt("arrival", `${todayDate}T23:59:59`);

    if (data) {
      if (data[0]) {
        if (data[0].departure) {
          return (
            <p
              className={
                "border rounded-md text-xs px-1 bg-slate-500 text-white"
              }
            >
              Departure
            </p>
          );
        } else {
          return (
            <p className={"border rounded-md text-xs px-1 bg-green-500/30"}>
              Commute
            </p>
          );
        }
      } else {
        return <p className={"border rounded-md text-xs px-1"}>Pre-commute</p>;
      }
    }

    return <></>;
  };

  return user ? (
    <div className={"flex items-center gap-4"}>
      <p>Hello, {userName()}!</p>
      {commuteStatus()}
      <form action={signOut}>
        <button
          className={
            "border rounded-md py-1 px-2 hover:bg-slate-700 hover:text-white"
          }
        >
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link href={"/login"}>
      <div className={"h-full flex items-center"}>
        <button
          className={
            "border rounded-md py-1 px-2 hover:bg-slate-700 hover:text-white"
          }
        >
          Login
        </button>
      </div>
    </Link>
  );
}
