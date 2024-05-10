import { Header } from "@/components/header";
import Homepage from "@/app/components/homepage";
import Footer from "@/components/footer";

export default function Index() {
  return (
    <div className={"w-full"}>
      <Header />
      <main
        className={
          "flex-1 flex flex-col items-center min-h-screen justify-center container mx-auto animate-in"
        }
      >
        <Homepage />
      </main>
      <Footer />
    </div>
  );
}
