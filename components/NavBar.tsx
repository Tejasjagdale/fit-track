/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Heading,
  Button,
  Tooltip,
  StatUpArrow,
} from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import { IoIosFitness } from "react-icons/io";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import Router from "next/router";
import { GiOpenedFoodCan } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

const cookies = new Cookies();

const scrollUp = () => {
  const doc = document.documentElement;
  const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  if (top > 0) {
    window.scrollTo(0, top - 80);
    setTimeout(scrollUp, 10);
  }
};

const Logout = (event: any) => {
  event.preventDefault();
  cookies.remove("id");
  cookies.remove("userid");
  cookies.remove("jwt");
  Router.push("/");
};

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/Profile" },
  { name: "BmiGraph", icon: FiTrendingUp, href: "/bmiGraph" },
  { name: "Exercises", icon: IoIosFitness, href: "/exercises" },
  { name: "DailyUpdate", icon: FaEdit, href: "/dailyUpdate" },
  { name: "AddWorkout", icon: MdAddCircleOutline, href: "/addworkout" },
  { name: "Food", icon: GiOpenedFoodCan, href: "/food" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("#1E2225", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box overflowX="hidden" ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Tooltip
          hasArrow
          color="white"
          bg="green.500"
          fontSize="md"
          label="Scroll to top"
        >
          <Button onClick={scrollUp}>
            <StatUpArrow />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      color="white"
      bg={useColorModeValue("#191A1C", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex align="center" mr={5}>
          <Image
            alt="Logo"
            maxWidth="35px"
            mr={2}
            src={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`}
          />
          <Heading as="h1" size="md" letterSpacing={"tighter"} cursor="pointer">
            FIT-TRACK
          </Heading>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, i) => (
        <Link key={i} href={link.href} passHref>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      // style={{ textDecoration: "none" }}
      // _focus={{ boxShadow: "none" }}
      passHref
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#10E697",
          color: "black",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  useEffect(() => {
    if (cookies.get("id") || cookies.get("userid") || cookies.get("jwt")) {
      fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${cookies.get(
          "userid"
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("");
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#191A1C", "gray.900")}
      borderBottomWidth="1px"
      color="white"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex display={{ base: "flex", md: "none" }} align="center" mr={5}>
        <Image
          alt="Logo"
          maxWidth="35px"
          mr={2}
          src={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`}
        />
        <Heading as="h1" size="md" letterSpacing={"tighter"} cursor="pointer">
          FIT-TRACK
        </Heading>
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                ></VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("#191A1C", "#191A1C")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              color="white"
            >
              <Link href="/Profile" passHref>
                <MenuItem _hover={{ bg: "white", color: "black" }}>
                  Profile
                </MenuItem>
              </Link>
              <MenuItem _hover={{ bg: "white", color: "black" }}>
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem
                _hover={{ bg: "red.500", color: "white" }}
                onClick={Logout}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
