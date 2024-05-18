import Header from "@/components/header";
import Footer from "@/components/footer";
import { ComponentProps } from "react";
import Link from "next/link";

type Props = ComponentProps<"div">;

export default function AdminLayout({ children, ...props }: Props) {
  return (
    <div className={"w-full"}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
