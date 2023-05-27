import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Heading,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { Fade } from "react-awesome-reveal";

interface IProp {
  color: string;
  contact: IContact;
  haveExperience: boolean;
  sendMessage: (
    name: string,
    contact: string,
    message: string
  ) => Promise<boolean>;
}

interface IContact {
  linkedin: string;
  github: string;
  email: string;
}

export default function Contact({
  color = "teal",
  contact,
  haveExperience,
  sendMessage,
}: IProp) {
  const linkedin = () => {
    window.open(`${contact.linkedin}`, "_blank", "noreferrer,noopener");
  };
  const github = () => {
    window.open(`${contact.github}`, "_blank", "noreferrer,noopener");
  };
  const email = () => {
    window.open(`mailto:${contact.email}`, "_blank", "noreferrer,noopener");
  };
  return (
    <>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 16, md: 20 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800} size={"lg"}>
                0{haveExperience ? 4 : 3}
              </Text>
              <Text fontWeight={800} size={"lg"}>
                Contact
              </Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack
            spacing={4}
            as={Container}
            maxW={"3xl"}
            textAlign={"center"}
            alignItems="center"
          >
            <Heading fontSize={{ base: "xl", lg: "2xl" }}>
              Get in touch!
            </Heading>
            <Fade triggerOnce>
              <ContactForm color={color} sendMessage={sendMessage} />
            </Fade>
            <Center>
              <HStack pt={4} spacing={4}>
                {contact.linkedin && (
                  <Tooltip label="LinkedIn" placement="bottom">
                    <span>
                      <FaLinkedin
                        onClick={linkedin}
                        size={28}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </Tooltip>
                )}
                {contact.github && (
                  <Tooltip label="GitHub">
                    <span>
                      <FaGithub
                        onClick={github}
                        size={28}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </Tooltip>
                )}
                {contact.email && (
                  <Tooltip label="Email">
                    <span>
                      <FaEnvelope
                        onClick={email}
                        size={28}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </Tooltip>
                )}
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
