const { ethers } = require("hardhat");
const fs = require("fs") 

const FRONT_END_ADDRESS_FILE =
    "../client/src/constants/contractAddress.json";

const FRONT_END_ABI = 
    "../client/src/constants/abi.json"


module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updating Frontend....")
        updateContractAddress()
        updateAbi()
        console.log("Frontend updated!")    
    }
}

async function updateContractAddress () {
    const tokenn = await ethers.getContract("token")
    const chainId = network.config.chainId.toString()
    const currentAddress = JSON.parse(fs.readFileSync(FRONT_END_ADDRESS_FILE,"utf-8"))
    if(chainId in currentAddress){
        if(!currentAddress[chainId].includes(tokenn.address)){
            currentAddress[chainId].push(tokenn.address)
        }
    }
    else{
        currentAddress[chainId] = [tokenn.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESS_FILE,JSON.stringify(currentAddress))
}

const updateAbi = async() => {
    const tokenn  = await ethers.getContract("token")
    fs.writeFileSync(FRONT_END_ABI, tokenn.interface.format(ethers.utils.FormatTypes.json))
}

module.exports.tags = ["all", "frontend"]