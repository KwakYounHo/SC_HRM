import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button">;

export function LogoutButton({ ...props }: Props): JSX.Element {
  const logout = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <button {...props} type="submit" formAction={logout}>
      로그아웃
    </button>
  );
}
