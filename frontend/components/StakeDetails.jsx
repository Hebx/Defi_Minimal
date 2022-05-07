// how many tokens are in out wallet
// how many tokens are Staked/
// how many tokens we hve earned

import { useMoralis, useWeb3Contract } from "react-moralis"
import { stakingAbi, rewardTokenAbi, stakingAddress, rewardTokenAddress } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function StakeDetails() {
    const { account, isWeb3Enabled } = useMoralis()
    const [rtBalance, setRtBalance] = useState("0")
    const [stakedBalance, setStakedBalance] = useState("0")
    const [earnedBalance, setEarnedBalance] = useState("0")

    const { runContractFunction: getStakedBalance } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "getStaked",
        params: {
            account: account,
        },
    })

    const { runContractFunction: getRtBalance } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    })

    const { runContractFunction: getEarnedBalance } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "earned",
        params: {
            account: account,
        },
    })

    useEffect(() => {
        // update the UI and get balances
        if (isWeb3Enabled && account) {
            updateUiValues()
        }
    }, [account, isWeb3Enabled])

    async function updateUiValues() {
        const rtBalanceFromContract = (
            await getRtBalance({ onError: (error) => console.log(error) })
        ).toString()
        const formattedRtBalanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract,
            "ether"
        )
        setRtBalance(formattedRtBalanceFromContract)

        const stakedBalanceFromContract = (
            await getStakedBalance({ onError: (error) => console.log(error) })
        ).toString()
        const formattedStakedBalanceFromContract = ethers.utils.formatUnits(
            stakedBalanceFromContract,
            "ether"
        )
        setStakedBalance(formattedStakedBalanceFromContract)

        const earnedBalanceFromContract = (
            await getEarnedBalance({ onError: (error) => console.log(error) })
        ).toString()

        const formattedEarnedBalanceFromContract = ethers.utils.formatUnits(
            earnedBalanceFromContract,
            "ether"
        )
        setEarnedBalance(formattedEarnedBalanceFromContract)
    }

    console.log(account)
    console.log(rtBalance)
    console.log(earnedBalance)
    console.log(stakedBalance)
    // reward token addres
    // reward token abi
    return (
        <div>
            <div>RT Balance is {rtBalance}</div>
            <div>Earned Balance is {earnedBalance}</div>
            <div>Staked Balance is {stakedBalance}</div>
        </div>
    )
}
