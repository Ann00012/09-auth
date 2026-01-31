import NoteForm from "@/components/NoteForm/NoteForm";
import css from './CreateNote.module.css';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "form for creating note",
  openGraph: {
    title: "Create note",
    description: "form for creating note",
    url: "/notes/action/create",
    siteName: "NoteHub",
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt:"form for creating note"
    }],
    type:'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Create note",
    description: "form for creating note",
    images:["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
  }
};


export default function  CreateNote(){
    return (
        <main className={css.main}>
 <div className={css.container}>
 <h1 className={css.title}>Create note +</h1>
    <NoteForm />
 </div>
</main>
    )
}


