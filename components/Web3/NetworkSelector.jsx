import { useSelector } from 'react-redux';
import chakra, {
    Button, useToast, ModalBody, ModalCloseButton, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader, HStack
} from '@chakra-ui/react';
import { networks } from '@/utils/constants';
import { switchNetwork, addNetwork, getProvider, getNetwork } from '@/store/slices/web3/utils/connectUser';
import Image from 'next/image';
import { useEffect, useState } from "react";

export const NetworkSelector = () => {
    const toast = useToast()
    const { address, network } = useSelector(state => state.web3)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const provider = getProvider(window.ethereum);
    const [selectNetwork, setSelectNetwork] = useState(
        {
            logo: undefined,
            text: "👍 🕸",
        }
    );

    function handleOpen() {
        if (!window.ethereum) {
            return toast({
                title: 'Metamask is not installed',
                description: 'Please install Metamask to choose a network',
                status: 'error',
                duration: 4200,
                isClosable: true,
                position: 'top'
            })
        }
        onOpen();
    }

    useEffect(() => {
        async function asyncCall() {
            if (!window.ethereum) {
                return;
            }
            const net = await getNetwork(provider);
            console.log({ net });
            const chainId = parseInt(net.chainId);
            console.log(chainId)
            setSelectNetwork({
                ...selectNetwork,
                logo: networks[chainId]?.logo ?? undefined,
                text: networks[chainId]?.chainName ?? "👍 🕸",
            })
        }
        asyncCall();
    }, []);

    const switchNet = async (chainId) => {
        //TOFIX: no está saltando metamask :(
        if (!window.ethereum) {
            return toast({
                title: 'Metamask is not installed',
                description: 'Please install Metamask to switch network',
                status: 'error',
                duration: 4200,
                isClosable: true,
                position: 'top'
            })
        }
        await switchNetwork(window.ethereum, chainId, toast);
    }
    const addNet = async (chainId) => {
        //TOFIX: no está saltando metamask :(
        if (!window.ethereum) {
            return toast({
                title: 'Metamask is not installed',
                description: 'Please install Metamask to add network',
                status: 'error',
                duration: 4200,
                isClosable: true,
                position: 'top'
            })
        }
        await addNetwork(window.ethereum, chainId, toast);
    }


    return (
        <>
            <Button
                size={'sm'}
                p=".5"

                onClick={handleOpen}
            >
                {selectNetwork.logo ? <img width={42} src={selectNetwork.logo} /> : selectNetwork.text}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Choose your prefer network</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {Object.keys(networks).map((chain) => {
                            const { chainName: name, chainId, logo } = networks[chain];
                            return (
                                <HStack>
                                    <Button
                                        leftIcon={<Image width="20" height="20" src={logo} />}
                                        key={chainId}
                                        width="100%"
                                        mb="2"
                                        onClick={(e) => {
                                            switchNet(chainId);
                                            onClose();
                                            setSelectNetwork({ logo, text: name })
                                        }}
                                    >{name}</Button>
                                    <Button
                                        key={chainId}
                                        display="block"
                                        fontSize="sm"
                                        mb="2"
                                        color="gray.500"
                                        onClick={(e) => {
                                            addNet(chainId);
                                            onClose();
                                        }}
                                    >
                                        [✚]
                                    </Button>
                                </HStack>
                            )
                        })}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};
export default NetworkSelector;