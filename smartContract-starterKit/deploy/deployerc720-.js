const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");


module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let vrfCoordinatorV2Address, subscriptionId;
    // if(developmentChains.includes(network.name)) {
    //     const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    //     vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
    //     //generating subscription id for the localhost and hardhat network from a code
    //     const transectionResponse = await vrfCoordinatorV2Mock.createSubscription();
    //     const transectionReceipt = await transectionResponse.wait(1)
    //     subscriptionId = transectionReceipt.events[0].args.subId;
    //     //Fund the subscription
    //     await vrfCoordinatorV2Mock.fundSubscription(subscriptionId,VRF_SUB_FUND_AMOUNT)
    // }
    // else{
    //     vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
    //     subscriptionId = networkConfig[chainId]["subscriptionId"]
    // }

    args = []

    const raffle = await deploy("erc720", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    // if (developmentChains.includes(network.name)) {
    //     const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock") 
    //     await vrfCoordinatorV2Mock.addConsumer(subscriptionId, raffle.address)
    // }
    
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        log("Verifying...")
        await verify(raffle.address,args)
    }
    log("--------------------------------------")
}

module.exports.tags = ["all", "raffle"]