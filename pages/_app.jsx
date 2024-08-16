import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import Header from "../layouts/Header";

export default ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};
