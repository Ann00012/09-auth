// app/notes/error.tsx

'use client';

import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  useEffect(() => {
    toast.error(message);
  }, [message]);
  return null;
}
