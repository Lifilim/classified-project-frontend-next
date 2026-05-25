"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import {
  Text,
  Avatar,
  Card,
  Box,
  Flex,
  Button,
  ActionIcon,
  TextInput,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import { useStore } from "@/shared/store";

const EditProfilePage = observer(function EditProfilePage() {
  const { userStore } = useStore();
  const router = useRouter();
  const user = userStore.state.user;
  const [opened, { open, close }] = useDisclosure(false);

  const [form, setForm] = useState({
    name: user?.name || "",
  });

  const handleUpdate = async () => {
    try {
      await userStore.async.updateProfile(form);
      router.push("/profile");
    } catch {
      console.error("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    try {
      await userStore.async.deleteProfile();
      router.push("/login");
    } catch {
      console.error("Failed to delete profile");
    }
  };

  if (!user) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <h6>что-то не так...</h6>
      </Flex>
    );
  }

  return (
    <Box w="clamp(300px, 80vw, 600px)" mx="auto" pt="7vh">
      <Card withBorder p="lg">
        <Card.Section inheritPadding withBorder>
          <Flex mb="xs" gap="md" align="center">
            <Avatar src={user.avatar} style={{ opacity: 0 }} />
            <TextInput
              value={form.name}
              size="32px"
              fw={900}
              mt="12px"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <ActionIcon
              ml="auto"
              variant="subtle"
              color="var(--secondary-color)"
              onClick={handleUpdate}
            >
              <IconCircleCheck />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="var(--secondary-color)"
              onClick={() => router.push("/profile")}
            >
              <IconX />
            </ActionIcon>
          </Flex>
        </Card.Section>
        <Button color="red" onClick={open} mt="md">
          Удалить профиль
        </Button>
        <Modal opened={opened} onClose={close} title="Удалить профиль">
          <Text mb="md">Ты уверен? Это действие нельзя отменить.</Text>
          <Flex gap="sm" justify="flex-end">
            <Button variant="default" onClick={close}>
              Отмена
            </Button>
            <Button color="red" onClick={handleDelete}>
              Удалить
            </Button>
          </Flex>
        </Modal>
      </Card>
    </Box>
  );
});

export default EditProfilePage;
