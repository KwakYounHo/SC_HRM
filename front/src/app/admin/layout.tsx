import Header from "@/components/header";
import Footer from "@/components/footer";
import { ComponentProps } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"w-full"}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
