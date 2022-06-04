import {
  Box,
  Center,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Tag,
  TagLabel,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { MdCheckCircle } from "react-icons/md";
import NavBar from "../components/NavBar";
import ImageSlider from "../components/ImageSlider";
import SocialProfileWithImageHorizontal from "../components/Card2";

const name = () => {
  let Slides: string[] = [
    "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/l/742_1.jpg",
    "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/l/742_2.jpg",
  ];

  return (
    <>
      <NavBar
        // eslint-disable-next-line react/no-children-prop
        children={
          <Wrap width="100%" p={15} bg="#1A202C" color="white" spacingY="10">
            <WrapItem display={{ md: "block" }}>
              <Text fontWeight={900} fontSize={"17"} fontFamily={"body"} mb={3}>
                Rickshaw Carry
              </Text>

              <Text fontFamily={"body"}>
                The decline dumbbell chest fly is an upper body isolation
                exercise targeting the lower chest. It will require less weight
                than a decline press, which makes it a great hypertrophy
                exercise with high reps.
              </Text>
            </WrapItem>

            <WrapItem>
              <Wrap>
                <WrapItem width="100%">
                  <Text fontWeight={900} fontSize={"17"} fontFamily={"body"}>
                    Benefits
                  </Text>
                </WrapItem>
                <WrapItem>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      Builds size in the lower pecs
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      Works the triceps, anterior delts, and core
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      Positioning on the bench makes for better isolation and
                      limiting excess momentum
                    </ListItem>
                  </List>
                </WrapItem>
              </Wrap>
            </WrapItem>

            <WrapItem width="100%">
              <Wrap width="100%">
                <Center
                  width={{ md: "48%", sm: "100%" }}
                  padding={{ base: "10", md: "5", xs: "2" }}
                >
                  <video
                    className="jw-video jw-reset"
                    tabIndex={-1}
                    disableRemotePlayback
                    webkit-playsinline=""
                    playsInline
                    title="Rickshaw Carry video"
                    controls
                    preload="metadata"
                    // src="https://content.jwplatform.com/videos/Z0QJXHUJ-1zuboWt3.mp4"
                    style={{
                      objectFit: "fill",
                      border: "2px solid white",
                      width: "400px",
                      height: "auto",
                    }}
                  />
                </Center>

                <Box width={{ md: "48%", sm: "100%" }} padding="10">
                  <Wrap mb="2">
                    <Text fontSize={"17"} mr={1}>
                      Muscle Targeted :
                    </Text>
                    <Tag
                      fontSize={"14"}
                      borderRadius="full"
                      variant="solid"
                      bg="#9933FF"
                    >
                      <TagLabel>
                        <Link href={"#"} passHref>
                          Forearms
                        </Link>
                      </TagLabel>
                    </Tag>
                  </Wrap>

                  <Wrap mb="2">
                    <Text fontSize={"17"} mr={1}>
                      Equipment Type :
                    </Text>
                    <Tag
                      fontSize={"14"}
                      borderRadius="full"
                      variant="solid"
                      bg="blue.500"
                    >
                      <TagLabel>
                        <Link href={"#"} passHref>
                          Other
                        </Link>
                      </TagLabel>
                    </Tag>
                  </Wrap>

                  <Wrap mb="2">
                    <Text fontSize={"17"} mr={1}>
                      Type:
                    </Text>
                    <Tag
                      fontSize={"14"}
                      borderRadius="full"
                      variant="solid"
                      bg="yellow.500"
                    >
                      <TagLabel>
                        <Link href={"#"} passHref>
                          Strongman
                        </Link>
                      </TagLabel>
                    </Tag>
                  </Wrap>

                  <Wrap mb="2">
                    <Text fontSize={"17"} mr={1}>
                      Level :{" "}
                    </Text>
                    <Tag
                      fontSize={"14"}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <Link href={"#"} passHref>
                        <TagLabel>Beginner</TagLabel>
                      </Link>
                    </Tag>
                  </Wrap>
                </Box>
              </Wrap>
            </WrapItem>

            <WrapItem width="100%" display={{ md: "block" }}>
              <Text
                fontWeight={900}
                fontSize={"17"}
                width="100%"
                fontFamily={"body"}
                mb="7"
              >
                Decline Dumbbell Flyes Images
              </Text>
              <Center width={{ md: "48%", sm: "100%" }}  mb="5"  mt="5">
                <ImageSlider slides={Slides} />
              </Center>
            </WrapItem>

            <WrapItem width="100%" display={{ md: "block" }}>
              <Text fontWeight={900} fontSize={"17"} mb="8" fontFamily={"body"}>
                Decline Dumbbell Flyes Instructions
              </Text>

              <Wrap width="100%">
                <WrapItem width={{ md: "48%", sm: "100%" }}>
                  <Center width="100%" mb="5" mt="5">
                    <Image
                      alt="image"
                      src="https://artifacts.bbcomcdn.com/@bbcom/exercises-app/2.1.2/img/guide-1.gif"
                    />
                  </Center>
                </WrapItem>

                <WrapItem width={{ md: "48%", sm: "100%" }}>
                  <OrderedList>
                    <ListItem>
                      Secure your legs at the end of the decline bench and lie
                      down with a dumbbell on each hand on top of your thighs.
                      The palms of your hand will be facing each other.
                    </ListItem>
                    <ListItem>
                      Once you are laying down, move the dumbbells in front of
                      you at shoulder width. The palms of the hands should be
                      facing each other and the arms should be perpendicular to
                      the floor and fully extended. This will be your starting
                      position.
                    </ListItem>
                    <ListItem>
                      With a slight bend on your elbows in order to prevent
                      stress at the biceps tendon, lower your arms out at both
                      sides in a wide arc until you feel a stretch on your
                      chest. Breathe in as you perform this portion of the
                      movement. Tip: Keep in mind that throughout the movement,
                      the arms should remain stationary; the movement should
                      only occur at the shoulder joint
                    </ListItem>
                    <ListItem>
                      Return your arms back to the starting position as you
                      squeeze your chest muscles and breathe out. Tip: Make sure
                      to use the same arc of motion used to lower the weights.
                    </ListItem>
                  </OrderedList>
                </WrapItem>
              </Wrap>
            </WrapItem>

            <WrapItem width="100%" display={{ md: "block" }}>
              <Text fontWeight={900} mb="6" fontSize={"17"} fontFamily={"body"}>
                Alternative Exercises for Decline Dumbbell Flyes
              </Text>

              <Wrap width="100%">
                <WrapItem width="100%">
                  <Center width={{ md:"auto",sm:"100%" }}>
                    <SocialProfileWithImageHorizontal />
                  </Center>
                </WrapItem>
                <WrapItem width="100%">
                  <Center width={{ md:"auto",sm:"100%" }}>
                    <SocialProfileWithImageHorizontal />
                  </Center>
                </WrapItem>
                <WrapItem width="100%">
                  <Center width={{ md:"auto",sm:"100%" }}>
                    <SocialProfileWithImageHorizontal />
                  </Center>
                </WrapItem>
              </Wrap>
            </WrapItem>
          </Wrap>
        }
      />
    </>
  );
};

export default name;
