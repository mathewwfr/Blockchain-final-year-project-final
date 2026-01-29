const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Deploy to hardhat network instead
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Upload = await hre.ethers.getContractFactory("Upload", deployer);
  const upload = await Upload.deploy();

  await upload.waitForDeployment();

  const contractAddress = upload.target;
  console.log("Library deployed to:", contractAddress);

  // Save address to file
  const addressFile = path.join(__dirname, "../client/src/contractAddress.json");
  fs.writeFileSync(addressFile, JSON.stringify({ address: contractAddress }, null, 2));
  console.log("Contract address saved to:", addressFile);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
