import { useSelector } from 'react-redux';
import { Button, Text, useToast } from '@chakra-ui/react';
import { connectUser } from '@/store/slices/web3/utils/connectUser';
import { SPLITBEE_TOKEN } from '@/utils/constants';
import { FaEthereum } from 'react-icons/fa';


export const Web3ConnectButton = () => {
    const toast = useToast()
    const { address } = useSelector(state => state.web3)

    const handleConnect = async () => {
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
        const { token, user } = await connectUser(window);
        console.log(token, user);
        if (!!token)
        {
            toast({
                title: 'Connected',
                description: 'You are connected to Metamask',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })
            window.localStorage.setItem(SPLITBEE_TOKEN, token);
        }
    }

    return (
        <Button
            size={'sm'}
            w={{
                base: 'auto',
                xl: '100%'
            }}
            fontSize={'14px'}
            disabled={!!address}
            onClick={handleConnect}
            display={'flex'}
            alignItems={'center'}
        >
            <Text
                mt={'3px'}
                color="black"
                display={['none', 'block', 'block', 'block']}
                marginRight='4px'
            >
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'}
            </Text>
            {/* <FaEthereum style={{display: 'inline'}} fontSize={'21px'} /> */}
            <img style={{display: 'block', width: '21px', height: '21px' }} src="/metamask.svg" />
        </Button>
    )
};
export default Web3ConnectButton;
