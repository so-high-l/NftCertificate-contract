const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Nftcert", function () {

    
  async function deployNftcertContract(name, symbol) {
    const NftcertContractFactory = await ethers.getContractFactory("Nftcert");
    const NftcertContract = await (await NftcertContractFactory.deploy(name, symbol)).waitForDeployment();
    return NftcertContract;
  }
  

   it("Deploy should work", async function () {
    const NftcertContract = await deployNftcertContract("NFTCertificate", "NFTC");
    const contractName = await NftcertContract.name();
    expect(contractName).to.equal("NFTCertificate");
   });

  //  it("Mint should work", async function () {
  //   const [owner, student] = await ethers.getSigners();
  //   const NftcertContract = await deployNftcertContract("NFTCertificate", "NFTC");

  //   // Mint a new certificate
  //   const tokenUri = "ipfs://QmS1Tcv3mnykBTYwUz2hAcCjvummqSZZ7a44fET4QvJrv7";
  //   await (await NftcertContract.createCertificate(student.address, tokenUri)).wait();

  //   // Verify that the certificate was created
  //   const studentTokenId = await NftcertContract.studentToid(student.address);
  //   const tokenOwner = await NftcertContract.ownerOf(studentTokenId);

  //   expect(tokenOwner).to.equal(student.address);
  //   expect(tokenURI).to.equal(tokenUri);
  // });

  it("tokensOfOwner should return correct token IDs", async function () {
    const [owner, student] = await ethers.getSigners();
    const NftcertContract = await deployNftcertContract("NFTCertificate", "NFTC");

    const tokenUri1 = "ipfs://QmS1Tcv3mnykBTYwUz2hAcCjvummqSZZ7a44fET4QvJrv7";
    const tokenUri2 = "ipfs://QmSEds1uPVzz1awXGpD2KYNnBvqFv2Gkub8eDpXednT8fT";

    await (await NftcertContract.createCertificate(student.address, tokenUri1)).wait();
    await (await NftcertContract.createCertificate(student.address, tokenUri2)).wait();

    const tokens = await NftcertContract.tokensOfOwner(student.address);

    expect(tokens.length).to.equal(2);
    expect(tokens[0]).to.equal(0);  
    expect(tokens[1]).to.equal(1);  
  });
  it("Token should be valid then invalid(Revoked)", async function () {
    const [owner, student] = await ethers.getSigners();
    const NftcertContract = await deployNftcertContract("NFTCertificate", "NFTC");

    const tokenUri = "ipfs://QmS1Tcv3mnykBTYwUz2hAcCjvummqSZZ7a44fET4QvJrv7";

    await (await NftcertContract.createCertificate(student.address, tokenUri)).wait();
    const tokens = await NftcertContract.tokensOfOwner(student.address);
    const isValid1 = await NftcertContract.isValid(tokens[0])
    await (await NftcertContract.revokeToken(tokens[0])).wait();
    const isValid2 = await NftcertContract.isValid(tokens[0])

    expect(isValid1).to.equal(true);
    expect(isValid2).to.equal(false);

  });
});
