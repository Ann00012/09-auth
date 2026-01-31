import { type User } from '@/types/user';
import { type Note } from "@/types/note";
import nextServer from '../api';

interface ResponseNoteProps { 
    notes: Note[];
    totalPages: number,
}

interface PostNoteProps { 
  title: string,
  content: string,
  tag:string
}


export interface FetchNotesOptions {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


export const createNote = async (data:PostNoteProps): Promise<Note> => { 
    const response = await nextServer.post<Note>('/notes', data, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    },
    );
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => { 
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
             Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
     return response.data;
}

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = 12,
  tag
}: FetchNotesOptions = {}) => {
  const response = await nextServer.get<ResponseNoteProps>('/notes', {
    params: { search, page, perPage, tag },
    headers: {  Authorization: `Bearer ${ACCESS_TOKEN}` }
  });
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};


export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};


export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

