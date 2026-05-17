"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Textarea, Button, Container, Title, Stack, Select } from "@mantine/core";
import { cardsApi } from "@/shared/api/cardsApi";
import type { CreateCardDto } from "@/shared/types/auth";

const categories = [
  { value: "search.service", label: "поиск услуги" },
  { value: "offer.service", label: "оказание услуги" },
  { value: "search.product", label: "поиск товара" },
  { value: "offer.product", label: "продажа товара" },
  { value: "search.rent", label: "поиск аренды" },
  { value: "offer.rent", label: "предложение по аренде" },
];

export default function CreateCardPage() {
  const router = useRouter();

  const [form, setForm] = useState<CreateCardDto>({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof CreateCardDto, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await cardsApi.create(form);
      router.push("/feed");
    } catch (e) {
      console.error("Create card error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" pt="7vh">
      <Title order={2} tt="uppercase" c="var(--secondary-color)" mb="lg">
        Создать карточку
      </Title>

      <Stack gap="md">
        <TextInput
          label="Название"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <Textarea
          label="Описание"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          minRows={4}
        />

        <TextInput
          label="Цена"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <TextInput
          label="Картинка (URL)"
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
        />

        <Select
          label="Категория"
          value={form.category}
          onChange={(value) => handleChange("category", value || "")}
          data={categories}
        />

        <Button
          onClick={handleSubmit}
          loading={loading}
          radius={0}
          bg="var(--secondary-color)"
        >
          Создать
        </Button>
      </Stack>
    </Container>
  );
}
