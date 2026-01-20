const hre = require("hardhat");

async function main() {
  // Get a different account to deploy with to avoid the flagged address '0x5FbDB...'
  const signers = await hre.ethers.getSigners();
  const deployer = signers[5]; // Use the 6th account

  console.log("Deploying contracts with the account:", deployer.address);

  const Upload = await hre.ethers.getContractFactory("Upload", deployer);
  const upload = await Upload.deploy();

  await upload.waitForDeployment();

  console.log("Library deployed to:", upload.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
