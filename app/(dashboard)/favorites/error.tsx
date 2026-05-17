"use client";

import { Center, Title } from "@mantine/core";

export default function FavoritesError() {
  return (
    <Center h="100vh">
      <Title order={3} c="var(--accent-color)">
        Ошибка загрузки избранного
      </Title>
    </Center>
  );
}
