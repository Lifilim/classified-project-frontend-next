"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Card, Image, Text, Badge, Stack, Loader } from "@mantine/core";
import { cardsApi } from "@/shared/api/cardsApi";
import type { Service } from "@/shared/types/service";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='300'%3E%3Crect width='700' height='300' fill='%234e5174'/%3E%3Ctext x='50%25' y='50%25' fill='%23e8eae7' font-size='24' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!id) return;
        const data = await cardsApi.getOne(id);
        setService(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <Box ta="center" mt="xl">
        <Loader />
      </Box>
    );
  }

  if (!service) {
    return <Text ta="center">Карточка не найдена</Text>;
  }

  return (
    <Box w="clamp(300px, 80vw, 700px)" mx="auto" pt="7vh">
      <Card shadow="md" p="lg" radius={0} withBorder>
        <Card.Section>
          <Image src={service.imageUrl || PLACEHOLDER} height={300} alt={service.title} />
        </Card.Section>
        <Stack mt="md">
          <Badge radius={0} color="var(--surface-color)">
            {service.category}
          </Badge>
          <Text fw={900} size="xl" tt="uppercase" c="var(--secondary-color)">
            {service.title}
          </Text>
          <Text c="var(--neutral-color)">{service.description}</Text>
          <Text fw={900} size="xl" c="var(--accent-color)">
            {service.price} ₽
          </Text>
        </Stack>
      </Card>
    </Box>
  );
}
