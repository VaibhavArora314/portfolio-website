import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { useState } from "react";
interface IProp {
  color: string;
  sendMessage: (
    name: string,
    contact: string,
    message: string
  ) => Promise<boolean>;
}

export default function ContactForm({ color, sendMessage }: IProp) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const toast = useToast();

  const handleSubmit = async () => {
    if (validate()) {
      const status = await sendMessage(name, contact, message);
      if (status) {
        setName("");
        setContact("");
        setMessage("");
        toast({
          title: "Message Sent.",
          description:
            "Message was successfully sent. I will try to respond as soon as possible.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Unable to send message.",
          description: "Try again later or contact me on social media.",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
    }
  };

  const validate = () => {
    const updatedErrors = {
      name: "",
      contact: "",
      message: "",
    };
    updatedErrors.name = validateName(name);
    updatedErrors.contact = validateContact(contact);
    updatedErrors.message = validateMessage(message);
    setErrors(updatedErrors);
    return (
      !updatedErrors.name && !updatedErrors.contact && !updatedErrors.message
    );
  };

  return (
    <>
      <Box
        w={{ base: "xs", sm: "sm", md: "lg", lg: "3xl" }}
        bg={useColorModeValue("gray.100", "gray.900")}
        borderRadius="lg"
        p={8}
        color={useColorModeValue("gray.800", "gray.200")}
        shadow="base"
      >
        <FormControl isRequired>
          <VStack spacing={3} alignItems="start">
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <InputLeftElement children={<BsPerson />} />
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: validateName(e.target.value) });
                }}
              />
            </InputGroup>
            <Text color="red.500" size="xs">
              {errors.name}
            </Text>
            <FormLabel>Contact Info</FormLabel>
            <InputGroup>
              <InputLeftElement children={<MdOutlineEmail />} />
              <Input
                type="text"
                placeholder="Your Contact Info"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setErrors({
                    ...errors,
                    contact: validateContact(e.target.value),
                  });
                }}
              />
            </InputGroup>
            <Text color="red.500" size="xs">
              {errors.contact}
            </Text>
            <FormLabel>Message</FormLabel>
            <Textarea
              placeholder="Your Message"
              rows={6}
              resize="none"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrors({
                  ...errors,
                  message: validateMessage(e.target.value),
                });
              }}
            />
            <Text color="red.500" size="xs">
              {errors.message}
            </Text>
            <Button
              colorScheme={color}
              bg={`${color}.400`}
              color="white"
              _hover={{
                bg: `${color}.500`,
              }}
              width="full"
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </>
  );
}

const validateName = (name: string) => {
  if (name === "") return "Name is required!";
  if (name.length > 100) return "Name cannot be longer than 100 char";
  return "";
};

const validateContact = (contact: string) => {
  if (contact === "") return "Contact info is required!";
  if (contact.length > 100)
    return "Contact info cannot be longer than 100 char";
  return "";
};

const validateMessage = (message: string) => {
  if (message === "") return "Please write some message.";
  if (message.length > 1000) return "Name cannot be longer than 1000 char";
  return "";
};
