import { type User } from '@/types/user';
import { cookies } from 'next/headers';
import { type Note } from "@/types/note";
import nextServer from './api';

interface ResponseNoteProps { 
    notes: Note[];
    totalPages: number,
}

export const fetchServerNotes = async (params = {}) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<ResponseNoteProps>('/notes', {
    params, 
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    return res.data.success;
};


export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};