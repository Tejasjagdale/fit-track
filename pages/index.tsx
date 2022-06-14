import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Header from "../components/Header";
import Cookies from "universal-cookie";
import Router from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Index = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const cookies = new Cookies();

  const handleShowClick = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (cookies.get("id")) {
      fetch(
        `${
          process.env.NEXT_PUBLIC_STRAPI_URL
        }/api/auth/local?email=${cookies.get("id")}`
      )
        .then(() => Router.push("/bmiGraph"))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AuthUser = (event: any) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password: pass }),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
      requestOptions
    )
      .then(async (res: any) => {
        if (res.status === 200) {
          toast({
            description: "Login successfull",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          let data = await res.json();
          cookies.set("id", email, { path: "/" });
          cookies.set("jwt", data.jwt, { path: "/" });
          cookies.set("userid", data.user.id, { path: "/" });
          Router.push("/bmiGraph");
        } else {
          toast({
            description: "User Details Were not Found",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        width="100wh"
        height="88vh"
        bg="#1A202C"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar backgroundColor="#2DCEAA" />
          <Heading color="white">Welcome To FIT-TRACK</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="black">
                      <CFaUserAlt color="black" />
                    </InputLeftElement>

                    <Input
                      type="email"
                      name="email"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      value={email}
                      required
                      placeholder="Email Address"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="black">
                      <CFaLock color="black" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={pass}
                      onChange={(e) => {
                        setpass(e.target.value);
                      }}
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>the password should be of min length 8.</FormHelperText>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  variant="solid"
                  backgroundColor="black"
                  color="white"
                  colorScheme="blackAlpha"
                  width="full"
                  onClick={AuthUser}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Index;
