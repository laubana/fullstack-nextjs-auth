import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import styles from "./Header.module.css";

export default () => {
  const { data, status } = useSession();

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {status !== "loading" && !data ? (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          ) : null}
          {data ? (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          ) : null}
          {data ? (
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};
