"use client";

import { Center, Title } from "@mantine/core";

export default function CardDetailError() {
  return (
    <Center h="100vh">
      <Title order={3} c="var(--accent-color)">
        Ошибка загрузки карточки
      </Title>
    </Center>
  );
}
