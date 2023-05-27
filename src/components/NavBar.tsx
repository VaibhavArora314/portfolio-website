import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  useDisclosure,
  Link,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import logo from "../assets/v.png";

const Nav = ({ haveExperience = true }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  const scrollToSection = (id = 0) => {
    const sectionNames = ["hero", "about", "experience", "projects", "contact"];
    const section = document.getElementById(sectionNames[id]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        h={16}
        boxShadow={"base"}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Link
          onClick={() => {
            scrollToSection();
          }}
        >
          <Image
            boxSize="50px"
            objectFit="cover"
            src={logo}
            borderRadius="2xl"
          />
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {isLargerThanMD ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection(1);
                  }}
                >
                  About
                </Button>
                {haveExperience && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection(2);
                    }}
                  >
                    Experience
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection(3);
                  }}
                >
                  Projects
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection(4);
                  }}
                >
                  Contact
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLargerThanMD ? (
              <></>
            ) : (
              <>
                <Button
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                ></Button>
                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerBody>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          scrollToSection(1);
                        }}
                      >
                        About
                      </Button>
                      {haveExperience && (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            scrollToSection(2);
                          }}
                        >
                          Experience
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => {
                          scrollToSection(3);
                        }}
                      >
                        Projects
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          scrollToSection(4);
                        }}
                      >
                        Contact
                      </Button>
                      <DrawerCloseButton />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default Nav;
