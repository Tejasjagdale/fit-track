import { useState } from "react";
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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Header from "../components/Header";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <Header />
      <Flex
        flexDirection="column"
        width="100wh"
        height="88vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="black" />
          <Heading color="black">Welcome</Heading>
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
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="black" />}
                    />
                    <Input type="email" placeholder="Email Address" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      children={<CFaLock color="black" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Choose Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  backgroundColor="black"
                  color="white"
                  colorScheme="blackAlpha"
                  width="full"
                >
                  SignUp
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already Signed up?
          <Link color="black" href="/Login">
            Login
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default signup;
