const { ethers } = require("hardhat");

async function main() {
  try {
  //   // Deploy Wall contract
    // const Wall2Factory = await ethers.getContractFactory("Wall2");
    // const wall2Contract = await Wall2Factory.deploy(1);
    // await wall2Contract.waitForDeployment();
    // console.log("Wall2 deployed to:", wall2Contract.target);

    // const WallFactory = await ethers.getContractFactory("Wall");
    // const wallContract = await WallFactory.deploy();
    // await wallContract.waitForDeployment();
    // console.log("Wall deployed to:", wallContract.target);

    // Deploy Nftcert contract
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
