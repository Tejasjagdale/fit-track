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
import Router from "next/router";
import Link from "next/link";
import Cookies from "universal-cookie";

const NavBar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const cookies = new Cookies();

  const Logout = (event) => {
    event.preventDefault();
    cookies.remove("id");
    Router.push("/");
  };

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
            <Image maxWidth="45px" mr={2} src={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`} />
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

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/Profile">
          <a>Profile</a>
        </Link>
        <Link href="/bmiGraph">
          <a>BMI_Graph</a>
        </Link>
        <Link href="/dailyUpdate">
          <a>Daily_Update</a>
        </Link>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="outline"
          _hover={{ bg: "red.500", borderColor: "red.500", color: "white" }}
          onClick={Logout}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
