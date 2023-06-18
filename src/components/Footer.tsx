import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.900", "gray.100")}
      // style = {{
      //   border: `solid 5px ${useColorModeValue("gray.100", "gray.900")}`,
      //   borderColor: `${useColorModeValue("gray.100", "gray.900")} transparent transparent transparent`,
      //   borderRadius: "50%/100px 100px 0 0",
      // }}
    >
      <Container as={Stack} maxW={"6xl"} py={4} align="center">
        <Text>© 2023 Vaibhav Arora. All rights reserved</Text>
      </Container>
    </Box>
  );
}
