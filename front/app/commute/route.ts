import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const dateTime = new Date();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { error } = await supabase.rpc("commute_record", {
    time_data: dateTime,
  });

  if (error) {
    switch (error.message) {
      case 'new row violates row-level security policy "재직중인 사람만 작업 가능" for table "commute"':
        return redirect("/test?message=access denied");
      case "something error":
        console.error(error);
        return redirect("/test?message=unknown error");
      case "today departure is already recorded":
        return redirect("/test?message=already departure");
      case "please retry after 2minute":
        return redirect("/test?message=please retry after 2minute");
    }
  }

  return redirect("/");
}
