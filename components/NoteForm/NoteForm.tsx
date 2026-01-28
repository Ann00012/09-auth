"use client";
import { useId } from "react";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useRouter } from 'next/navigation';
import { useMutation } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/stores/NoteStore";

export type NoteFormValues ={
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onCancel?: () => void; 

}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { 
    setDraft({
      ...draft,
      [event.target.name]:event.target.value
    })
  };
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => { 
      clearDraft();
      router.push('/notes/filter/all')
    }
  })
  const router = useRouter();
  const handleCancel = () => router.push('/notes/filter/all');
  const handleSubmit = (formData: FormData) => { 
    const values = Object.fromEntries(formData) as NoteFormValues;
    mutate(values);
  }
  return (
    
    <form action={ handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
          type="text"
          defaultValue={draft?.title}
          onChange={handleChange}
            id={`${fieldId}-title`}
            name="title"
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          defaultValue={draft?.content}
          onChange={handleChange}
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          defaultValue={draft?.tag}
          onChange={handleChange}
            name="tag"
            id={`${fieldId}-tag`}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
          >
            Create note
          </button>
        </div>
      </form>
    
  );
}