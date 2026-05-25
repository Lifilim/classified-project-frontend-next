import { Paper, Overlay, Title, Button } from "@mantine/core";

export default function LandingPage() {
  return (
    <Paper bg="rgb(40, 38, 75)" radius={0} shadow="xs" h="100vh" pl="4vw" pos="relative">
      <Overlay bg="rgb(164, 0, 51)" opacity={1} h="38%" zIndex={0} pos="absolute" top="62%" />
      <Title order={1} size="20vh" c="rgb(164, 0, 51)" tt="uppercase" pos="absolute" top="39%">
        Здесь
      </Title>
      <Title order={1} size="7vh" c="var(--text-color)" pos="absolute" top="56%" left="15vh" style={{ transform: "rotate(-5deg)", zIndex:"1", textAlign:"center" }}>
        спрос и предложение
      </Title>
      <Title order={1} size="20vh" c="rgb(40, 38, 75)" tt="uppercase" pos="absolute" top="60%">
        находят
      </Title>
      <Title order={1} size="7vh" c="rgb(40, 38, 75)" pos="absolute" top="78%">
        друг друга
      </Title>
      <Button
        component="a"
        href="/feed"
        variant="outline"
        color="var(--text-color)"
        size="xl"
        pos="absolute"
        top="81%"
        left="90vh"
      >
        хочу!
      </Button>
    </Paper>
  );
}
