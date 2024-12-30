import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import { LoadingProvider } from "@/hooks/context/useLoadingContext";
import { SignalRProvider } from "@/hooks/context/useSignalRContext";
import { SessionProvider } from "@/hooks/context/useSessionContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NotificationProvider } from "@/hooks/context/useNotificationContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const codaCaption = localFont({
  src: './fonts/CodaCaption-Heavy.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-coda-caption',
});

export const metadata: Metadata = {
  title: "FooBoo Real time Application",
  description: "Written by June",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${codaCaption.variable} ${geistSans.variable} ${geistMono.variable} antialiased overflow-clip
          relative h-screen w-screen

        `}
      >
        <UserProvider>
          <SignalRProvider>
            <LoadingProvider>
              <SessionProvider>
                <NotificationProvider>

                  {children}
                </NotificationProvider>
              </SessionProvider>

            </LoadingProvider>
          </SignalRProvider>
        </UserProvider>


      </body>
    </html>
  );
}

