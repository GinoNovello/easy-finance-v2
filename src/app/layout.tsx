import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Footer } from "../components/footer";
import { cn } from "../lib/utils";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Finance",
  description: "Maneja tus finanzas de una forma sencilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "overflow-x-hidden min-h-screen min-w-screen",
          inter.className,
        )}
      >
        <Providers>
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
