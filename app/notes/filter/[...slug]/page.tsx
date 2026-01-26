import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByTagPage = async ({ params }: Props) => {
  const { slug } = await params;
  const currentTag = slug[0] === "all" ? undefined : slug[0];

  return <NotesClient initialTag={currentTag} />;
};

export default NotesByTagPage;
