import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import ProfileForm from "@components/ProfileForm";

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
        <ProfileForm />
      )}
    </>
  );
};
