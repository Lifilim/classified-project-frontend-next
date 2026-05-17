"use client";

import { Container, Title, Text, Center, Stack } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

export default function FavoritesPage() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="lg" mt="20vh">
        <IconHeart size={64} color="var(--accent-color)" />
        <Title order={2} tt="uppercase" c="var(--secondary-color)">
          Избранное
        </Title>
        <Text ta="center" c="var(--neutral-color)">
          Здесь будут отображаться избранные объявления.
          <br />
          Чтобы добавить объявление в избранное, нажмите на значок сердечка.
        </Text>
      </Stack>
    </Container>
  );
}
