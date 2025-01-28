import { Noto_Sans_Wancho } from "next/font/google";
import type { Metadata } from "next";
import Provider from "../components/provider";
import "./globals.css";

export const metadata: Metadata = {
   title: "Pinnacle",
   description: "Clone of Bnaking App",
};

const ubuntu = Noto_Sans_Wancho({
   subsets: ["latin"],
   weight: ["400"],
   style: ["normal"],
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={ubuntu.className}>
         <Provider>{children}</Provider>
      </html>
   );
}
