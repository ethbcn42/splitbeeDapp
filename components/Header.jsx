/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Flex,
  Grid,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
//import ConnectButtonWeb3 from './Web3/ConnectButton';

import dynamic from 'next/dynamic';

import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';

// dynamic import for web3 connect button
const ConnectButtonWeb3 = dynamic(() => import('./Web3/Web3ConnectButton'), {
  ssr: false,
});

const NetworkSelector = dynamic(() => import('./Web3/NetworkSelector'), {
  ssr: false,
});

const Header = () => {
  return (
    
      <Box as="header" bg={useColorModeValue('#ffffff', '#000000')} shadow={"lg"} px={4}>
        <HStack h={16} alignItems="center" justifyContent={'space-between'}>
          <Logo />
          
          <HStack spacing={8} alignItems={'center'}>
            <HStack spacing={2} alignItems={'center'}>
              <NetworkSelector />
              <ConnectButtonWeb3 />
            </HStack>
          </HStack>
        </HStack>
      </Box>
  );
}

export default Header;
