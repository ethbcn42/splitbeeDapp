import { useSelector } from 'react-redux';
import {  Button,  useToast, ModalBody, ModalCloseButton, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader
} from '@chakra-ui/react';
import { networks } from '@/utils/constants';
import { switchNetwork } from '@/store/slices/web3/utils/connectUser';
import Image from 'next/image';
import { useState } from "react";

export const NetworkSelector = () => {
    const toast = useToast()
    const { address, network } = useSelector(state => state.web3)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectNetwork, setSelectNetwork] = useState(
      {logo: undefined,
      text: 'Choose network'
      }
    );

    const switchNet = async (chainId) => {
        //TOFIX: no está saltando metamask :(
        if (!window.ethereum) {
            return toast({
                title: 'Metamask is not installed',
                description: 'Please install Metamask',
                status: 'error',
                duration: 4200,
                isClosable: true,
                position: 'top'
            })
        }
        await switchNetwork(window.ethereum, chainId);
    }

    return (

        <>
        <Button 
          onClick={onOpen} 
          leftIcon={selectNetwork.logo ? <Image width="20" height="20" src={selectNetwork.logo}/> : null}
        >
          {selectNetwork.text}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Choose your prefer network</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {Object.keys(networks).map((chain) => {
                    const { chainName:name, chainId, logo } = networks[chain];
                    return(<Button 
                      leftIcon={<Image width="20" height="20" src={logo}/>} 
                      key={chainId } 
                      width="100%"
                      mb="2"
                      onClick={() => {
                        switchNet(chainId); 
                        onClose();
                        setSelectNetwork({logo, text: name})
                      }}
                    >{name}</Button>)    
                })}
           </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
};
export default NetworkSelector;