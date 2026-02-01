import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> { 
  const { slug } = await params;
  const currentTag = slug[0] === "all" ? undefined : slug[0];
  return {
    title: currentTag,
    description: `Filter notes by tag:${currentTag}`,
    openGraph: {
      title: currentTag,
      description: `Filter notes by tag:${currentTag}`,
      url: `/notes/filter/${slug.join('/')}`,
      siteName: "NoteHub",
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt:currentTag
      }],
      type:"article"
    },
    twitter: {
      card: "summary_large_image",
      title: currentTag,
      description: `Filter notes by tag:${currentTag}`,
      images:[" https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
    }
  }
};

const NotesByTagPage = async ({ params }: Props) => {
  const { slug } = await params;
  const currentTag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag: currentTag, page: 1, search: "" }],
    queryFn: () => fetchNotes({ tag: currentTag, page: 1, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={currentTag} />
    </HydrationBoundary>
  );
};

export default NotesByTagPage;
