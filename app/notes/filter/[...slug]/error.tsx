
'use client';

import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorMessageProps {
  error: Error;
}

export default function Error({ error }: ErrorMessageProps) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div >
   <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}
