import css from "./page.module.css"
import { Metadata } from 'next';
import NotFoundRedirect from "@/components/NotFoundRedirect/NotFoundRedirect";

export const metadata: Metadata = {
  title: "Page not found",
  description: "the page does not exist",
  openGraph: {
    title: "Page not found",
    description: "the page does not exist",
    url: "/404",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "page not  found"
      }
    ],
    type:"article"
  },
  twitter: {
    card: 'summary_large_image',
    title: "Page not found",
    description: "the page does not exist",
    images:["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  }
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <NotFoundRedirect />
     <h1 className={css.title}>404 - Page not found</h1>
<p className={css.descriptionNotFound}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound
