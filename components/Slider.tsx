import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
const fitnessCalculatorFunctions = require("fitness-calculator");

const Questions = () => {
  const [page, setpage] = useState(1);
  const [slide_val,setSlide_val] = useState(33.33)

  const nextpage = () => {
    setpage(page + 1);
    setSlide_val(slide_val + 33.33)
  };

  const backpage = () => {
    page !== 1 ? setpage(page - 1) : "";
    page !== 1 ? setSlide_val(slide_val - 33.33):"";
  };
  const myCalorieNeeds = fitnessCalculatorFunctions.calorieNeeds(
    "male",
    22,
    176,
    73,
    "active"
  );

  console.log(
    `I will eat less than${myCalorieNeeds} to cut down my fat.`,
    myCalorieNeeds
  );

  return (
    <Center width="100%" margin={2}>
      <Wrap width="450px" background="#191A1C" boxShadow="dark-lg">
        <WrapItem width="100%">
          <Slider aria-label="slider-ex-1" value={slide_val} defaultValue={slide_val}>
            <SliderTrack height="15px" background="white">
              <SliderFilledTrack backgroundColor="teal" />
            </SliderTrack>
          </Slider>
        </WrapItem>

        <Wrap>
          {page === 1 ? (
            <>
              <Center p={5} w="100%">
                <Heading color="white" fontSize={20}>
                  What is your weight goal?
                </Heading>
              </Center>
              <Stack p="5" width="100%" cursor="pointer">
                <Stack width="100%" color="white">
                  <Center p={5} bg="white" color="black">
                    <Heading fontSize={20}>Lose Weight</Heading>
                  </Center>
                </Stack>

                <Stack width="100%" color="white" cursor="pointer">
                  <Center p={5} bg="white" color="black">
                    <Heading fontSize={20}>Maintain Weight</Heading>
                  </Center>
                </Stack>

                <Stack width="100%" color="white">
                  <Center p={5} bg="white" color="black">
                    <Heading fontSize={20}>Gain Weight</Heading>
                  </Center>
                </Stack>
              </Stack>
            </>
          ) : page === 2 ? (
            <>
              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>
                  Please select which sex we should use to calculate your
                  calorie needs.
                </Heading>
                <RadioGroup>
                  <Stack direction="row">
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>

              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>How tall are you?</Heading>
                <HStack>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" fontSize="1.2em" />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Height (feet)"
                    />
                    <InputRightElement
                      // eslint-disable-next-line react/no-children-prop
                      children="ft"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Height (inches)"
                    />
                    <InputRightElement
                      // eslint-disable-next-line react/no-children-prop
                      children="in"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>

              <Stack p={5} m={2} width="100%" spacing={2} color="white">
                <Heading fontSize={20}>How much do you weight?</Heading>
                <Text fontSize="md">
                  {"It's"} ok to estimate. Your can update later.
                </Text>
                <HStack>
                  <InputGroup w={{ md: "50%", sm: "100%" }}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    />
                    <Input
                      color="black"
                      bg="white"
                      placeholder="Current Weight"
                    />
                    <InputRightElement
                      // eslint-disable-next-line react/no-children-prop
                      children="Kgs"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>

              <Stack p={5} width="100%" spacing={2} color="white" m={2}>
                <Heading fontSize={20}>{"What's "}your goal weight?</Heading>
                <Text fontSize="md">
                  {"Don't"} worry. this {"dosen't"} affect your daily calorie
                  goal and you can always change it later.
                </Text>
                <HStack>
                  <InputGroup w={{ md: "50%", sm: "100%" }}>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    />
                    <Input color="black" bg="white" placeholder="Goal Weight" />
                    <InputRightElement
                      // eslint-disable-next-line react/no-children-prop
                      children="Kgs"
                      color="black"
                      bg="white"
                    />
                  </InputGroup>
                </HStack>
              </Stack>
            </>
          ) : (
            <>
              <WrapItem color="white">
                <Heading width="100%" textAlign="center" p={5} fontSize={23}>
                  What is your baseline activity level?
                </Heading>
              </WrapItem>
              <WrapItem width="100%">
                <Box>
                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    bg="white"
                  >
                    <Heading fontSize={20}>Not Very Active</Heading>
                    <Text fontSize="md">
                      Spend Most of day Sitting (e.g.,bankteller,desk job)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    bg="white"
                  >
                    <Heading fontSize={20}>Lightly Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of the day doing some Physical activity
                      (e.g.,food server, postal carrier)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    bg="white"
                  >
                    <Heading fontSize={20}>Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of Day doing some physical activity
                      (e.g., food server,postal carrier)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    bg="white"
                  >
                    <Heading fontSize={20}>Very Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of the day doing heavy physical acitvity
                      (e.g., bike messenger , carpenter)
                    </Text>
                  </Stack>

                  <Stack
                    cursor="pointer"
                    p={4}
                    m={5}
                    borderRadius={20}
                    spacing={2}
                    bg="white"
                  >
                    <Heading fontSize={20}>Extreme Active</Heading>
                    <Text fontSize="md">
                      Spend a good part of the day doing heavy physical acitvity
                      also extra fitness (e.g.,sports,gym)
                    </Text>
                  </Stack>
                </Box>
              </WrapItem>
            </>
          )}
        </Wrap>

        <WrapItem width="100%" p={3}>
          <Button
            colorScheme="teal"
            variant="outline"
            mr={5}
            disabled={page === 1 ? true : false}
            onClick={backpage}
          >
            Back
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={nextpage}>
            Next
          </Button>
        </WrapItem>
      </Wrap>
    </Center>
  );
};

export default Questions;
