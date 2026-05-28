"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Card, Image, Text, Badge, Stack, Loader, Button, Modal, Group } from "@mantine/core";
import { cardsApi } from "@/shared/api/cardsApi";
import { useStore } from "@/shared/store";
import { useRouter } from "next/navigation";

import type { Service } from "@/shared/types/service";

const PLACEHOLDER = "/no-img.svg";

export default function ServiceDetailsPage() {
  // throw new Error("Тестовая ошибка card");
  const params = useParams();
  const id = params.id as string;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const { userStore, servicesStore } = useStore();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const isOwner = service?.userId === userStore.state.user?.id;

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
      <Card shadow="md" p="lg" radius={0} withBorder 
            bg="var(--base-color)">
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
          {isOwner && (
            <>
              <Button color="var(--accent-color)" onClick={() => setOpened(true)}>
                Удалить
              </Button>
              <Modal opened={opened} onClose={() => setOpened(false)} 
                     title="Подтверждение" 
                     styles={{ header: { backgroundColor: 'var(--surface-color)' },
                              body:   { backgroundColor: 'var(--surface-color)' },
                              title:  { color: 'var(--antitext-color)' }, 
                            }}>
                {/* <Group bg="var(--surface-color)"> */}
                  <Text c='var(--antitext-color)'>Вы точно хотите безвозвратно удалить объявление?</Text>
                  <Group mt="md" justify="space-between">
                    <Button color="var(--accent-color)" c="var(--text-color)" 
                            onClick={async () => {
                            await servicesStore.async.deleteCard(service.id);
                            router.push("/feed");
                          }}>
                      Удалить
                    </Button>
                    <Button color="var(--neutral-color)" c="var(--text-color)"
                            onClick={() => setOpened(false)}>
                      Отмена
                    </Button>
                  </Group>
                {/* </Group> */}
              </Modal>
            </>
          )}
        </Stack>
      </Card>
    </Box>
  );
}
