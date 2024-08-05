import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "STUDIO CLIP HRM",
  description: "This Webpage for HRM in STUDIO CLIP / made by JUNO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
