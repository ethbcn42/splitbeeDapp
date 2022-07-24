import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { store } from '@/store'
import { connect, setLoading, setError, selectNetwork } from '../web3.slice'
import Web3Token from "web3-token"
import { SPLITBEE_TOKEN, networks } from '@/utils/constants';


/**************************************************************************/
/*                      UTILS                                             */
/**************************************************************************/

const networksOLD = {
    137: {
        chainName: "Polygon",
        chainId: "0x89",
        rpcUrls: ["polygon-rpc.com"],
        nativeCurrency: {
            name: "Matic",
            symbol: "Matic",
            decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com"],
        logo: "/web3/polygon.svg",
        img: "/web3/polygon.png",
    },
    80001: {
        chainName: "Mumbai",
        chainId: "0x13881",
        rpcUrls: ["https://rpc-mumbai.matic.today"],
        nativeCurrency: {
            name: "Matic",
            symbol: "Matic",
            decimals: 18,
        },
        blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
        logo: "/web3/mumbai.svg",
        img: "/web3/mumbai.png"
    },
    1: {
        chainName: "Ethereum Mainnet",
        chainId: "0x1",
        rpcUrls: ["https://mainnet.infura.io/v3/9db936720a2743b0a033001e1276fb60"],
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        blockExplorerUrls: ["https://etherscan.io"],
        logo: "/web3/ethereum.svg",
        img: "/web3/ethereum.png"
    },
    25: {
        chainName: "Cronos",
        chainId: "0x19",
        rpcUrls: ["https://evm.cronos.org"],
        nativeCurrency: {
            name: "CRONOS",
            symbol: "CRO",
            decimals: 18,
        },
        blockExplorerUrls: ["https://cronoscan.com/"],
        logo: "/web3/cronos.svg",
        img: "/web3/cronos.png"
    }
}


async function requestAccount(ethereum) {
    return await ethereum.request({ method: 'eth_requestAccounts' });
}

export function getProvider(ethereum) {
    if (!ethereum) return null;
    const provider = new ethers.providers.Web3Provider(ethereum)
    console.log({ provider })
    return provider
}

async function getSigner(provider) {
    const signer = await provider.getSigner()
    console.log({ signer })
    return signer
}

async function getAccount(signer) {
    const account = await signer.getAddress()
    console.log({ account })
    return account
}

export async function getNetwork(provider) {
    let network = await provider.getNetwork()
    console.log({ network })
    return network
}

export const addNetwork = async (ethereum, chainId) => {
    try {
        store.dispatch(setLoading(true));
        const { logo, img, ...network } = networks[parseInt(chainId)]
        await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                ...network
            }],
        });
        store.dispatch(selectNetwork(ethers.utils.hexValue(chainId)));
        store.dispatch(setLoading(false));
    } catch (error) {
        //TODO: handle error with toastify
        alert(error.message);
    }
}

export const switchNetwork = async (ethereum, chainId) => {
    try {
        console.log({ chainId })
        store.dispatch(setLoading(true));
        await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
        });
        store.dispatch(selectNetwork(parseInt(chainId)));
        store.dispatch(setLoading(false));
    } catch (error) {
        if (error.code === 4902) {
            try {
                console.log({ network: networks[parseInt(chainId)], chain: chainId })
                const { logo, img, ...network } = networks[parseInt(chainId)]
                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        ...network
                    }
                    ],
                });
                store.dispatch(selectNetwork(ethers.utils.hexValue(chainId)));
                store.dispatch(setLoading(false));
            } catch (error) {
                //TODO: handle error with toastify
                alert(error.message);
            }
        }
    }
}

const isValidToken = (token) => {
    try {
        console.log({ token })
        Web3Token.verify(token)
        return true
    } catch (error) {
        return false
    }
}

export const connectUser = async (window) => {
    try {
        const { localStorage } = window
        const ethereum = await detectEthereumProvider()
        if (!ethereum)
            return store.dispatch(setError("No ethereum provider found."))
        store.dispatch(setLoading(true))
        let token = localStorage.getItem(SPLITBEE_TOKEN) || null
        let network = null
        if (token == null || !isValidToken(token)) {
            localStorage.removeItem(SPLITBEE_TOKEN);
            await requestAccount(ethereum);
            const provider = getProvider(ethereum);
            const signer = await getSigner(provider);
            const address = await getAccount(signer);
            network = await getNetwork(provider);
            token = await Web3Token.sign(async msg => await signer.signMessage(msg), '1m');
            localStorage.setItem(SPLITBEE_TOKEN, token);
        }
        console.log({ tokenOUTSIDE: token })
        const res = await fetch('/api/v1/user/connect', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const { user } = await res.json()
        let payload = {
            address: user.address,
            token,
            network: network?.chainId || null,
            loading: false,
            isConnected: true,
        }
        store.dispatch(connect(payload))
        window.localStorage.setItem(SPLITBEE_TOKEN, token)
        return { token, user }
    } catch (error) {
        console.error(error)
        store.dispatch(setError(error.message))
    }

}
