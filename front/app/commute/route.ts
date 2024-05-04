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
    console.error(error);
    return redirect("/test?message=insert failed");
  }

  return redirect("/");
}
