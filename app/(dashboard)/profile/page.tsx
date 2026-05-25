"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Text, Avatar, Card, Box, Flex, Button, ActionIcon } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconPencilMinus } from "@tabler/icons-react";
import { useStore } from "@/shared/store";
import { ServiceCard } from "@/widgets/ServiceCard";

const ProfilePage = observer(function ProfilePage() {
  const { userStore, servicesStore } = useStore();
  const router = useRouter();
  const user = userStore.state.user;

  useEffect(() => {
    servicesStore.async.fetchMy().catch(() => console.error("Failed to load my cards"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <h6>что-то не так...</h6>
      </Flex>
    );
  }

  return (
    <Box w="clamp(300px, 80vw, 600px)" mx="auto" pt="7vh">
      <Card p ="lg"
            bg="var(--base-color)">
        <Card.Section inheritPadding withBorder>
          <Flex mb="xs" gap="md" align="center">
            <Avatar src={user.avatar} color="var(--secondary-color)" />
            <Text
              fz="h1"
              fw={900}
              variant="gradient"
              gradient={{ from: "var(--secondary-color)", to: "var(--accent-color)", deg: 90 }}
            >
              {user.name}
            </Text>
            <Flex direction="column" align="flex-start">
              <Text fz="xs" c="var(--secondary-color)">{user.createdAt} </Text>
              <Text fz="xs" c="var(--secondary-color)">{user.phone}</Text>
            </Flex>
            <ActionIcon
              ml="auto"
              variant="subtle"
              color="var(--secondary-color)"
              onClick={() => router.push("/profile/edit")}
            >
              <IconPencilMinus color="var(--secondary-color)" />
            </ActionIcon>
          </Flex>
        </Card.Section>

        <Card.Section inheritPadding pb="xs" withBorder>
          <Flex mt="sm" gap="md" align="center" justify="space-between">
            <Text ta="left" fz="h3" c="var(--secondary-color)">
              ★ {user.rating}
            </Text>
            <Text ta="right" fz="xs">
              {user.city}
            </Text>
          </Flex>
        </Card.Section>

        <Card.Section inheritPadding pb="xs" withBorder>
          <Flex mt="xs" gap="xs" direction="column">
            {servicesStore.state.myItems.length > 0 ? (
              servicesStore.state.myItems.map((item) => (
                <ServiceCard key={item.id} {...item} />
              ))
            ) : (
              <Text ta="center" py="md" c="var(--neutral-color)">
                У вас пока нет объявлений
              </Text>
            )}
          </Flex>
        </Card.Section>
      </Card>
    </Box>
  );
});

export default ProfilePage;
