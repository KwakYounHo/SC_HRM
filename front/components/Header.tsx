import Link from "next/link";
import AuthButton from "@/components/authButton";

export function Header() {
  return (
    <header
      className={
        "w-full p-2 flex justify-around border-b sticky top-0 bg-background"
      }
    >
      <Link className={"flex flex-col"} href="/">
        <p className={"uppercase font-black text-xl"}>studio clip</p>
        <p className={"uppercase text-sm tracking-[0.55rem]"}>myanmar</p>
      </Link>
      <AuthButton />
    </header>
  );
}
