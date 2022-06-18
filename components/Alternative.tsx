import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import ImageSlider from "./ImageSlider";

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

export default function SocialProfileWithImageHorizontal({ data }: any) {
  return (
    <Center w={{ md: "600px", sm: "300px" }}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w="100%"
        // height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg="white"
        boxShadow={"2xl"}
      >
        <Center w={{ md: "50%", sm: "100%" }} height="fit-content">
          <ImageSlider slides={data.ext_img} />
        </Center>

        <Center w={{ md: "50%", sm: "100%" }} height="fit-content">
          <Stack color="black">
            <Text
              color="#161B25"
              fontWeight={900}
              textColor="#161B25"
              fontSize={"17"}
              fontFamily={"body"}
            >
              {data.exc_name}
            </Text>
            <Wrap>
              <Text mr={1}>Muscle Targeted :</Text>
              <Tag size={"md"} borderRadius="full" variant="solid" bg="#9933FF">
                <TagLabel>
                  <Link href={"#"} passHref>
                    {data.Main_Muscle_Worked}
                  </Link>
                </TagLabel>
              </Tag>
            </Wrap>

            <Wrap>
              <Text mr={1}>Equipment Type :</Text>
              <Tag size={"md"} borderRadius="full" variant="solid" bg="#202124">
                <TagLabel>
                  <Link href={"#"} passHref>
                    {data.Equipment}
                  </Link>
                </TagLabel>
              </Tag>
            </Wrap>

            <Wrap>
              <Rating rating={4} numReviews={94} />
            </Wrap>
            <Wrap pb={5}>
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}/exercise/${data.slug}`}
                passHref
              >
                <Button
                  bgColor="#2CCCA8"
                  color="white"
                  _hover={{ bg: "#2CCCA8" }}
                  size="sm"
                >
                  View More...
                </Button>
              </Link>
            </Wrap>
          </Stack>
        </Center>
      </Stack>
    </Center>
  );
}
