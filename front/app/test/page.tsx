import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SubmitButton from "./submitButton";
import { LogoutButton } from "./logoutButton";

const Test: ({
  searchParams,
}: {
  searchParams: {
    message: string;
  };
}) => Promise<JSX.Element> = async ({ searchParams }) => {
  // function
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as String;
    const role = formData.get("role") as String;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          user_name: username,
          role,
        },
      },
    });

    if (error) {
      console.error(error);
      redirect("/test?message=something wrong");
    }

    return redirect("/test?message=check email");
  };

  const login = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return redirect("/test?message=something wrong with login");
    } else {
      return redirect("/");
    }
  };

  return (
    <div className={"w-1/4 h-screen flex flex-col items-center"}>
      <form className={"flex flex-1 flex-col animate-in"}>
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="example@example.com" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="*********"
          required
        />
        <label htmlFor={"username"}>User name</label>
        <input name="username" placeholder="User name" required />
        <label htmlFor={"role"}>Role</label>
        <select name={"role"} title={"role"}>
          <option value="editor">Editor</option>
          <option value="interpreter">Interpreter</option>
          <option value="manager">Manager</option>
        </select>
        <SubmitButton pendingText={"실험중"} formAction={signUp}>
          회원가입
        </SubmitButton>
        {searchParams?.message && (
          <p className={"w-full p-4 text-red-300 text-center"}>
            {searchParams.message}
          </p>
        )}
      </form>
      <form className={"flex flex-1 flex-col animate-in"}>
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="example@example.com" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="*********"
          required
        />
        <SubmitButton pendingText={"로그인 중"} formAction={login}>
          로그인
        </SubmitButton>
      </form>
      <form className={"flex flex-1 flex-col animate-in"}>
        <LogoutButton />
      </form>
    </div>
  );
};
export default Test;
