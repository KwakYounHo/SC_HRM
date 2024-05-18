import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminMain from "@/app/admin/adminMain";

export default async function Admin(): Promise<JSX.Element> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  } else {
    const { data: accessLevel } = await supabase
      .from("users")
      .select("access_level")
      .eq("user_id", user.id);
    if (!accessLevel) {
      return redirect("/");
    } else {
      if (accessLevel[0].access_level > 3) {
        return (
          <div
            className={
              "flex-1 flex flex-col items-center min-h-screen justify-center container mx-auto animate-in"
            }
          >
            <AdminMain supabase={supabase} />
          </div>
        );
      } else {
        return redirect("/");
      }
    }
  }
}
