"use client";

import { useEffect } from "react";
import {
  SimpleGrid,
  Container,
  Title,
  Center,
  Card,
  Text,
  Badge,
  Group,
} from "@mantine/core";
import { useStore } from "@/app/store";
import { cardsApi } from "@/shared/api/cardsApi";

export default function ServicesPage() {
  const { servicesStore } = useStore();

  useEffect(() => {
    const fetch = async () => {
      servicesStore.setLoading(true);
      try {
        const data = await cardsApi.getAll();
        servicesStore.setItems(data);
      } catch {
        servicesStore.setError("Не удалось загрузить услуги");
      } finally {
        servicesStore.setLoading(false);
      }
    };
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (servicesStore.loading) {
    return <Center h="100vh">Loading...</Center>;
  }

  const categories = [...new Set(servicesStore.items.map((s) => s.category))];

  return (
    <Container size="xl" py="xl">
      <Title order={2} tt="uppercase" c="var(--secondary-color)" mb="lg">
        Категории услуг
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {categories.map((cat) => {
          const count = servicesStore.items.filter((s) => s.category === cat).length;
          return (
            <Card key={cat} shadow="sm" p="lg" withBorder bg="var(--base-color)">
              <Group justify="space-between">
                <Text fw={700} c="var(--secondary-color)">
                  {cat}
                </Text>
                <Badge color="var(--surface-color)">{count}</Badge>
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
