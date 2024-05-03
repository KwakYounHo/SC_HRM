import { createClient } from "@/utils/supabase/server";

export async function IsLogin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = (await supabase.rpc("user_name_return", { id: user?.id }))
    .data;

  return <>{userName && <p>{userName}님 안녕하세요!</p>}</>;
}
