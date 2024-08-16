import { useRouter } from "next/navigation";

import styles from "./ProfileForm.module.css";

export default () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newPassword = formData.get("newPassword");
    const oldPassword = formData.get("oldPassword");

    try {
      const response = await fetch("/api/auth/change-password", {
        body: JSON.stringify({ newPassword, oldPassword }),
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input name="newPassword" type="password" id="new-password" />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input name="oldPassword" type="password" id="old-password" />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};
