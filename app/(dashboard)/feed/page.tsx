"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SimpleGrid, Container, Button, Center, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useStore } from "@/shared/store";
import { ServiceCard } from "@/widgets/ServiceCard";

const FeedPage = observer(function FeedPage() {
  // throw new Error("Тестовая ошибка feed");
  const { servicesStore } = useStore();
  const router = useRouter();

  useEffect(() => {
    servicesStore.async.fetchAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (servicesStore.state.loading) {
    return <Center h="100vh">Loading...</Center>;
  }

  if (servicesStore.state.error) {
    return (
      <Center h="100vh">
        <Title order={3} c="var(--accent-color)">
          {servicesStore.state.error}
        </Title>
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl" mt="3vh">
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
          c="var(--base-color)"
        >
          на главную
        </Button>
        <Title order={2} tt="uppercase" c="var(--secondary-color)">
          Доступные услуги
        </Title>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" verticalSpacing="lg">
        {servicesStore.state.items.map((item) => (
          <ServiceCard key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </Container>
  );
});

export default FeedPage;
