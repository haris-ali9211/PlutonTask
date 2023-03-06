import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from '../constants'
import { useMoralis } from 'react-moralis'
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import axios from "axios";




export default function Balance() {

    const { isWeb3Enabled, chainId: chainIdHex, account, authenticate } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const tokenAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction, isLoading } = useWeb3Contract()

    const [totalSupply, setSupply] = useState()
    const [accountAddress, setAccountAddress] = useState()
    const [balanceAddress, setBalanceAddress] = useState()

    const dispatch = useNotification()



    const availableTokens = async () => {
        const options = {
            abi: abi,
            contractAddress: tokenAddress,
            functionName: 'totalSupply',
            params: {},
        }

        const supply = await runContractFunction({
            params: options
        })
        setSupply(ethers.utils.formatEther(supply, "ether")?.toString())
    }

    const totalAmount = async () => {
        const options = {
            abi: abi,
            contractAddress: tokenAddress,
            functionName: 'balanceOf',
            params: {
                account: account
            }
        }

        const balance = await runContractFunction({
            params: options
        })
        setBalanceAddress(balance)
    }


    useEffect(() => {
        async function fetchData() {
            await availableTokens()
            await totalAmount()
        }
        fetchData()

    }, [chainId, isWeb3Enabled])


    const transfer = async (e) => {
        e.preventDefault()
        const value = 1;
        const Price = ethers.utils.parseUnits(value.toString(), "ether")?.toString()
        const senderAccount = "0x41D4fd77481072A025A7022137a59760b79f45Ee"

        const options = {
            abi: abi,
            contractAddress: tokenAddress,
            functionName: 'transfer',
            params: {
                to: senderAccount,
                amount: Price
            }
        }

        await runContractFunction({
            params: options,
            onSuccess: buySuccess,
            onError: buyFailed
        })
    }

    const buySuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            title: "Buying Succeed!",
            message: "You have successfully bought the tokens",
            position: "topR"
        })
        postSuccessReq()
        setTimeout(() => window.location.reload(), 5000)
    }

    const buyFailed = () => {
        dispatch({
            type: "error",
            title: "Buying Failed!",
            message: "Buying canceled - you have rejected the transaction",
            position: "topR"
        })
        postFailedReq();
    }

    const postFailedReq = async () => {
        let obj = {
            to: "0xc1d30987c6fb125e186e525a06fc29c2f57efe2b",
            from: "0x41D4fd77481072A025A7022137a59760b79f45Ee",
            amount: 1,
            status: "Failed"
        };
        try {
            const _data = await axios.post(
                "http://localhost:5000/api/transferRoute/transfer",
                obj
            );
            console.log("Register response==>", _data.data);
        }
        catch (error) {
            console.log("🚀", error)
        }
    };

    const postSuccessReq = async () => {
        let obj = {
            to: "0xc1d30987c6fb125e186e525a06fc29c2f57efe2b",
            from: "0x41D4fd77481072A025A7022137a59760b79f45Ee",
            amount: 1,
            status: "Success"
        };
        try {
            const _data = await axios.post(
                "http://localhost:5000/api/transferRoute/transfer",
                obj
            );
            console.log("Register response==>", _data.data);
        }
        catch (error) {
            console.log("🚀", error)
        }
    };



    const [Data, setData] = useState([]);
    const [error, setError] = useState(false);



    const getData = async () => {
        try {
            const databaseData = await axios.get(
                `http://localhost:5000/api/transferRoute/getAllTransfer/`,
                {
                    params: {
                        foo: accountAddress
                    }
                }

            );
            console.log("previous data==>", databaseData.data);
            setData(databaseData.data)
            setError(false);
        } catch (error) {
            console.log("error", error);
            setError(true);
        }
    }

    const getAccount = async () => {
        setAccountAddress(account)
    }

    useEffect(() => {
        async function fetchData() {
            await getAccount()
            await getData()
        }
        fetchData()

    }, [account === accountAddress]);

    return (
        <>
            {
                isWeb3Enabled ?
                    <>
                        <p>Address: {account}</p>
                        <p>Balance : {balanceAddress && ethers.utils.formatUnits(balanceAddress, "ether")} Token</p>
                        <p>Total Supply : {totalSupply} Token</p>

                    </>

                    :
                    <p>loading</p>
            }
            {/* <input type="text" value='amount' /> */}
            <button onClick={transfer}>Send token</button>


            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Created At</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Data? Data.map((obj,key) => {
                                return (
                                    <tr key={key}>
                                        <td>{obj.amount}</td>
                                        <td>{obj.createdAt}</td>
                                        <td>{obj.from}</td>
                                        <td>{obj.to}</td>
                                        <td>{obj.status}</td>
                                    </tr>
                                )
                            })
                            : 
                            null
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}
