"use client";
import css from "./NoteDetails.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import Loading from "../../loading";
import ErrorMessage from "../../error";
const NoteDetailsClient = () => {

  const { id } = useParams<{ id: string }>();

   const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,

  });



  if (isLoading) return <Loading />;

  if (error || !note) return <ErrorMessage message="Something went wrong"/>;

 const formattedDate = note.updatedAt
    ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
    : `Created at: ${new Date(note.createdAt).toLocaleString()}`;

  return (
   <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
          <h2>{note.title }</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{formattedDate}</p>
	</div>
</div>
  );
};

export default NoteDetailsClient;