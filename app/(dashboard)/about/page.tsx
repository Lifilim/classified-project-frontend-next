import { Container, Title, Text, Stack, Paper } from "@mantine/core";

export default function AboutPage() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="lg" mt="10vh">
        <Title order={1} tt="uppercase" c="var(--secondary-color)" ta="center">
          О нас
        </Title>

        <Paper shadow="sm" p="xl" withBorder bg="var(--base-color)">
          <Text c="var(--neutral-color)" size="lg" mb="md">
            Classified — это современная доска объявлений, где каждый может
            найти нужные товары и услуги или предложить свои.
          </Text>
          <Text c="var(--neutral-color)" size="lg" mb="md">
            Наша миссия — соединять людей, создавая удобное и безопасное
            пространство для обмена товарами, услугами и возможностями.
          </Text>
          <Text c="var(--neutral-color)" size="lg">
            Мы верим, что спрос и предложение всегда найдут друг друга.
          </Text>
        </Paper>

        <Paper shadow="sm" p="xl" withBorder bg="var(--base-color)">
          <Title order={3} c="var(--secondary-color)" mb="md">
            Контакты
          </Title>
          <Text c="var(--neutral-color)">Email: support@classified.ru</Text>
          <Text c="var(--neutral-color)">Телефон: +7 (800) 123-45-67</Text>
        </Paper>
      </Stack>
    </Container>
  );
}
