import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Auth",
  description: "Authentication page",
};

const inter = Inter({ subsets: ["latin"] });

const authenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/">
      <html lang="en">
        <body
          className={`${inter.className} bg-black h-screen w-full flex items-center justify-center `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default authenticationLayout;
