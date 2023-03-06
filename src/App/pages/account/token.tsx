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
  Link,
  Spinner,
  VStack,
  useColorModeValue,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import {
  formatAddress,
  normalizeImg,
  useSdk,
} from "../../services";
import userLogo from "../../assets/user-default.svg";
import cosmverseLogo from "../../assets/cosmverse.jpg";
import { Nft } from "../../services/client/iris_nft";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const AccountToken = () => {
    const query = useQuery();
    const history = useHistory();
    const { nftClient, address } = useSdk();
    const [nft, setNft] = useState<Nft>();

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

    const goToIbcTransfer = () => {
      if (!nft) return;
      history.push(`/ibc-transfer?chain=${'iaa'}&cid=${nft.cid}&nid=${nft.id}`);
    };

    const loadingSkeleton = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

    const borderColor = useColorModeValue('cyan.900', 'white.200');
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
                        onClick={goToIbcTransfer}
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
      </Box>
    );
}


