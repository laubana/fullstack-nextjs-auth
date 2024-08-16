import styles from "./UserProfile.module.css";

import ProfileForm from "../ProfileForm";

export default () => {
  // Redirect away if NOT auth

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
