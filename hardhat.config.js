// import "@nomiclabs/hardhat-ethers";
require("@nomiclabs/hardhat-ethers");
module.exports  = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8745",
      accounts: ["fdf3ce55f624b70ce7e889b46f947e05c34d719aae6e740bad9fa69b5361ce6c"]
    }
  }
};

