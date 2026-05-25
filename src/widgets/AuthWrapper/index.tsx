"use client";

import { Suspense, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { Center, Loader } from "@mantine/core";
import sitemap from "@/../public/sitemap";

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
      if (userStore.state.token && !userStore.state.user) { // isExistingRoute && 
        try {
          await userStore.async.fetchProfile();
        } catch {
          userStore.sync.logout();
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []); 

  useEffect(() => {
    if (isExistingRoute && !loading && !isPublic && !userStore.state.token) {
      router.push("/login");
    }
  }, [isExistingRoute, loading, isPublic, userStore.state.token, router]);


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
