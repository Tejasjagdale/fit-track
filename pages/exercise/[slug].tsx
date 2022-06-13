import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Tag,
  TagLabel,
  Text,
  useClipboard,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import NavBar from "../../components/NavBar";
import ImageSlider from "../../components/ImageSlider";
import SocialProfileWithImageHorizontal from "../../components/Card2";
import Router, { useRouter } from "next/router";

const name = ({ exercise }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const Slug: any = router.query.slug;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { hasCopied, onCopy } = useClipboard(Slug);

  return (
    <>
      <NavBar
        // eslint-disable-next-line react/no-children-prop
        children={
          exercise ? (
            <Wrap width="100%" p={15} bg="#1E2225" color="white" spacingY="10">
              <WrapItem display={{ md: "block" }}>
                <Text
                  fontWeight={900}
                  fontSize={"17"}
                  fontFamily={"body"}
                  mb={3}
                >
                  {exercise.exc_name}
                </Text>

                {exercise.short_desc ? (
                  <Text fontFamily={"body"}>{exercise.short_desc}</Text>
                ) : (
                  ""
                )}
              </WrapItem>

              <WrapItem>
                {exercise.benifits ? (
                  <Wrap>
                    <WrapItem width="100%">
                      <Text
                        fontWeight={900}
                        fontSize={"17"}
                        fontFamily={"body"}
                      >
                        Benefits
                      </Text>
                    </WrapItem>
                    <WrapItem>
                      <List spacing={3}>
                        {exercise.benifits.map(
                          (point: string, index: number) => (
                            <ListItem key={index}>
                              <ListIcon as={MdCheckCircle} color="green.500" />
                              {point}
                            </ListItem>
                          )
                        )}
                      </List>
                    </WrapItem>
                  </Wrap>
                ) : (
                  ""
                )}
              </WrapItem>

              <WrapItem width="100%">
                <Wrap width="100%">
                  {exercise.video_src ? (
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
                        title={`${exercise.exc_name} video`}
                        controls
                        preload="metadata"
                        src={`${exercise.video_src}`}
                        style={{
                          objectFit: "fill",
                          border: "2px solid white",
                          width: "400px",
                          height: "auto",
                        }}
                      />
                    </Center>
                  ) : (
                    ""
                  )}

                  <Box width={{ md: "48%", sm: "100%" }} padding="10">
                    {exercise.Main_Muscle_Worked ? (
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
                              {exercise.Main_Muscle_Worked}
                            </Link>
                          </TagLabel>
                        </Tag>
                      </Wrap>
                    ) : (
                      ""
                    )}

                    {exercise.Equipment ? (
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
                              {exercise.Equipment}
                            </Link>
                          </TagLabel>
                        </Tag>
                      </Wrap>
                    ) : (
                      ""
                    )}

                    {exercise.Type ? (
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
                              {exercise.Type}
                            </Link>
                          </TagLabel>
                        </Tag>
                      </Wrap>
                    ) : (
                      ""
                    )}

                    {exercise.Level ? (
                      <>
                        <Wrap mb="2">
                          <Text fontSize={"17"} mr={1}>
                            Level :
                          </Text>
                          <Tag
                            fontSize={"14"}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="green"
                          >
                            <Link href={"#"} passHref>
                              <TagLabel>{exercise.Level}</TagLabel>
                            </Link>
                          </Tag>
                        </Wrap>

                        <Wrap>
                          <WrapItem w="100%">
                            <Text>Exercise code:</Text>
                          </WrapItem>

                          <Flex w="100%" mb={2}>
                            <Input isReadOnly color="white" value={Slug} />
                            <Button
                              bg={hasCopied ? "green.700" : "green.500"}
                              color="white"
                              _hover={{
                                bg: `${hasCopied ? "green.700" : "green.500"}`,
                              }}
                              onClick={onCopy}
                              ml={2}
                            >
                              {hasCopied ? "✔️ Copied" : "Copy"}
                            </Button>
                          </Flex>
                        </Wrap>
                      </>
                    ) : (
                      ""
                    )}
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
                <Center width={{ md: "48%", sm: "100%" }} mb="5" mt="5">
                  <ImageSlider hprop={"auto"} slides={exercise.ext_img} />
                </Center>
              </WrapItem>

              {exercise.instructions ? (
                <WrapItem width="100%" display={{ md: "block" }}>
                  <Text
                    fontWeight={900}
                    fontSize={"17"}
                    mb="8"
                    fontFamily={"body"}
                  >
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
                        {exercise.instructions.map(
                          (intro: string, index: number) => (
                            <ListItem key={index} mb={5}>
                              {intro}
                            </ListItem>
                          )
                        )}
                      </OrderedList>
                    </WrapItem>
                  </Wrap>
                </WrapItem>
              ) : (
                ""
              )}

              {exercise.related_excercises ? (
                <WrapItem width="100%" display={{ md: "block" }}>
                  <Text
                    fontWeight={900}
                    mb="6"
                    fontSize={"17"}
                    fontFamily={"body"}
                  >
                    Alternative Exercises for Decline Dumbbell Flyes
                  </Text>

                  <Wrap width="100%">
                    <WrapItem width="100%">
                      <Center width={{ md: "auto", sm: "100%" }}>
                        <SocialProfileWithImageHorizontal />
                      </Center>
                    </WrapItem>
                    <WrapItem width="100%">
                      <Center width={{ md: "auto", sm: "100%" }}>
                        <SocialProfileWithImageHorizontal />
                      </Center>
                    </WrapItem>
                    <WrapItem width="100%">
                      <Center width={{ md: "auto", sm: "100%" }}>
                        <SocialProfileWithImageHorizontal />
                      </Center>
                    </WrapItem>
                  </Wrap>
                </WrapItem>
              ) : (
                ""
              )}
            </Wrap>
          ) : (
            "loading.."
          )
        }
      />
    </>
  );
};

export default name;

export async function getServerSideProps(context: { query: { slug: any } }) {
  let req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/exercises?filters[slug]=${context.query.slug}`
  );
  let output: any = await req.json();

  return {
    props: { exercise: output.data[0].attributes }, // will be passed to the page component as props
  };
}
