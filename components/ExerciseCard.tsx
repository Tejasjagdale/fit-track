import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  Tag,
  TagLabel,
  Flex,
  Wrap,
  Button,
} from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Link from "next/link";

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

export default function blogPostWithImage({ data }: any) {
  return (
    <Center>
      <Box
        maxW={"325px"}
        minH={"450px"}
        w={"full"}
        bg="#191A1C"
        color="white"
        rounded={"xl"}
        p={6}
        overflow={"hidden"}
        boxShadow="dark-lg"
      >
        <Box
          maxH={"160px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <ImageSlider hprop={"170px"}  slides={data.ext_img ? data.ext_img : []} />
        </Box>
        <Stack >
          <Text
            color="white"
            fontWeight={900}
            fontSize={"17"}
            fontFamily={"body"}
          >
            {data.exc_name}
          </Text>

          {data.Main_Muscle_Worked ? (
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
                    href={`http://localhost:3000/exercise/muscle/${data.Main_Muscle_Worked}`}
                    passHref
                  >
                    {data.Main_Muscle_Worked}
                  </Link>
                </TagLabel>
              </Tag>
            </Wrap>
          ) : (
            ""
          )}

          {data.Equipment ? (
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
                    href={`http://localhost:3000/exercise/equipment/${data.Equipment}`}
                    passHref
                  >
                    {data.Equipment}
                  </Link>
                </TagLabel>
              </Tag>
            </Wrap>
          ) : (
            ""
          )}

          {data.Type ? (
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
                    href={`http://localhost:3000/exercise/type/${data.Type}`}
                    passHref
                  >
                    {data.Type}
                  </Link>
                </TagLabel>
              </Tag>
            </Wrap>
          ) : (
            ""
          )}

          {data.Level ? (
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
                    href={`http://localhost:3000/exercise/level/${data.Level}`}
                    passHref
                  >
                    {data.Level}
                  </Link>
                </TagLabel>
              </Tag>
            </Wrap>
          ) : (
            ""
          )}

          <Wrap>
            <Rating rating={4} numReviews={94} />
          </Wrap>

          <Wrap>
            <Link href={`http://localhost:3000/exercise/${data.slug}`} passHref>
              <Button
                bgColor="#2CCCA8"
                color="white"
                _hover={{ bg: "#2CCCA8" }}
                size="sm"
              >
                Read More...
              </Button>
            </Link>
          </Wrap>
        </Stack>
      </Box>
    </Center>
  );
}
