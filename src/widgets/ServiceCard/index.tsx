"use client";

import { Card, Image, Text, Group, Button, Badge, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import type { Service } from "@/shared/types/service";

const PLACEHOLDER = "/404.png";

export function ServiceCard(props: Service) {
  // throw new Error("Тестовая ошибка ServiceCard");
  const router = useRouter();
  // console.log(props.imageUrl);

  return (
    <Card
      shadow="sm"
      p="lg"
      radius={0}
      withBorder
      bg="var(--base-color)"
      style={{ borderColor: "var(--neutral-color)", display: "flex", flexDirection: "column" }}
    >
      <Card.Section>
        <Image
          src={props.imageUrl || PLACEHOLDER}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes("404.png")) img.src = PLACEHOLDER;
          }}
          h={160}
          alt={props.title}
        />
      </Card.Section>

      <Stack mt="md" gap="xs" style={{ flex: 1 }}>
        <Group justify="space-between">
          <Text fw={700} tt="uppercase" c="var(--secondary-color)" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
            {props.title}
          </Text>
          <Badge color="var(--surface-color)" radius={0} variant="filled">
            {props.category}
          </Badge>
        </Group>

        <Text size="sm" c="var(--neutral-color)" lineClamp={2}>
          {props.description}
        </Text>

        <Text fw={900} size="xl" mt="auto" c="var(--accent-color)">
          {props.price} ₽
        </Text>
      </Stack>

      <Button
        fullWidth
        mt="md"
        radius={0}
        bg="var(--secondary-color)"
        onClick={() => router.push(`/card/${props.id}`)}
        c="var(--text-color)"
        style={{ alignSelf: "flex-end"}}
      >
        Подробнее
      </Button>
    </Card>
  );
}
