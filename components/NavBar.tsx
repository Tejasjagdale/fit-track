import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Router from "next/router";
import Link from "next/link";
import Cookies from "universal-cookie";
import { BiLogOut } from "react-icons/bi";

const NavBar = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cookies = new Cookies();

  const Logout = (event: any) => {
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
        <Link href="/" passHref>
          <Flex align="center" mr={5}>
            <Image
              alt="Logo"
              maxWidth="45px"
              mr={2}
              src={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`}
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

      <Button colorScheme="blue" onClick={onOpen}>
        <HamburgerIcon />
      </Button>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <Stack
              direction={{ base: "column" }}
              display={{ base: "block" }}
              width={{ base: "full" }}
              alignItems="center"
              flexGrow={1}
              mt={{ base: 4 }}
            >
              <Box>
                <Link href="/Profile">
                  <a>Profile</a>
                </Link>
              </Box>
              <Box>
                <Link href="/bmiGraph">
                  <a>BMI_Graph</a>
                </Link>
              </Box>
              <Box>
                <Link href="/dailyUpdate">
                  <a>Daily_Update</a>
                </Link>
              </Box>
              <Button
                variant="outline"
                _hover={{
                  bg: "red.500",
                  borderColor: "red.500",
                  color: "white",
                }}
                onClick={Logout}
                rightIcon={<BiLogOut />}
              >
                Logout
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;
