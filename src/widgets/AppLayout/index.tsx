"use client";

import { observer } from "mobx-react-lite";
import { useStore } from "@/shared/store";
import { useRouter, usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Button, Drawer } from "@mantine/core";
import { useEffect, useState } from "react";
// import { relative } from "path";

export const AppLayout = observer(function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settingsStore, userStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);  
  
  if (!mounted) {
    return <>{children}</>; 
  }

  const handleTheme = () => {
    settingsStore.sync.toggleTheme();
  };

  const handleLogout = () => {
    userStore.sync.logout();
    router.push("/login");
  };

  const navigate = (path: string) => {
    close();
    router.push(path);
  };

  const curTheme = settingsStore.state.theme;

  const navItems = [
    { label: "Профиль", path: "/profile" },
    { label: "Лента", path: "/feed" },
    { label: "Главная", path: "/" },
    { label: "Создать карточку", path: "/create" },
    { label: "Услуги", path: "/services" },
    { label: "Избранное", path: "/favorites" },
    { label: "О нас", path: "/about" },
  ];

  return (
    <>
      <div style={{ position: "fixed", height: "auto", width:"100%", display: "flex", alignItems: "center", zIndex: "10" }}>
        <Button
          variant="filled"
          radius="xl"
          color="var(--surface-color)"
          size="xs"
          // pos="fixed"
          // top="1vh"
          // left="1vw"
          m="1vh 1vw"
          style={{ zIndex: 10 }}
          onClick={handleTheme}
          c="var(--neutral-color)"
        >
          {curTheme === "light" ? "★" : curTheme === "dark" ? "☀︎" : "✿"}
        </Button>
        <Button
          variant="light"
          color="var(--secondary-color)"
          onClick={handleLogout}
          // pos="fixed"
          // top="10px"
          // right="50px"
          m="1vh 1vw 1vh auto"
          style={{ zIndex: 10 }}
        >
          Выйти
        </Button>
        <Button
          variant="transparent"
          onClick={open}
          size="40px"
          p="0"
          c="var(--secondary-color)"
          // pos="fixed"
          // top="10px"
          // right="10px"
          m="1vh 1vw 1vh"
        >
          ≡
        </Button>
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton
          position="right"
          size="clamp(100px, 62vw, 500px)"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 1,
            color: "#000",
          }}
          styles={{
            content: { backgroundColor: "var(--base-color)", zIndex: "11" },
            header: { backgroundColor: "var(--base-color)" },
            close: { color: "var(--secondary-color)" },
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              w="90%"
              variant={pathname === item.path ? "filled" : "transparent"}
              onClick={() => navigate(item.path)}
              c="var(--secondary-color)"
            >
              {item.label}
            </Button>
          ))}
        </Drawer>
      </div>
      <div style={{ marginTop: 0 }}>{children}</div>
    </>
  );
});
