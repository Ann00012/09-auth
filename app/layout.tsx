import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import css from './page.module.css';
import "modern-normalize";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display:'swap'
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Note manager",
  openGraph: {
    title: "NoteHub",
    description: "Note manager",
    url: "/",
    siteName: "NoteHub",
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt:"Note manager"
    }],
    type:'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "NoteHub",
    description: "Note manager",
    images:["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode; 
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main className={css.main}>
            {children}
             {modal}
          </main>
            <Footer />
            </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
