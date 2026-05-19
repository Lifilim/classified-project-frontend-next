"use client";

import { Card, Image, Text, Group, Button, Badge, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import type { Service } from "@/shared/types/service";

const PLACEHOLDER = "./404.png";

export function ServiceCard(props: Service) {
  const router = useRouter();
  console.log(props.imageUrl);

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
