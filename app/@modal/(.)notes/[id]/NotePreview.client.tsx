"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Loader from "./loading";
import css from "./NotePreview.client.module.css";
import ErrorMessage from "./error";
import Modal from "@/components/Modal/Modal";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <Loader />
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <ErrorMessage error={error as Error} />
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.notFoundWrapper}>
          <h3>Note Not Found</h3>
          <p >
            The note you are looking for might have been deleted or moved.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <article className={css.item}>
          <header className={css.header}>
            <h2 className={css.title}>{note.title}</h2>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
          </header>

          <div className={css.content}>{note.content}</div>
        </article>
      </div>
    </Modal>
  );
}
