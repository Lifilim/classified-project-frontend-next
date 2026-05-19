"use client";

import { Suspense, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { authApi } from "@/shared/api/authApi";
import { Center, Loader } from "@mantine/core";
import sitemap from "../../app/sitemap";

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
  const [mounted, setMounted] = useState(false);
  
  const allRoutes = sitemap();
  const isExistingRoute = allRoutes.includes({url: pathname});

  
  useEffect(() => {
    setMounted(true); // восстановление сессии
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      if (isExistingRoute && userStore.token && !userStore.user) {
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
  }, []); 

  useEffect(() => {
    if (isExistingRoute && !loading && !isPublic && !userStore.token) {
      router.push("/login");
    }
  }, [isExistingRoute, loading, isPublic, userStore.token, router]);


  if (!mounted) return <>{children}</>;
  // if (userStore.token && !userStore.user) {
  //   return <Center h="100vh"><Loader /></Center>;
  // }

  if (loading) { // && userStore.token && !userStore.user) {
    // console.log("Auth Suspense");
    return (
      // <Suspense fallback={<Loader />}></Suspense>
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }
  // if (!isPublic && !userStore.isAuth) return null;

  // if (!loading && !isPublic && !userStore.isAuth) {
  //   return null;
  // }

  // console.log("Auth glob");
  return <>{children}</>;
});
