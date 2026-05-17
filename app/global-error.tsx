"use client";

import { Button, Title } from "@mantine/core";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, backgroundColor: "var(--base-color, #e8eae7)" }}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Title order={2} style={{ color: "var(--accent-color, #a40033)" }}>
            Критическая ошибка
          </Title>
          <Title order={4} style={{ color: "var(--neutral-color, #4e5174)" }}>
            {error.message || "Что-то пошло не так"}
          </Title>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="gradient"
            gradient={{ from: "var(--secondary-color)", to: "var(--accent-color)", deg: 90 }}
          >
            на главную
          </Button>
        </div>
      </body>
    </html>
  );
}
