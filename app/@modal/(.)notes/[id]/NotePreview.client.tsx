'use client';

import { Note } from "@/types/note";
import css from './NotePreview.client.module.css';

interface NotePreviewClientProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  return (
    <div className={css.container}>
      <article className={css.item}>
        <header className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </header>
        
        <div className={css.content}>
          {note.content}
        </div>
      </article>
    </div>
  );
}