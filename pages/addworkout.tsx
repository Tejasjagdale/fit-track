import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  WrapItem,
  Wrap,
  HStack,
  Tag,
  TagLabel,
  Select,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import ImageSlider from "../components/ImageSlider";

let Muscles = [
  "Chest",
  "Forearms",
  "Lats",
  "Middle Back",
  "Lower Back",
  "Neck",
  "Quadriceps",
  "Hamstrings",
  "Calves",
  "Triceps",
  "Traps",
  "Shoulders",
  "Abdominals",
  "Glutes",
  "Biceps",
  "Adductors",
  "Abductors",
];

const Schedule = (day: string, color: string) => {
  return (
    <>
      <Box
        p={4}
        display={{ md: "flex" }}
        maxWidth="32rem"
        borderWidth={1}
        margin={2}
        bgGradient={`linear(to-tr, ${color}, #191A1C)`}
        color="white"
      >
        <Accordion width="100%" defaultIndex={[0]} allowMultiple>
          <AccordionItem width="100%">
            <Heading width="100%">
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {day}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Button size="sm" padding="0" mr={3} bg="white" color="#319795">
          <ArrowBackIcon />
        </Button>
        <Heading size="md" letterSpacing={"tighter"}>
          Add Workout
        </Heading>
      </Flex>

      <Box mt={{ base: 4, md: 0 }}>
        <Button
          variant="outline"
          _hover={{
            bg: "white",
            color: "#319795",
            borderColor: "teal.700",
          }}
        >
          Add Workout
        </Button>
      </Box>
    </Flex>
  );
};

const Body = () => {
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        color="white"
      >
        <Wrap width="100%">
          <WrapItem w="50%" h="10">
            <Text mb="8px">Tag Name</Text>
            <Input
              // value={value}
              // onChange={handleChange}
              placeholder="Enter the Tag name"
              size="sm"
            />
          </WrapItem>

          <WrapItem w="50%" h="10">
            <Text mb="8px">Exercise Code</Text>
            <Input
              // value={value}
              // onChange={handleChange}
              placeholder="Enter the Tag name"
              size="sm"
            />
          </WrapItem>

          <WrapItem w="100%" m={5}>
            <Select
              bg="white"
              color="black"
              variant="outline"
              placeholder="Outline"
            >
              {Muscles.map((type) => (
                <option key={type} value={type} color="black">
                  {type}
                </option>
              ))}
            </Select>
          </WrapItem>

          <WrapItem w="100%" m={5}>
            <Text>Sets weight field</Text>
            <HStack></HStack>
          </WrapItem>
        </Wrap>
      </Flex>
    </>
  );
};

const addworkout = () => {
  return (
    <NavBar
      // eslint-disable-next-line react/no-children-prop
      children={
        <>
          <title>Fit-track(AddWorkout)</title>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab color="white" _selected={{ color: "white", bg: "teal" }}>
                Schedule
              </Tab>
              <Tab color="white" _selected={{ color: "white", bg: "teal" }}>
                Playlits
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Wrap>
                  {[
                    ["red.500", "MONDAY"],
                    ["blue.500", "TUESDAY"],
                    ["orange.500", "WEDNESDAY"],
                    ["pink.500", "THURSDAY"],
                    ["#319795", "FRIDAY"],
                    ["yellow.500", "SATURDAY"],
                    ["green.500", "SUNDAY"],
                  ].map((data, index) => (
                    <WrapItem
                      mr={5}
                      minW={{ md: "50%", w: "100%" }}
                      key={index}
                    >
                      <Box
                        p={4}
                        display={{ md: "flex" }}
                        width="100%"
                        borderWidth={1}
                        margin={2}
                        bgGradient={`linear(to-tr, ${data[0]}, #191A1C)`}
                        color="white"
                      >
                        <Accordion
                          width="100%"
                          defaultIndex={[0]}
                          allowMultiple
                        >
                          <AccordionItem width="100%">
                            <Heading width="100%">
                              <AccordionButton>
                                <Box width="100%" flex="1" textAlign="left">
                                  {data[1]}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </Heading>
                            <AccordionPanel pb={4}>
                              <Text width="100%" mb={3}>
                                Muscel Targeted:
                              </Text>
                              <HStack width="100%" mb={3} spacing={4}>
                                <Tag
                                  size="md"
                                  borderRadius="full"
                                  variant="solid"
                                  bg="white"
                                  color="black"
                                >
                                  <TagLabel>Forearms</TagLabel>
                                </Tag>
                              </HStack>

                              <Wrap>
                                <Heading width="100%" fontSize={20}>
                                  Exercises
                                </Heading>

                                <Wrap
                                  display={{ md: "flex", sm: "block" }}
                                  w="100%"
                                  bg="white"
                                  color="black"
                                  p={8}
                                >
                                  <Stack w="100%">
                                    <Heading width="100%" fontSize={20}>
                                      Rickshaw Carry
                                    </Heading>
                                    <Wrap>
                                      <Text mr={1}>Muscle Targeted :</Text>
                                      <Tag
                                        fontSize={"14"}
                                        borderRadius="full"
                                        variant="solid"
                                        bg="#9933FF"
                                      >
                                        <TagLabel>
                                          <Link
                                            href={`http://localhost:3000/exercise/muscle/`}
                                            passHref
                                          >
                                            muscle
                                          </Link>
                                        </TagLabel>
                                      </Tag>
                                    </Wrap>

                                    <Wrap>
                                      <Text mr={1}>Equipment Type :</Text>
                                      <Tag
                                        fontSize={"14"}
                                        borderRadius="full"
                                        variant="solid"
                                        bg="blue.500"
                                      >
                                        <TagLabel>
                                          <Link
                                            href={`http://localhost:3000/exercise/equipment/`}
                                            passHref
                                          >
                                            equipe
                                          </Link>
                                        </TagLabel>
                                      </Tag>
                                    </Wrap>

                                    <Wrap>
                                      <Text mr={1}>Exercise Type : </Text>
                                      <Tag
                                        fontSize={"14"}
                                        borderRadius="full"
                                        variant="solid"
                                        bg="yellow.500"
                                      >
                                        <TagLabel>
                                          <Link
                                            href={`http://localhost:3000/exercise/type/`}
                                            passHref
                                          >
                                            type
                                          </Link>
                                        </TagLabel>
                                      </Tag>
                                    </Wrap>

                                    <Wrap>
                                      <Text mr={1}>Level : </Text>
                                      <Tag
                                        fontSize={"14"}
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="green"
                                      >
                                        <TagLabel>
                                          <Link
                                            href={`http://localhost:3000/exercise/level/`}
                                            passHref
                                          >
                                            level
                                          </Link>
                                        </TagLabel>
                                      </Tag>
                                    </Wrap>
                                    <Button colorScheme="teal">
                                      Start
                                    </Button>
                                  </Stack>
                                </Wrap>
                              </Wrap>

                              <Wrap w="100%" p={4}>
                                <Button
                                  borderRadius="50%"
                                  _hover={{ bg: "green.500" }}
                                  bg="green.500"
                                  color="white"
                                >
                                  <AddIcon />
                                </Button>
                              </Wrap>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
              </TabPanel>
              <TabPanel>
                <Header />
                <Body />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      }
    />
  );
};

export default addworkout;
