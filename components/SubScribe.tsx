import {
  Button,
  Container,
  Flex,
  FormControl,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SplitWithImage() {
  const [email, setEmail] = useState("");

  return (
    <Container maxW={"4xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4} marginTop={12}>
          <Text fontSize={"2xl"}>Be the first to know about Zcash</Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            Get crypto analysis, news and updates right to your inbox! Sign up
            here so you don&apos;t miss a single newssletter.
          </Text>
          <HStack display="flex">
            <FormControl>
              <Input placeholder="Your email" />
            </FormControl>
            <Button colorScheme={"orange"}>Submit</Button>
          </HStack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"undraw_Newsletter_re_wrob.png"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
