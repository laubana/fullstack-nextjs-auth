import { useRouter } from "next/navigation";

import styles from "./ProfileForm.module.css";

export default () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");

    try {
      const response = await fetch("/api/auth/change-password", {
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });

      const data = await response.json();

      if (response.ok) {
        router.replace("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label htmlFor="old-password">Old Password</label>
          <input name="oldPassword" type="password" id="old-password" />
        </div>
        <div className={styles.control}>
          <label htmlFor="new-password">New Password</label>
          <input name="newPassword" type="password" id="new-password" />
        </div>
        <div className={styles.action}>
          <button>Change Password</button>
        </div>
      </form>
    </section>
  );
};
