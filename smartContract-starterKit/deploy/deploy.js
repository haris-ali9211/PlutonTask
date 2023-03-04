
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialSupply = BigInt(100000000000000000000);
  console.log("Deploying contract with the account:", deployer.address);

  const Token = await ethers.getContractFactory("token");
  const token = await Token.deploy(initialSupply);

  console.log("Contract address:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
