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

    useEffect(() => {
        async function asyncCall() {
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
                description: 'Please install Metamask',
                status: 'error',
                duration: 4200,
                isClosable: true,
                position: 'top'
            })
        }
        await switchNetwork(window.ethereum, chainId);
    }
    const addNet = async (chainId) => {
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
        await addNetwork(window.ethereum, chainId);
    }


    return (
        <>
            <Button
                onClick={onOpen}
                leftIcon={selectNetwork.logo ? <Image width="20" height="20" src={selectNetwork.logo} /> : null}
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