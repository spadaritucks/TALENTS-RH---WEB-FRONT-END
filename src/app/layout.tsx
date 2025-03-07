import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { ModalProvider } from "@/components/modal/context";
import Modal from "@/components/modal/component";






export const metadata: Metadata = {
  title: "Talents RH",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body>
       
          
          <ModalProvider>
            {children}
            <Modal />
          </ModalProvider>
     


      </body>
    </html>
  );
}
