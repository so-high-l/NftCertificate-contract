const { ethers } = require("hardhat");

async function main() {
  try {
    const NftcertFactory = await ethers.getContractFactory("Nftcert");
    const NftcertContract = await NftcertFactory.deploy("Nftcert", "NFTC");
    await NftcertContract.waitForDeployment();
    console.log("Nftcert deployed to:", NftcertContract.target);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
