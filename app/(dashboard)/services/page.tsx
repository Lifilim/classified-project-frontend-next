"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
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

const ServicesPage = observer(function ServicesPage() {
  const { servicesStore } = useStore();

  useEffect(() => {
    servicesStore.async.fetchAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (servicesStore.state.loading) {
    return <Center h="100vh">Loading...</Center>;
  }

  const categories = [...new Set(servicesStore.state.items.map((s) => s.category))];

  return (
    <Container size="xl" py="xl">
      <Title order={2} tt="uppercase" c="var(--secondary-color)" mb="lg">
        Категории услуг
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {categories.map((cat) => {
          const count = servicesStore.state.items.filter((s) => s.category === cat).length;
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
});

export default ServicesPage;
