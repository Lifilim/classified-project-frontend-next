"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from "@mantine/core";
import { useStore } from "@/shared/store";

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
          size="md"
          label="Your phone"
          c="var(--secondary-color)"
          placeholder="Your phone"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
          className='pw-input'
        />
        <PasswordInput
          size="md"
          label="Password"
          c="var(--secondary-color)"
          placeholder="Input password"
          value={password}
          onChange={(event) => setPassw(event.currentTarget.value)}
          classNames={{ input: 'pw-input' }}
        />
        <Button onClick={handleLogin} variant="filled" color="var(--secondary-color)" c="var(--text-color)">
          Войти
        </Button>

        <Anchor onClick={() => router.push("/register")} c="var(--secondary-color)" style={{ cursor: "pointer" }}>
          Нет аккаунта? тыкай сюды
        </Anchor>
      </Stack>
    </Box>
  );
}
