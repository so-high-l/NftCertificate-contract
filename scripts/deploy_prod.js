const { ethers } = require("hardhat");

async function main() {
  // Deploy all contracts
  // const wallContract = await ethers.deployContract("Wall");
  // await wallContract.waitForDeployment();

  // const NftcertContract = await ethers.deployContract("Nftcert", "NFTC");
  // await NftcertContract.waitForDeployment();
  


  const NftcertFactory = await ethers.getContractFactory("Nftcert");
  const NftcertContract = await NftcertFactory.deploy("NFTCertificate", "NFTC");
  await NftcertContract.waitForDeployment();
  console.log("Nftcert deployed to:", NftcertContract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
