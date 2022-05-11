import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Cookies from "universal-cookie";
import Router from "next/router";
import Card from "../components/Card";
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  useColorMode,
  Button,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const dailyUpdate = () => {
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(`http://localhost:3000/api/userData?email=${cookies.get("id")}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data[cookies.get("id")]);
        })
        .catch((err) => console.log(err));
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Flex
        flexDirection="column"
        width="100wh"
        height="88vh"
        bg="#1A202C"
        justifyContent="center"
        alignItems="center"
        boxShadow="#1A202C"
      >
        <Box w="300px" rounded="20px" overflow="hidden" bg="#E7EEF1" mt={10}>
          <Image
            src="https://images-platform.99static.com/3CzoydPCp5pXI83EODhEOibNLmk=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/93/93858/attachment_93858260"
            alt="Card Image"
            boxSize="250px"
            width="300px"
          ></Image>
          <Box p={5}>
            <Stack align="center" mb={5}>
              <Badge variant="solid" colorScheme="red" rounded="full" px={2}>
                Weight not Entered
              </Badge>
            </Stack>

            <Stack align="center">
              {/* <Text as="h2" fontWeight="normal" my={2}>
                A Computer Science Portal for Geeks
              </Text> */}
              <FormControl>
                <FormLabel >Enter your todays weight</FormLabel>
                <Input id="email" bg="white" type="number" />
              </FormControl>
            </Stack>
            <Flex mt={6}>
              <Spacer />
              <Button variant="solid" colorScheme="green" size="sm">
                Enter Weight
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default dailyUpdate;
