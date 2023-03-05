import * as React from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export const HomePage = () => {
  const history = useHistory();
  const [address, setAddress] = React.useState<string>('');

  const goAccount = () => {
    if (address) {
      history.push(`/account/${address}`);
    }
  };

  return (<Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}>
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Find account
      </Heading>
      <FormControl id="email">
        <Input
          placeholder="iaa1zxtlyk7l6n3t46y....a7ar39m8uljcwrp5"
          _placeholder={{ color: 'gray.500' }}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <Stack spacing={6}>
        <Button
          height="var(--chakra-sizes-10)"
          fontSize={'md'}
          fontWeight="semibold"
          borderRadius={'50px'}
          color={'white'}
          bg="cyan.900"
          _hover={{
            bg: "gray.700",
          }}
          onClick={goAccount}>
          Search
        </Button>
      </Stack>
    </Stack>
  </Flex>)
}
