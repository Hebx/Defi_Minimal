// staking abi
// staking address
// howmuch they wanna stake
// approve our reward token
import {useWeb3Contract} from "react-moralis"
import { rewardTokenAbi, rewardTokenAddress, stakingAbi, stakingAddress } from "../constants"
import {Form} from "web3uikit"
import { ethers } from "hardhat"


export default function StakeForm() {
	const {runContractFunction} = useWeb3Contract()
	let approveOptions = {
		abi: rewardTokenAbi,
		contractAddress: rewardTokenAddress,
		functionName: "approve",
	}
	let stakeOptions = {
		abi: stakingAbi,
		contractAddress: stakingAddress,
		functionName: "stake",
	}

	async function handleStakeSubmit(data) {
		const amountToApprove = data.data[0].inputResult
		approveOptions.params = {
			amount: ethers.utils.parseUnits(amountToApprove, "ether").toString(),
			spender: stakingAddress
		}
		console.log("approving...")
		const tx = await runContractFunction({
			onError: (error) => console.log(error),
		})
	}

	return (
		<Form
		onSubmit={handleStakeSubmit}
			data={
				[
					{

						inputWidth: "50%",
						name:"Amount to Stake (in ETH)",
						type: "number",
						value: "",
						key: "amountToStake"
					},
				]
			}
			title="Let's Stake!"
		></Form>
	)
}
