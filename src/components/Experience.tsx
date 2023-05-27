import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Badge,
  Image,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Fade } from "react-awesome-reveal";
import defaultLogo from "../assets/default2.png";

export interface IExperience {
  company: string;
  position: string;
  duration: string;
  image: string;
  badges: string[];
  listItems: string[];
}

interface IProp {
  color: string;
  experiences: IExperience[];
}

export default function Experience({ color = "teal", experiences }: IProp) {
  return (
    <>
      <Container maxW={"3xl"} id="experience">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800} size={"lg"}>
                02
              </Text>
              <Text fontWeight={800} size={"lg"}>
                Experience
              </Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack px={4} spacing={4}>
            {experiences.map((exp, index) => (
              <Fade key={index}>
                <Card key={exp.company} size="sm">
                  <CardHeader>
                    <Flex justifyContent="space-between">
                      <HStack>
                        <Image
                          src={exp.image}
                          h={50}
                          fallbackSrc={defaultLogo}
                        />
                        <Box px={2} alignContent="left">
                          <Text fontWeight={600}>{exp.company}</Text>
                          <Text>{exp.position}</Text>
                        </Box>
                      </HStack>
                      <Text px={2} fontWeight={300}>
                        {exp.duration}
                      </Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Flex>
                      <List textAlign="left" spacing={3}>
                        {exp.listItems.map((item, index) => (
                          <ListItem key={index}>
                            <ListIcon
                              boxSize={6}
                              as={ChevronRightIcon}
                              color={`${color}.500`}
                            />
                            {item}
                          </ListItem>
                        ))}
                      </List>
                    </Flex>
                  </CardBody>
                  <CardFooter>
                    <HStack spacing={2}>
                      {exp.badges.map((badge) => (
                        <Badge key={badge} colorScheme={"teal"}>
                          {badge}
                        </Badge>
                      ))}
                    </HStack>
                  </CardFooter>
                </Card>
              </Fade>
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
