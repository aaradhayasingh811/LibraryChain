import { ethers } from "ethers";
import BookLendingABI from "../contracts/BookLending.json";

const CONTRACT_ADDRESS = "0xAFE4b163930eC6Ac199468213641e84ed2629C91";

export async function getContract() {
  if (!window.ethereum) {
    alert("MetaMask is required! Please install MetaMask.");
    return null;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    
    // v5 syntax
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, BookLendingABI.abi, signer);
    
    return contract;
  } catch (err) {
    console.error("Failed to create contract:", err);
    alert("Failed to connect to contract: " + err.message);
    return null;
  }
}
