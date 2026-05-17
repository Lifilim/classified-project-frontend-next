"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { authApi } from "@/shared/api/authApi";
import { Center, Loader } from "@mantine/core";

export const AuthWrapper = observer(function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userStore } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(pathname);

  useEffect(() => {
    const restoreSession = async () => {
      if (userStore.token && !userStore.user) {
        try {
          const user = await authApi.getProfile();
          userStore.setUser(user);
        } catch {
          userStore.logout();
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loading && !isPublic && !userStore.isAuth) {
      router.push("/login");
    }
  }, [loading, isPublic, userStore.isAuth, router]);

  if (loading && userStore.token && !userStore.user) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (!loading && !isPublic && !userStore.isAuth) {
    return null;
  }

  return <>{children}</>;
});
