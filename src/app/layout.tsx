import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import "swiper/css";
import Providers from "./Providers";
import { ListenViewportChanges } from "./MediaQuery";

const mainFont = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rediscord - Reimaginated Discord app",
  description:
    "A Rediscord is an open-source reimaginated discord in NextJS + TailwindCSS, built by slemchik_03",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={mainFont.className + " dark"}>
        <Providers>{children}</Providers>
        <ListenViewportChanges />
      </body>
    </html>
  );
}
