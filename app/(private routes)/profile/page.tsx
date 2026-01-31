import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { getServerMe } from '@/lib/api/serverApi';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
  openGraph: {
    title: "Profile",
    description: "Profile",
    url: "/",
    siteName: "NoteHub",
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt:"Profile"
    }],
    type:'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Profile",
    description: "Profile",
    images:["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
  }
};



const Profile = async () => {
  const user = await getServerMe();

    
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={ user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;

