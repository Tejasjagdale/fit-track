import {
  Box,
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
  Image,
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
import ProductSimple from "../../../components/ExerciseCard";
import { AiFillFilter } from "react-icons/ai";
import { useRouter } from "next/router";

const List = ({ totalPage, exercises }: any) => {
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
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();
  const type = router.query.type;

  useEffect(() => {
    setTotalpage(totalPage);
    setExercise(exercises);
    setIsloading(true);
  }, [exercises, totalPage]);

  const nextpage = () => {
    curpage !== totalpage ? setCurpage(curpage + 1) : "";
  };

  const prevpage = () => {
    curpage !== 1 ? setCurpage(curpage - 1) : "";
  };

  useEffect(() => {
    setIsloading(false);
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?filters[Type]=${type}&&pagination[page]=${curpage}&pagination[pageSize]=10`
    )
      .then((response) => response.json())
      .then((data) => {
        setExercise(data.data);
        setIsloading(true);
      });
  }, [curpage, type]);

  return (
    <>
    <title>Fit-Track(exercises)</title>

      <NavBar
        // eslint-disable-next-line react/no-children-prop
        children={
          isloading ? (
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
          ) : (
            <Wrap
              justify="center"
              align="center"
              background="#1E2225"
              width="100%"
              height="100%"
            >
              <Box width="25%" height="25%">
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}/loader3.gif`}
                  alt={"Dan Abramov"}
                />
              </Box>
            </Wrap>
          )
        }
      />
    </>
  );
};

export default List;

export async function getServerSideProps(context: { query: { type: any } }) {
  let req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?filters[Type]=${context.query.type}&&pagination[page]=1&pagination[pageSize]=10`
  );
  let output: any = await req.json();

  return {
    props: {
      totalPage: output.meta.pagination.pageCount,
      exercises: output.data,
    }, // will be passed to the page component as props
  };
}
