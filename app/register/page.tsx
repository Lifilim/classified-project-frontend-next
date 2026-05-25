"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from "@mantine/core";
import { useStore } from "@/app/store";

export default function SignUpPage() {
  const { userStore } = useStore();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [passw1, setPassw1] = useState("");
  const [passw2, setPassw2] = useState("");

  const handleRegister = async () => {
    if (passw1 !== passw2) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      await userStore.async.register({ phone, password: passw1, name: "someUserName" });
      router.push("/feed");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box w="clamp(300px, 80vw, 600px)" mx="auto" mt="xl">
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
          value={passw1}
          onChange={(event) => setPassw1(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password again"
          placeholder="Input password again"
          value={passw2}
          onChange={(event) => setPassw2(event.currentTarget.value)}
        />
        <Button onClick={handleRegister} variant="filled" color="var(--secondary-color)">
          Зарегистрироваться
        </Button>

        <Anchor onClick={() => router.push("/login")} c="var(--secondary-color)" ml="auto" style={{ cursor: "pointer" }}>
          Есть аккаунт? тыкай сюды
        </Anchor>
      </Stack>
    </Box>
  );
}
