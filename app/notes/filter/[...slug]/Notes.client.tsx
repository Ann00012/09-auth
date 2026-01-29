"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";

import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { NoteList } from "@/components/NoteList/NoteList";
import Loader from "@/app/loading";
import ErrorMessage from "@/app/notes/error";

import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const perPage = 12;
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", debouncedQuery, page, perPage, initialTag],
    queryFn: () =>
      fetchNotes({
        search: debouncedQuery,
        page,
        perPage,
        tag: initialTag,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />

      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={setPage}
          />
        )}
      </header>

      <main>
        {isLoading && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}

        {isError && <ErrorMessage error={error as Error} />}

        {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

        {isSuccess && query !== "" && notes.length === 0 && (
          <p className={css.info}>No notes found...</p>
        )}
      </main>
    </div>
  );
}
