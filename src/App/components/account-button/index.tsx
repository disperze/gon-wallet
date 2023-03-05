import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Button,
  useColorModeValue,
  Avatar,
  useBoolean,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
  Box,
  chakra,
  VStack,
  Text,
  GridItem,
  Grid,
  Flex,
  Badge,
  useDisclosure,
  PopoverFooter,
  PopoverBody,
  Divider,
} from '@chakra-ui/react';
import { MdAccountBalanceWallet } from "react-icons/md";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useSdk } from "../../services/client/wallet";
import { config } from "../../../config";
import {
  configKeplr,
  loadKeplrWallet,
  WalletLoader,
  formatAddress,
  formatPrice,
  getTokenConfig,
} from "../../services";
import userLogo from "../../assets/user-default.svg";

export function AccountButton(): JSX.Element {
  const sdk = useSdk();
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [loading, setLoading] = useBoolean();

  async function init(loadWallet: WalletLoader) {
    const signer = await loadWallet(config.chainId, config.addressPrefix);
    sdk.init(signer);
  }

  async function connectKeplr() {
    setLoading.on();
    const anyWindow = window as any;
    try {
      await anyWindow.keplr?.experimentalSuggestChain(configKeplr(config));
      await anyWindow.keplr?.enable(config.chainId);
      await init(loadKeplrWallet);
    } catch (error) {
      setLoading.off();
      console.error(error);
    }
  }

  const loginButton = (
    <Button
      isLoading={loading}
      loadingText="Connecting..."
      rightIcon={<MdAccountBalanceWallet />}
      fontSize={'sm'}
      fontWeight={500}
      variant={'outline'}
      borderRadius="50px"
      height="var(--chakra-sizes-8)"
      marginTop={"4px"}
      borderColor={useColorModeValue('cyan.900', 'white.200')}
      onClick={connectKeplr}
    >
      Connect wallet
    </Button>
  );

  const SourceCodeLink = (props: any) => {
    return (
      <Box
        p={1}
        rounded={6}
        _hover={{
          bg: useColorModeValue('gray.500', 'cyan.900'),
        }}>
        <Link
          fontSize={'md'}
          href={props.href}
          isExternal
          _hover={{
            textDecoration: 'none',
          }}>
          {props.label} <ExternalLinkIcon mx='2px' />
        </Link>
      </Box>
    );
  };

  const MenuLink = (props: any) => {
    return (
      <Box
        p={1}
        rounded={6}
        _hover={{
          bg: useColorModeValue('gray.500', 'cyan.900'),
        }}>
        <Link
          fontSize={'md'}
          as={ReactRouterLink}
          to={props.href}
          onClick={onClose}
          _hover={{
            textDecoration: 'none',
          }}>
          {props.label}
        </Link>
      </Box>
    );
  };

  const BalanceItem = (props: any) => {
    const coin = getTokenConfig(props.coin.denom);

    if (!coin) return (<></>);

    return (
      <Grid templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Flex h="full" justifyContent="center" alignItems="center">
            <Avatar size="sm" name={coin.name} src={coin.logo} />
          </Flex>
        </GridItem>
        <GridItem colSpan={8} textAlign="left">
          <chakra.p
            fontSize="xs"
          >Balance</chakra.p>
          <chakra.p fontWeight="semibold">
            {formatPrice(props.coin)}
          </chakra.p>
        </GridItem>
      </Grid>
    );
  };

  const accountBox = (
    <Popover
      isOpen={isOpen}
      placement="bottom-start"
      onOpen={onOpen}
      onClose={onClose}>
      <PopoverTrigger>
        <Avatar cursor="pointer" size="sm" name="Juno" src={userLogo} />
      </PopoverTrigger>
      <PopoverContent
        mt="0.5rem"
        maxW="sm"
        bg={useColorModeValue('white', 'gray.500')}
      >
        <PopoverBody p={0}>
          <VStack
            px={8}
            pt={6}
            pb={3}
            align="left"
          >
            <Box>
              <Badge fontSize="0.6rem" variant="outline" colorScheme="orange">
                GoN Testnet
              </Badge>
              <Text fontSize="md" fontWeight="semibold">{formatAddress(sdk.address)}</Text>
            </Box>
            <Box py={2}>
              {sdk.balance.map(coin => (
                <BalanceItem key={coin.denom} coin={coin} />
              ))}
            </Box>
          </VStack>
        </PopoverBody>
        <PopoverFooter p={0}>
          <Box px={8} pb={6} pt={3}>
            <MenuLink href={`/account/${sdk.address}`} label="My NFTs" />
          </Box>
        </PopoverFooter>
        <Divider />
        <PopoverFooter p={0}>
          <Box px={8} pb={6} pt={3}>
            <SourceCodeLink href={`https://github.com/disperze/gon-wallet`} label="Source code" />
          </Box>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );

  return sdk.address ? accountBox : loginButton;
}
