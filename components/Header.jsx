import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="#1A202C"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/">
          <Flex align="center" mr={5}>
            <Image
              maxWidth="45px"
              mr={2}
              src="https://fit-track.vercel.app/favicon.ico"
            />
            <Heading
              as="h1"
              size="lg"
              letterSpacing={"tighter"}
              cursor="pointer"
            >
              FIT-TRACK
            </Heading>
          </Flex>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/Signup">
          <Button
            variant="outline"
            _hover={{ bg: "white", borderColor: "white", color: "black" }}
          >
            Create account
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
