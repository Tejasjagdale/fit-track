import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import ProductSimple from "../../../components/Card1";
import { AiFillFilter } from "react-icons/ai";

const List = ({ exercises }: any) => {
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
  let Exercise_Type = [
    "Cardio",
    "Olympic Weightlifting",
    "Plyometrics",
    "Powerlifting",
    "Strength",
    "Stretching",
    "Strongman",
  ];
  let Equipment = [
    "Bands",
    "Foam Roll",
    "Barbell",
    "Kettlebells",
    "Body Only",
    "Machine",
    "Cable",
    "Medicine Ball",
    "Dumbbell",
    "None",
    "E-Z Curl Bar",
    "Other",
    "Exercise Ball",
  ];
  let Level = ["Beginner", "Intermediate", "Expert"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    setExercise(exercises);
    console.log(exercises)
  }, [exercises]);

  return (
    <>
      <NavBar
        // eslint-disable-next-line react/no-children-prop
        children={
          <Wrap
            justify="center"
            spacing="30px"
            background="#1E2225"
            padding="10"
          >
            <WrapItem width="100%" color="white">
              <Drawer
                size="md"
                placement="right"
                onClose={onClose}
                isOpen={isOpen}
              >
                <DrawerOverlay />
                <DrawerContent bg="#191A1C" color="white">
                  <DrawerHeader borderBottomWidth="1px">
                    Exercise Filters
                    <DrawerCloseButton />
                  </DrawerHeader>
                  <DrawerBody>
                    <Wrap>
                      <WrapItem>
                        <Text
                          fontWeight={900}
                          fontSize={"17"}
                          width="100%"
                          fontFamily={"body"}
                          mb="1"
                        >
                          Muscles
                        </Text>
                      </WrapItem>
                      <WrapItem width="100%">
                        <Grid
                          templateColumns="repeat(3, 1fr)"
                          gap={5}
                          rowGap={0}
                        >
                          {Muscles.map((type) => (
                            <GridItem key={type} w="100%" h="10">
                              <Checkbox colorScheme="red">{type}</Checkbox>
                            </GridItem>
                          ))}
                        </Grid>
                      </WrapItem>
                      <WrapItem>
                        <Text
                          fontWeight={900}
                          fontSize={"17"}
                          width="100%"
                          fontFamily={"body"}
                          mb="1"
                        >
                          Exercise_Type
                        </Text>
                      </WrapItem>
                      <WrapItem width="100%">
                        <Grid
                          templateColumns="repeat(3, 1fr)"
                          gap={5}
                          rowGap={0}
                        >
                          {Exercise_Type.map((type) => (
                            <GridItem key={type} w="100%" h="10">
                              <Checkbox colorScheme="red">{type}</Checkbox>
                            </GridItem>
                          ))}
                        </Grid>
                      </WrapItem>
                      <WrapItem>
                        <Text
                          fontWeight={900}
                          fontSize={"17"}
                          width="100%"
                          fontFamily={"body"}
                          mb="1"
                        >
                          Level
                        </Text>
                      </WrapItem>
                      <WrapItem width="100%">
                        <Grid
                          templateColumns="repeat(3, 1fr)"
                          gap={5}
                          rowGap={0}
                        >
                          {Level.map((type) => (
                            <GridItem key={type} w="100%" h="10">
                              <Checkbox colorScheme="red">{type}</Checkbox>
                            </GridItem>
                          ))}
                        </Grid>
                      </WrapItem>
                      <WrapItem>
                        <Text
                          fontWeight={900}
                          fontSize={"17"}
                          width="100%"
                          fontFamily={"body"}
                          mb="1"
                        >
                          Equipment
                        </Text>
                      </WrapItem>
                      <WrapItem width="100%">
                        <Grid
                          templateColumns="repeat(3, 1fr)"
                          gap={5}
                          rowGap={0}
                        >
                          {Equipment.map((type) => (
                            <GridItem key={type} w="100%" h="10">
                              <Checkbox colorScheme="red">{type}</Checkbox>
                            </GridItem>
                          ))}
                        </Grid>
                      </WrapItem>
                    </Wrap>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
              <Wrap spacingY="5">
                <WrapItem width="100%">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<AiFillFilter />}
                    onClick={onOpen}
                  >
                    Filter
                  </Button>
                </WrapItem>
                <WrapItem width="100%">
                  <HStack maxWidth="100%" spacing={4}>
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>Forearms</TagLabel>
                      <TagCloseButton />
                    </Tag>
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>Forearms</TagLabel>
                      <TagCloseButton />
                    </Tag>{" "}
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>Forearms</TagLabel>
                      <TagCloseButton />
                    </Tag>{" "}
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>Forearms</TagLabel>
                      <TagCloseButton />
                    </Tag>
                  </HStack>
                </WrapItem>
              </Wrap>
            </WrapItem>
            {exercise.map((exc: any, index: number) => (
              <WrapItem key={index}>
                <ProductSimple data={exc.attributes} />
              </WrapItem>
            ))}
          </Wrap>
        }
      />
    </>
  );
};

export default List;

export async function getServerSideProps(context: { query: { muscle: any } }) {
  let req = await fetch(
    `http://localhost:1337/api/exercises?filters[Main_Muscle_Worked]=${context.query.muscle}`
  );
  let output: any = await req.json();
  console.log(output.data);

  return {
    props: { exercises: output.data }, // will be passed to the page component as props
  };
}
