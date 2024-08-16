import styles from "./Home.module.css";

export default () => {
  // Show Link to Login page if NOT auth

  return (
    <section className={styles.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
};
