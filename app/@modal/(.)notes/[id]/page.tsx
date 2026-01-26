import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { notFound } from 'next/navigation';
import NotePreviewClient from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;
  let note;

  try {
    note = await fetchNoteById(id);
  } catch (error) {
    console.error(error);
    return notFound();
  }

  return (
    <Modal>
      <NotePreviewClient note={note} />
    </Modal>
  );
}