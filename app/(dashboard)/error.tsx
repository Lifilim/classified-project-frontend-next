"use client";

"use client";

import { Flex, Title, Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Flex h="100vh" direction="column" align="center" justify="center" gap="md">
      <Title order={2} c="var(--accent-color)">
        Произошла ошибка
      </Title>
      <Title order={4} c="var(--neutral-color)">
        {error.message || "Что-то пошло не так"}
      </Title>
      <Button
        onClick={() => router.push("/")}
        variant="gradient"
        gradient={{ from: "var(--secondary-color)", to: "var(--accent-color)", deg: 90 }}
      >
        на главную
      </Button>
    </Flex>
  );
}
