// return convereted data
import { RepeatIcon } from "@chakra-ui/icons";
import {
  chakra,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ChangeEvent, ReactNode, useState } from "react";

const ConvertButton = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <chakra.button
      // bg={"blackAlpha.100"}
      border={"1px solid lightgray"}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
interface MainTableProps {
  tempObject: object;
}

export default function Converter({ tempObject }: MainTableProps) {
  const [amount, setAmount] = useState<any>(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");

  const [error, setError] = useState(false);

  function convertPrice(amount: number, from, to) {
    let fromUSD = 1;
    let toUSD = 1;
    if (from === "USD") fromUSD = 1;
    else {
      fromUSD = tempObject[from]["priceUSD"];
    }
    if (to === "USD") toUSD = 1;
    else {
      toUSD = tempObject[to]["priceUSD"];
    }

    return (amount * fromUSD) / toUSD;
  }

  function FromHandleChange(e) {
    setFrom(e.target.value);
    console.log(from);
  }

  function ToHandleChange(e) {
    setTo(e.target.value);
    console.log(from);
  }
  return (
    <Flex
      minH={"40vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container
        maxW={"4xl"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        direction={"column"}
      >
        <Heading as={"h2"} fontSize={{ base: "xl", sm: "2xl" }} mb={5}>
          Convert Zcash
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          // as={"form"}
          spacing={"12px"}
        >
          <FormControl>
            <FormLabel> Amount</FormLabel>
            <InputGroup>
              <Input
                placeholder="1"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
              />
            </InputGroup>
          </FormControl>

          <FormControl w={{ base: "100%" }}>
            <FormLabel htmlFor="to">From</FormLabel>
            <Select onChange={FromHandleChange} value={from}>
              <option value="USD">🇺🇸 USD - US Dollar</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Tether">Tether</option>
              <option value="BNB">BNB</option>
              <option value="Zcash">Zcash</option>
            </Select>
          </FormControl>

          <FormControl w={{ base: "10%" }}>
            <div style={{ height: "37px", width: "1px" }} />
            <ConvertButton label={"convert"}>
              <RepeatIcon color="blue.500" />
            </ConvertButton>
          </FormControl>

          <FormControl w={{ base: "100%" }}>
            <FormLabel htmlFor="to">To</FormLabel>
            <Select onChange={ToHandleChange} value={to}>
              <option value="USD">🇺🇸 USD - US Dollar</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Tether">Tether</option>
              <option value="BNB">BNB</option>
              <option value="Zcash">Zcash</option>
            </Select>
          </FormControl>
        </Stack>
        <Text mt={2}>
          {amount} {from} = {convertPrice(amount, from, to)} {to}
        </Text>
        <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
        >
          {error
            ? "Oh no an error occured! 😢 Please try again later."
            : "Using midmarket rates ✌️"}
        </Text>
      </Container>
    </Flex>
  );
}
