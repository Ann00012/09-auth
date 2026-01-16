"use client";
import css from "./notes.module.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import ErrorMessage from "../error";
import Loader from "../loading";
import { NoteList } from "../../components/NoteList/NoteList";
import { useDebounce } from "use-debounce";

export default function App() {
  const perPage = 12;
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page, perPage],
    queryFn: () => fetchNotes(debouncedQuery, page, perPage),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (newQuery: string) => {
    if (newQuery == query) return;
    setQuery(newQuery);
    setPage(1);
  };
  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}
        {isError && <ErrorMessage message="Failed to load notes" />}

        {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

        {isSuccess && query !== "" && notes.length === 0 && (
          <p className={css.info}>No notes found for your search.</p>
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}