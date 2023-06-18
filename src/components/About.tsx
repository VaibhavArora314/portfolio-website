import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Image,
  useColorModeValue,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import defaultLogo from "../assets/default2.png";

export interface ISkill {
  id: string;
  name: string;
  logoURL: string;
}

interface IProp {
  color: string;
  about: string;
  skills: ISkill[];
}

export default function About({ color = "teal", about, skills }: IProp) {
  return (
    <>
      <Container maxW={"4xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800} size={"lg"}>
                01
              </Text>
              <Text fontWeight={800} size={"lg"}>
                About
              </Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Text
            color={"gray.500"}
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            px={4}
          >
            {about}
          </Text>
          <Stack align="center" direction="row" px={4}>
            <Divider orientation="horizontal" />
            <Text fontWeight={800} size={"lg"} pl={4}>
              Skills
            </Text>
          </Stack>
          <Flex
            align="center"
            justify="center"
            direction="row"
            px={4}
            wrap={"wrap"}
            gap={4}
          >
            <Fade cascade damping={0.08} direction="left">
              {skills.map((skill, index) => (
                <Tooltip label={skill.name} fontSize="md" hasArrow key={index}>
                  <Image
                    boxSize={{ base: "3rem", md: "4rem", lg: "5rem" }}
                    objectFit="cover"
                    src={skill.logoURL}
                    borderRadius={{ base: "xl", md: "3xl" }}
                    bg={useColorModeValue("gray.100", "gray.900")}
                    boxShadow="base"
                    cursor="pointer"
                    fallbackSrc={defaultLogo}
                  />
                </Tooltip>
              ))}
            </Fade>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
