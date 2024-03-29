import { Inter, Roboto } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";
import { Metadata } from "next";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Auth/S",
  description: "Generated by create next app",
  icons: {
    icon: "/letter-s.svg",
  },
};

const authenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/">
      <html lang="en">
        <body
          className={`${inter.className} bg-black h-screen w-full flex flex-col gap-6
           items-center justify-center `}
        >
          <Image src="/letter-s.svg" alt="Socialize" width={50} height={50} />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default authenticationLayout;
