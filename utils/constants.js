export const network = {
    name: "Göerli",
    chainId: "0x5",
    contract: {
        addy: "0x2D5883823Af634171CD6a17bdF0975c17535782C",
        abi: [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "Registry", "outputs": [{ "internalType": "contract Particular", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_percent", "type": "uint256" }, { "internalType": "address", "name": "_ong", "type": "address" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "name": "createParticular", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }, { "internalType": "bytes32", "name": "_seed", "type": "bytes32" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "particular", "outputs": [{ "internalType": "contract Particular", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "seed", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "name": "setAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_seed", "type": "bytes32" }], "name": "setSeed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "_merkleProof", "type": "bytes32[]" }], "name": "verifyProof", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }]
    }
}

export const child = {
    abi: [{ "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }, { "internalType": "uint256", "name": "_percent", "type": "uint256" }, { "internalType": "address", "name": "_ong", "type": "address" }, { "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_wallet", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "remaining", "type": "uint256" }], "name": "Transaction", "type": "event" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "_proof", "type": "bytes32[]" }], "name": "checkVerifyedONG", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ong", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "percent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "name": "setAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_ong", "type": "address" }, { "internalType": "bytes32[]", "name": "_proof", "type": "bytes32[]" }], "name": "setONG", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_percent", "type": "uint256" }], "name": "setPercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_wallet", "type": "address" }], "name": "setWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "wallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]
}

export default {
    network,
    child
}

export const SPLITBEE_TOKEN = "SPLITBEE_TOKEN"
export const networks = {
    137: {
        chainName: "Polygon",
        chainId: "0x89",
        rpcUrls: ["https://polygon.infura.io/v3/9db936720a2743b0a033001e1276fb60"],
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
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/v1/4a45a73c3839558b7642547f52c612ffcabeec49"],
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
    },
    42220: {
        chainId: "0xa4ec",
        chainName: "Celo",
        nativeCurrency: {
            name: "Celo",
            symbol: "CELO",
            decimals: 18
        },
        rpcUrls: ["https://forno.celo.org"],
        blockExplorerUrls: ["https://explorer.celo.org/"],
        logo: "/web3/celo.svg",
        img: "/web3/celo.png"
    }
}