import * as React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  assertTxSuccess,
  useSdk,
} from "../../services";
import { MsgMintNFT } from "../../proto/nft/tx";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const MintNFT = () => {
  const query = useQuery();
  const toast = useToast();
  const history = useHistory();
  const { getSignClient, address } = useSdk();
  const [denom, setDenom]= useState<string>();
  const [classId, setClassId]= useState<string>(query.get("cid") ?? "");
  const [name, setName]= useState<string>();
  const [data, setData]= useState<string>();
  const [uri, setUri]= useState<string>();
  const [loading, setLoading] = useBoolean();

  async function createNft(e: any) {
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

    if (!denom || !name || !classId) {
      return;
    }

    setLoading.on();

    try {
      const msg = {
        typeUrl: '/irismod.nft.MsgMintNFT',
        value: MsgMintNFT.fromPartial({
          id: denom,
          denomId: classId,
          name: name,
          data: data ?? "",
          uri: uri,
          uriHash: "",
          sender: address,
          recipient: address,
        })
      };

      const client = getSignClient()!;
      const res = await client.signAndBroadcast(address, [msg], 1.3, "");
      assertTxSuccess(res);

      toast({
        title: `Successful Transaction`,
        description: (<TransactionLink tx={res.transactionHash} />),
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      setLoading.off();
      history.push(`/tokens?cid=${classId}&nid=${denom}`);
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
          <Heading as="h3" fontSize="3xl">Mint NFT</Heading>
        </Box>
        <Box as={'form'} id="nft-form" onSubmit={createNft}>
        <Box mt={4}>
          <FormControl id="id" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >ID</FormLabel>
            <Input
              name="id"
              spellCheck={false}
              onChange={e => setDenom(e.target.value)} />
          </FormControl>
        </Box>
        <Box mt={4}>
          <FormControl id="class" isRequired>
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >ClassID</FormLabel>
            <Input
              name="class"
              value={classId}
              spellCheck={false}
              onChange={e => setClassId(e.target.value)} />
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
          <FormControl id="uri">
            <FormLabel
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold"
            >URI</FormLabel>
            <Input
              name="symbol"
              spellCheck={false}
              onChange={e => setUri(e.target.value)} />
          </FormControl>
        </Box>
          <Box mt={6}>
            <Button
              isLoading={loading}
              loadingText="Minting"
              type="submit"
              height="var(--chakra-sizes-10)"
              fontSize={'md'}
              fontWeight="semibold"
              borderRadius={'50px'}
              color={'white'}
              bg="cyan.900"
              _hover={{
                bg: "gray.500",
              }}>
              Mint
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  </Flex>
  );
}
