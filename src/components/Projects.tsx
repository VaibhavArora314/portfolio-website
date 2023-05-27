import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
  Badge,
  Center,
} from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import defaultLogo from "../assets/default2.png";

export interface IButton {
  text: string;
  href: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  badges: string[];
  buttons: IButton[];
}

interface IProp {
  color: string;
  projects: IProject[];
  categories: string[];
  haveExperience: boolean;
}

export default function Projects({
  color = "teal",
  projects,
  categories,
  haveExperience = true,
}: IProp) {
  const [selected, setSelected] = useState("All");

  const handleSelected = (value: string) => {
    setSelected(value);
  };

  return (
    <>
      <Container maxW={"5xl"} id="projects">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800} size={"lg"}>
                0{haveExperience ? 3 : 2}
              </Text>
              <Text fontWeight={800} size={"lg"}>
                Projects
              </Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Center px={{ base: 2, md: 4 }}>
            <ButtonGroup variant="outline">
              <Button
                size={{ base: "xs", sm: "md" }}
                colorScheme={selected === "All" ? `${color}` : "gray"}
                onClick={() => handleSelected("All")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  size={{ base: "xs", sm: "md" }}
                  colorScheme={selected === category ? `${color}` : "gray"}
                  onClick={() => handleSelected(category)}
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Center>
          <Stack px={4} spacing={4}>
            <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
              {projects
                .filter((project) => {
                  if (selected === "All") {
                    return true;
                  } else {
                    return project.tags.includes(selected);
                  }
                })
                .map((project) => (
                  <Fade direction="up" triggerOnce key={project.id}>
                    <Card
                      key={project.name}
                      direction={{
                        base: "column",
                      }}
                      overflow="hidden"
                    >
                      <Image
                        objectFit="cover"
                        src={project.image}
                        h={{ base: "12rem" }}
                        fallbackSrc={defaultLogo}
                      />

                      <Stack>
                        <CardBody alignContent="left">
                          <Heading size="md">{project.name}</Heading>

                          <Text py={2}>{project.description}</Text>

                          <HStack py={2}>
                            {project.buttons.map((button) => (
                              <a key={button.text} href={button.href}>
                                <Button color={`${color}.400`}>
                                  {button.text}
                                </Button>
                              </a>
                            ))}
                          </HStack>
                          <HStack pt={4} spacing={2}>
                            {project.badges.map((badge) => (
                              <Badge key={badge} colorScheme={color}>
                                {badge}
                              </Badge>
                            ))}
                          </HStack>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Fade>
                ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
