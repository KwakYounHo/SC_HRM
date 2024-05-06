import { Header } from "@/components/header";

export default async function Index() {
  return (
    <div className={"w-full"}>
      <Header />
      <main className={"flex flex-col items-center h-screen"}>
        <p className={"my-auto"}>Hello :)</p>
      </main>
    </div>
  );
}
