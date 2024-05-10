import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { timeZoneCalculate } from "@/utils/cal/timeCode";

export async function GET() {
  const dateTime = timeZoneCalculate(new Date().toJSON());
  const query = `${dateTime.year}-${dateTime.month}-${dateTime.day}T${dateTime.hour}:${dateTime.minute}:${dateTime.second}+06:30`;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { error } = await supabase.rpc("commute_record", {
    time_data: query,
  });

  if (error) {
    switch (error.message) {
      case 'new row violates row-level security policy "재직중인 사람만 작업 가능" for table "commute"':
        return redirect("/?message=access denied");
      case "something error":
        console.error(error);
        return redirect("/?message=unknown error");
      case "today departure is already recorded":
        return redirect("/?message=already departure");
      case "please retry after 2minute":
        return redirect("/?message=please retry after 2minute");
      default:
        return redirect("/?message=unknown error");
    }
  }

  return redirect("/");
}
