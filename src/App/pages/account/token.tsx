import * as React from "react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link as ReactRouterLink, useLocation, useHistory } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Spinner,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  GridItem,
  useDisclosure,
  useToast,
  useBoolean,
  Grid,
} from "@chakra-ui/react";
import {
  formatAddress,
  useSdk,
} from "../../services";
import userLogo from "../../assets/user-default.svg";
import cosmverseLogo from "../../assets/cosmverse.jpg";
import { Nft } from "../../services/client/iris_nft";
import { MsgTransfer } from "../../proto/nft_transfer/tx";
import { TransactionLink } from "../../components";
import { fromBech32 } from "@cosmjs/encoding";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const AccountToken = () => {
    const query = useQuery();
    const history = useHistory();
    const { config, nftClient, address, getSignClient } = useSdk();
    const [nft, setNft] = useState<Nft>();
    const [loading, setLoading] = useBoolean();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [recipient, setRecipient] = useState<string>();

    const normalizeImg = (uri: string) => {
      return uri?.endsWith(".png") || uri?.endsWith(".jpg") || uri?.endsWith(".jpeg") ? uri : "";
    };

    const loadData = useCallback(async () => {
      if (!nftClient) return;

      const cid = query.get("cid");
      const id = query.get("nid");
      if (!cid || !id) return;

      const nft = await nftClient.getNFT(cid, id);
      setNft(nft);
    }, [nftClient, query]);

    useEffect(() => {
      loadData();
    }, [loadData]);

    const handleTransfer = async () => {
      const signClient = getSignClient();
      if (!signClient) {
        toast({
          title: "Account required.",
          description: "Please, connect wallet.",
          status: "warning",
          position: "top",
          isClosable: true,
        });

        return;
      }

      if (!nft || !recipient) return;
      try {
        const { prefix } = fromBech32(recipient);
        const ibcParams = config.channels?.find((c) => c.id === prefix)
        if (!ibcParams) {
          throw new Error("Invalid recipient address");
        }
        onClose();
        setLoading.on();

        const d = new Date();
        d.setMinutes(d.getMinutes() + 10);

        const msg = {
          typeUrl: "/ibc.applications.nft_transfer.v1.MsgTransfer",
          value: MsgTransfer.fromPartial({
            classId: nft.cid,
            tokenIds: [nft.id],
            sender: address,
            receiver: recipient,
            sourceChannel: ibcParams.channel,
            sourcePort: ibcParams.port,
            timeoutHeight: {revisionHeight: 0, revisionNumber: 0},
            timeoutTimestamp: d.getTime() * 1000000, // nanoseconds
          })
        };

        const res = await signClient.signAndBroadcast(address, [msg], 1.2, "GoN");
        toast({
          title: `Successful Transaction`,
          description: (<TransactionLink tx={res.transactionHash} />),
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });

        history.push(`/account/${address}`);
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
      finally {
        setLoading.off();
      }
    };


    const loadingSkeleton = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

    const borderColor = useColorModeValue('cyan.900', 'white.200');
    const priceModal = (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>IBC NFT Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontFamily="mono" fontWeight="semibold">Recipient</FormLabel>
            <FormControl as={GridItem} colSpan={[6, 4]}>
              <Input placeholder='juno1... stars1...' onChange={(event) => setRecipient(event.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleTransfer} colorScheme="cyan" mr={3}>
              Transfer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
    return (
      <Box m={5}>
        {!nft ? loadingSkeleton : (
          <Grid minH="80vh"
            gridTemplateColumns={{
              sm: "repeat(1, minmax(0px, 1fr))",
              md: "repeat(8, minmax(0px, 1fr))"
            }}>
            <GridItem colSpan={5}>
              <Flex
                h="full"
                justifyContent="center"
                alignItems="center">
                <Image
                  bgGradient="linear(to-r, cyan.200, white.200)"
                  roundedTop="md"
                  boxSize="420px"
                  fit="cover"
                  fallbackSrc={cosmverseLogo}
                  src={normalizeImg(nft.uri)}
                  alt={nft.name} />
              </Flex>
            </GridItem>
            <GridItem colSpan={3}>
              <Flex h="80vh">
                <VStack spacing={6} align="stretch">
                  <Box py={2}>
                    <chakra.h1
                      fontWeight="bold"
                      fontSize="3xl"
                    >
                      {nft.name || nft.id}
                    </chakra.h1>
                    <chakra.p
                      mt={1}
                      maxW="400px"
                      fontSize="md"
                    >
                      {nft.data}
                    </chakra.p>
                    <chakra.p
                      mt={1}
                      maxW="400px"
                      fontSize="md"
                    >
                      <strong>URI:</strong> {nft.uri}
                    </chakra.p>
                  </Box>
                  <Box>
                    <VStack spacing={2} align="stretch">
                      <Box>
                        <chakra.p
                          fontFamily="mono"
                          fontSize="md"
                          color="gray.500"
                        >
                          Owner
                        </chakra.p>
                      </Box>
                      <Box>
                        <HStack>
                          <Avatar size="sm" name="Juno" src={userLogo} />
                          <Link
                            fontSize="md"
                            fontWeight="semibold"
                            _hover={{
                              color: "gray.600",
                            }}
                            as={ReactRouterLink}
                            to={`/account/${nft.owner}`}>{formatAddress(nft.owner)}</Link>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                  <Box py={6}
                    borderTop={1}
                    borderStyle={'solid'}
                    borderColor={borderColor}>
                    { address === nft.owner && <Button
                        isLoading={loading}
                        onClick={onOpen}
                        type="button"
                        height="var(--chakra-sizes-10)"
                        fontSize={'md'}
                        fontWeight="semibold"
                        borderRadius={'50px'}
                        color={'white'}
                        bg="cyan.900"
                        _hover={{
                          bg: "gray.700",
                        }}>
                        IBC Transfer
                      </Button>
                  }
                  </Box>
                </VStack>
              </Flex>
            </GridItem>
          </Grid>
      )}
      {priceModal}
      </Box>
    );
}
