import { useSelector } from 'react-redux';
import { Box, Button, HStack, Select, SelectField, Text, useToast, VStack } from '@chakra-ui/react';
import { networks } from '@/utils/constants';
import { FaEthereum } from 'react-icons/fa';
import { switchNetwork } from '@/store/slices/web3/utils/connectUser';



export const NetworkSelector = () => {
    const toast = useToast()
    const { address, network } = useSelector(state => state.web3)

    const switchNet = async (e) => {
        const chainId = e.target.value;
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
        <Select onChange={(e)=>switchNet(e)}>
            {Object.keys(networks).map((chain) => {
                const { chainName:name, chainId, logo } = networks[chain];
                return (
                    <option key={chainId} value={chain} >
                        {name}
                    </option>
                )
            })}


        </Select>
    )
};
export default NetworkSelector;
