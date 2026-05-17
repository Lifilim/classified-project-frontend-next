"use client";

import { Card, Image, Text, Group, Button, Badge, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import type { Service } from "@/shared/types/service";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='160'%3E%3Crect width='300' height='160' fill='%234e5174'/%3E%3Ctext x='50%25' y='50%25' fill='%23e8eae7' font-size='16' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export function ServiceCard(props: Service) {
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      p="lg"
      radius={0}
      withBorder
      bg="var(--base-color)"
      style={{ borderColor: "var(--neutral-color)" }}
    >
      <Card.Section>
        <Image
          src={props.imageUrl || PLACEHOLDER}
          height={160}
          alt={props.title}
        />
      </Card.Section>

      <Stack mt="md" gap="xs">
        <Group justify="space-between">
          <Text fw={700} style={{ whiteSpace: "pre-line" }} tt="uppercase" c="var(--secondary-color)">
            {props.title}
          </Text>
          <Badge color="var(--surface-color)" radius={0} variant="filled">
            {props.category}
          </Badge>
        </Group>

        <Text size="sm" c="var(--neutral-color)" lineClamp={2}>
          {props.description}
        </Text>

        <Text fw={900} size="xl" c="var(--accent-color)">
          {props.price} ₽
        </Text>
      </Stack>

      <Button
        fullWidth
        mt="md"
        radius={0}
        bg="var(--secondary-color)"
        onClick={() => router.push(`/card/${props.id}`)}
      >
        Подробнее
      </Button>
    </Card>
  );
}
