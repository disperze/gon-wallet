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
import { Bech32, toHex } from "@cosmjs/encoding";
import { FileUpload, TransactionLink } from "../../components"
import {
  CW721,
  unSanitizeIpfsUrl,
  uploadFile,
  useSdk,
} from "../../services";
import { config } from "../../../config";

function generateId(address: string) {
  // TODO: Format ID?
  const pubkey = toHex(Bech32.decode(address).data);
  return (
    pubkey?.substr(2, 10) +
    pubkey?.substring(pubkey.length - 8) +
    '-' +
    Math.random().toString(36).substr(2, 9)
  ).toUpperCase();
}

export const Create = () => {
  const toast = useToast();
  const history = useHistory();
  const { getSignClient, address } = useSdk();
  const [files, setFiles] = useState<File[]>();
  const [nftName, setNftName]= useState<string>();
  const [description, setDescription]= useState<string>();
  const [loading, setLoading] = useBoolean();

  async function createNft(e: any) {
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

    if (!files || files.length === 0) {
      return;
    }

    setLoading.on();
    // TODO: Load on init page and show after load page
    const nftId = generateId(address);

    try {
      const fileHash = await uploadFile(files[0]);
      console.log(fileHash, nftId);
      const nftMsg = {
        token_id: nftId,
        owner: address,
        name: nftName!,
        description: description,
        image: unSanitizeIpfsUrl(fileHash)
      };

      const contract = CW721(config.contract).useTx(getSignClient()!);
      const txHash = await contract.mint(address, nftMsg);

      toast({
        title: `Successful Transaction`,
        description: (<TransactionLink tx={txHash} />),
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      setLoading.off();
      history.push(`/account/token/${nftId}`);
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
          <Heading as="h3" fontSize="3xl">Create a single NFT</Heading>
        </Box>
        <Box as={'form'} id="nft-form" onSubmit={createNft}>
        <Box>
            <FormControl id="name" isRequired>
              <FormLabel
                fontSize="sm"
                fontFamily="mono"
                fontWeight="semibold"
              >Image</FormLabel>
              <FileUpload accept="image/*" onDrop={acceptedFiles => setFiles(acceptedFiles)} />
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
                onChange={e => setNftName(e.target.value)} />
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
                placeholder="NFT description"
                spellCheck={false}
                onChange={e => setDescription(e.target.value)} />
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
