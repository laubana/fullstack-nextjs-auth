import { useSession } from "next-auth/react";

import UserProfile from "../../components/UserProfile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !data) {
      router.push("/");
    }
  }, [data, status]);

  return (
    <>
      {status === "loading" || (status !== "loading" && !data) ? null : (
        <UserProfile />
      )}
    </>
  );
};
