import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from '../constants'
import { useMoralis } from 'react-moralis'
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"


export default function Balance() {

    const [accountAddress, setAccountAddress] = useState("0")

    const { isWeb3Enabled, chainId: chainIdHex, account, authenticate } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const tokenAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: totalSupplyContract, data, error, isLoading, isFetching } = useWeb3Contract({
        abi: abi,
        contractAddress: tokenAddress,
        functionName: 'totalSupply',
        params: {},
    })

    const { runContractFunction: transferContract } = useWeb3Contract({
        abi: abi,
        contractAddress: tokenAddress,
        functionName: 'transfer',
        params: {
            to: 
        },
    })

    const { runContractFunction: balanceOfContract } = useWeb3Contract({
        abi: abi,
        contractAddress: tokenAddress,
        functionName: 'balanceOf',
        params: [accountAddress],
    })

    async function updateUi() {
        const TotalSupplyFromContract = await totalSupplyContract()
        const balanceOfFromContract = await balanceOfContract()
        console.log("🚀", balanceOfFromContract, (TotalSupplyFromContract).toString())
    }

    useEffect(() => {
        setAccountAddress(account)
        updateUi()
    }, [account && isWeb3Enabled]);


    return (
        <>
            Balance
        </>
    )
}