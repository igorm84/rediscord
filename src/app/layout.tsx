import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Container from "@/components/layout/container";
import CommonLayout from "@/components/layout/common-layout";
import "./globals.css";

const mainFont = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rediscord - Reimaginated Discord app",
  description:
    "A Rediscord is an open-source reimaginated discord in NextJS + TailwindCSS, built by igorpenaque.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className + " dark"}>
        <CommonLayout />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
