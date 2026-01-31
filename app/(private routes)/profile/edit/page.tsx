// app/(private routes)/profile/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import css from "./Edit.module.css";

const EditProfile = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/default_avatar.jpg");

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMe()
      .then((user) => {
        setUserName(user.username ?? "");
        setEmail(user.email ?? "");
        setAvatar(user.avatar ?? "");
      })
      .catch((err) => console.error("Failed to fetch user", err));
  }, []);

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedUser = await updateMe({
        username,
      });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

       
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <p className={css.userEmail}>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
