"use client";

import { Center, Title } from "@mantine/core";

export default function FeedError() {
  return (
    <Center h="100vh">
      <Title order={3} c="var(--accent-color)">
        Ошибка загрузки услуг
      </Title>
    </Center>
  );
}
