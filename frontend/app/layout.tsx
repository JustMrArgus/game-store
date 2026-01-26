import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Store",
  description: "Best Game Store in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white py-3 px-3`}
      >
        <QueryProvider>
          <header className="flex justify-between">
            <p className="font-bold text-2xl">
              <Link href="/">GAME STORE</Link>
            </p>
            <NavigationMenu>
              <NavigationMenuList className="flex gap-5">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-[#353538] text-white hover:bg-[#ffffff59] hover:text-white transition duration-100",
                    )}
                  >
                    <Link href="/auth/login">Log in</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-[#353538] text-white hover:bg-[#ffffff59] hover:text-white transition duration-100",
                    )}
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </header>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
