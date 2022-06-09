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
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductSimple from "../components/Card1";
import { AiFillFilter } from "react-icons/ai";

const List = () => {
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
  const [curpage, setCurpage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const toast = useToast();

  useEffect(() => {
    fetch(
      "http://localhost:1337/api/exercises?pagination[page]=1&pagination[pageSize]=10"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.meta)
        setTotalpage(data.meta.pagination.pageCount);
        setExercise(data.data);
      });
  }, []);

  const nextpage = () => {
    curpage !== totalpage ? setCurpage(curpage + 1) : "";
  };

  const prevpage = () => {
    curpage !== 1 ? setCurpage(curpage - 1) : "";
  };

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/exercises?pagination[page]=${curpage}&pagination[pageSize]=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setExercise(data.data);
      });
  }, [curpage]);

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
                  </HStack>
                </WrapItem>
              </Wrap>
            </WrapItem>
            {exercise.map((exc: any, index: number) => (
              <WrapItem key={index}>
                <ProductSimple data={exc.attributes} />
              </WrapItem>
            ))}
            <Wrap width="100%">
              <WrapItem>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  mr={5}
                  disabled={curpage <= 1 ? true : false}
                  onClick={prevpage}
                >
                  Previous
                </Button>
              </WrapItem>
              <WrapItem mr={5}>
                <Button
                  colorScheme="teal"
                  disabled={curpage >= totalpage ? true : false}
                  variant="solid"
                  onClick={nextpage}
                >
                  Next
                </Button>
              </WrapItem>
              <WrapItem>
                <Text ml={5} verticalAlign="center" color="white" fontSize="xl">
                  {curpage} of {totalpage} pages
                </Text>
              </WrapItem>
            </Wrap>
          </Wrap>
        }
      />
    </>
  );
};

export default List;
