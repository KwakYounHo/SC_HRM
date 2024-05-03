import { createClient } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const dateTime = new Date();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  // const { data: userData, error } = await supabase
  //   .from("commute")
  //   .insert([{ user_id: user.id, arrival: dateTime }])
  //   .select();

  // const { data: userData, error } = await supabase.from("commute").select("*");

  const { data: userData, error } = await supabase.rpc("commute_record", {
    user_id: user.id,
    time_data: dateTime,
  });

  if (error) {
    console.error(error);
    return redirect("/test?message=insert failed");
  }

  console.log(userData);

  return redirect("/");
}
