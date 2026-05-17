"use client";

import { useRouter } from "next/navigation";
import { Box, Button } from "@mantine/core";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box w="clamp(300px, 90vw, 2100px)" mx="auto" mt="xl">
      <h1>404</h1>
      <h2>Not Found :(</h2>
      <br />
      <Button
        onClick={() => router.push("/")}
        variant="gradient"
        gradient={{ from: "var(--secondary-color)", to: "var(--accent-color)", deg: 90 }}
      >
        на главную
      </Button>
    </Box>
  );
}
