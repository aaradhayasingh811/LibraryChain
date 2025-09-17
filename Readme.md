# Decentralized Library Management System 

A **decentralized application (dApp)** that provides a secure, transparent, and immutable system for managing a digital collection of books.  
By leveraging the **Ethereum blockchain**, it moves core library operations—like adding, borrowing, and returning books—onto a public, tamper-proof ledger.  

The application's **front-end** is built with **React + Tailwind CSS**, offering a clean and modern user experience, while the **back-end logic** is enforced through an Ethereum **smart contract**.

---

## Features

- **Immutable Book Records**  
  Every book and its status are stored on the blockchain. This ensures permanence and prevents tampering.

- **Admin-Only Controls**  
  Only the **administrator** (the wallet address that deployed the contract) can add new books to the library.

- **Transparent Borrowing History**  
  All borrow/return actions are logged permanently, creating a public audit trail.

- **Wallet-Based Authentication**  
  No accounts or passwords. Users connect with **MetaMask** or any Web3 wallet.

---

## Tech Stack

| Component       | Technology |
|-----------------|------------|
| Smart Contract  | **Solidity** (BookLending.sol) |
| Blockchain      | **Ethereum / Hardhat Local Network** |
| Frontend        | **React.js** |
| Styling         | **Tailwind CSS** |
| Blockchain API  | **Ethers.js** |
| Development     | **Hardhat** |

---

## Getting Started

### Prerequisites
- [Node.js & npm](https://nodejs.org/)  
- [MetaMask](https://metamask.io/) browser wallet  
- [Hardhat](https://hardhat.org/) Ethereum dev environment  

---

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Local Blockchain
```bash
In one terminal:

npx hardhat node

```
##### This launches a local Ethereum test network and provides test accounts.

### Step 4: Deploy Smart Contract
```bash
In another terminal:

npx hardhat run scripts/deploy.js --network localhost
```

- Copy the deployed contract address and update your frontend CONTRACT_ADDRESS.

### Step 5: Run Frontend
```bash
npm start

```
* Open: http://localhost:3000

* Connect MetaMask → choose an account → start managing the blockchain-powered library!

----

### Smart Contract Overview

##### Data Structures

* Transaction:
* Stores borrower address, borrow timestamp, and return timestamp.

* Book:
* Contains book title, availability status, and an array of past transactions.

### Key Functions
```bash
| Function                  | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `addBook(string title)`   | Adds a new book (admin only).                              |
| `borrowBook(uint bookId)` | Allows any user to borrow a book if available.             |
| `returnBook(uint bookId)` | Returns a borrowed book and updates history.               |
| `getHistory(uint bookId)` | Returns the full transaction history for a book.           |
| `getBooks()`              | Returns all books with their ID, title, and borrow status. |

```

### Roles

- **Admin**: The wallet that deployed the contract. Has exclusive rights to add books.  
- **Users**: Any wallet can borrow/return books and view history.

---

### UI Features

- ✅ Responsive design with **Tailwind CSS**  
- ✅ Clean **book listing view**  
- ✅ **Book addition** panel (admin only)  
- ✅ **Borrow & return** interaction buttons  
- ✅ **Borrowing history** display per book  

---

###  License

This project is licensed under the **MIT License**.  
(If you really mean Google License, specify which one — e.g., Apache 2.0.)
