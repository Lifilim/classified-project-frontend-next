"use client";

import { useEffect } from "react";
import { SimpleGrid, Container, Button, Center, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { ServiceCard } from "@/widgets/ServiceCard";
import { cardsApi } from "@/shared/api/cardsApi";

export default function FeedPage() {
  const { servicesStore } = useStore();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      servicesStore.setLoading(true);
      try {
        const data = await cardsApi.getAll();
        servicesStore.setItems(data);
      } catch {
        servicesStore.setError("Не удалось загрузить услуги(((");
      } finally {
        servicesStore.setLoading(false);
      }
    };
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (servicesStore.loading) {
    return <Center h="100vh">Loading...</Center>;
  }

  if (servicesStore.error) {
    return (
      <Center h="100vh">
        <Title order={3} c="var(--accent-color)">
          {servicesStore.error}
        </Title>
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "24px",
          alignItems: "center",
          marginBottom: "2vh",
        }}
      >
        <Button
          onClick={() => router.push("/")}
          h="100%"
          size="compact-md"
          variant="gradient"
          gradient={{ from: "var(--secondary-color)", to: "var(--accent-color)", deg: 90 }}
        >
          на главную
        </Button>
        <Title order={2} tt="uppercase" c="var(--secondary-color)">
          Доступные услуги
        </Title>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {servicesStore.items.map((item) => (
          <ServiceCard key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
