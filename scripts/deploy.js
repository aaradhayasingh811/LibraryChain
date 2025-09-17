
const hre = require("hardhat");

async function main() {
  const BookLending = await hre.ethers.getContractFactory("BookLending");
  const bookLending = await BookLending.deploy();
  await bookLending.deployed();
  console.log("Contract deployed to:", bookLending.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
