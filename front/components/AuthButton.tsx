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

    return data;
  };

  const signOut = async (): Promise<void> => {
    "use server";

    const signOutClient = createClient();
    await signOutClient.auth.signOut();

    return redirect("/");
  };

  return user ? (
    <div className={"flex items-center gap-3"}>
      <p>{userName()}님 안녕하세요!</p>
      <form action={signOut}>
        <button
          className={
            "border rounded-md py-1 px-2 hover:bg-slate-700 hover:text-white"
          }
        >
          logout
        </button>
      </form>
    </div>
  ) : (
    <Link href={"/login"}>
      <button
        className={
          "border rounded-md py-1 px-2 hover:bg-slate-700 hover:text-white"
        }
      >
        Login
      </button>
    </Link>
  );
}
