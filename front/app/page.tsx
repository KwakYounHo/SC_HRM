import { Header } from "@/components/header";

export default async function Index() {
  return (
    <div className={"w-full"}>
      <Header />
      <main
        className={
          "flex-1 flex flex-col items-center min-h-screen justify-center"
        }
      >
        <p>Hello :)</p>
      </main>
    </div>
  );
}
