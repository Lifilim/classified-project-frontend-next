"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from "@mantine/core";
import { useStore } from "@/app/store";

export default function SignInPage() {
  const { userStore } = useStore();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassw] = useState("");

  const handleLogin = async () => {
    try {
      await userStore.async.login({ phone, password });
      router.push("/feed");
    } catch {
      console.error("Login failed");
    }
  };

  return (
    <Box w="clamp(300px, 80vw, 600px)" mx="auto" pt="7vh">
      <Stack gap="md">
        <InputBase
          label="Your phone"
          placeholder="Your phone"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Input password"
          value={password}
          onChange={(event) => setPassw(event.currentTarget.value)}
        />
        <Button onClick={handleLogin} variant="filled" color="var(--neutral-color)">
          Войти
        </Button>

        <Anchor onClick={() => router.push("/register")} c="var(--secondary-color)" style={{ cursor: "pointer" }}>
          Нет аккаунта? тыкай сюды
        </Anchor>
      </Stack>
    </Box>
  );
}
