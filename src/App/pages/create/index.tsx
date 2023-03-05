import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { TransactionLink } from "../../components"
import {
  useSdk,
} from "../../services";
import { MsgIssueDenom } from "../../proto/nft/tx";

export const Create = () => {
  const toast = useToast();
  const history = useHistory();
  const { getSignClient, address } = useSdk();
  const [denom, setDenom]= useState<string>();
  const [name, setName]= useState<string>();
  const [symbol, setSymbol]= useState<string>();
  const [data, setData]= useState<string>();
  const [description, setDescription]= useState<string>();
  const [loading, setLoading] = useBoolean();

  async function createCollection(e: any) {
    // TODO: use formik validations
    e.preventDefault();

    if (!address) {
      toast({
        title: "Account required.",
        description: "Please connect wallet.",
        status: "warning",
        position: "top",
        isClosable: true,
      });

      return;
    }

    if (!denom || !name || !symbol) {
      return;
    }

    setLoading.on();

    try {
      const msg = {
        typeUrl: '/irismod.nft.MsgIssueDenom',
        value: MsgIssueDenom.fromPartial({
          id: denom,
          name: name,
          schema: "",
          data: data ?? "",
          description: description ?? "",
          mintRestricted: false,
          updateRestricted: false,
          sender: address,
          symbol: symbol,
          uri: "",
          uriHash: ""
        })
      };

      const client = getSignClient()!;
      const res = await client.signAndBroadcast(address, [msg], 1.3, "Create collection");

      toast({
        title: `Successful Transaction`,
        description: (<TransactionLink tx={res.transactionHash} />),
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      setLoading.off();
      history.push(`/mint/nft?cid=${denom}`);
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
      setLoading.off();
    }
  }

  return (
  <Flex
    p={4}
    mb={8}
    justifyContent="center"
    direction="row">
    <Box maxW="500px" w="100%">
      <Box>
        <Box mt={6} mb={10}>
          <Heading as="h3" fontSize="3xl">Create collection</Heading>
        </Box>
        <Box as={'form'} id="nft-form" onSubmit={createCollection}>
        <Box mt={4}>
          <FormControl id="denom" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >Denom</FormLabel>
            <Input
              name="denom"
              spellCheck={false}
              onChange={e => setDenom(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormControl id="name" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >Name</FormLabel>
            <Input
              name="name"
              spellCheck={false}
              onChange={e => setName(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormControl id="symbol" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >Symbol</FormLabel>
            <Input
              name="symbol"
              spellCheck={false}
              onChange={e => setSymbol(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
            <FormControl id="data">
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Data</FormLabel>
              <Textarea name="data"
                spellCheck={false}
                onChange={e => setData(e.target.value)} />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl id="description">
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Description</FormLabel>
              <Textarea name="description"
                placeholder="Collection description"
                spellCheck={false}
                onChange={e => setDescription(e.target.value)} />
            </FormControl>
          </Box>
          <Box mt={6}>
            <Button
              isLoading={loading}
              loadingText="Creating"
              type="submit"
              height="var(--chakra-sizes-10)"
              fontSize={'md'}
              fontWeight="semibold"
              borderRadius={'50px'}
              color={'white'}
              bg="pink.500"
              _hover={{
                bg: "gray.500",
              }}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  </Flex>
  );
}
