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
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

export default function ContactFormWithSocialButtons() {
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
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>

            <InputGroup>
              <InputLeftElement children={<BsPerson />} />
              <Input type="text" name="name" placeholder="Your Name" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>

            <InputGroup>
              <InputLeftElement children={<MdOutlineEmail />} />
              <Input type="email" name="email" placeholder="Your Email" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Message</FormLabel>

            <Textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              resize="none"
            />
          </FormControl>

          <Button
            colorScheme="teal"
            bg="teal.400"
            color="white"
            _hover={{
              bg: "teal.500",
            }}
            width="full"
          >
            Send Message
          </Button>
        </VStack>
      </Box>
    </>
  );
}
