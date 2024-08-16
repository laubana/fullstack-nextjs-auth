import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import styles from "./AuthForm.module.css";

export default () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");

    if (isLogin) {
      try {
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (response.ok) {
          router.replace("/profile");
        } else {
          alert("Sign-in failed.");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("/api/auth/sign-up", {
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        const data = await response.json();

        if (response.ok) {
          router.refresh();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input name="email" type="email" id="email" required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input name="password" type="password" id="password" />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleSwitch}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
