// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookLending {
    address public admin;

    struct Transaction {
        address borrower;
        uint256 borrowedAt;
        uint256 returnedAt;
    }

    struct Book {
        string title;
        bool isBorrowed;
        Transaction[] history;
    }

    mapping(uint => Book) public books;
    uint public nextBookId;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function addBook(string memory title) public onlyAdmin {
        books[nextBookId].title = title;
        books[nextBookId].isBorrowed = false;
        nextBookId++;
    }

    function borrowBook(uint bookId) public {
        Book storage book = books[bookId];
        require(!book.isBorrowed, "Already borrowed");
        book.isBorrowed = true;
        book.history.push(Transaction(msg.sender, block.timestamp, 0));
    }

    function returnBook(uint bookId) public {
        Book storage book = books[bookId];
        require(book.isBorrowed, "Book not borrowed");
        book.isBorrowed = false;
        uint lastIndex = book.history.length - 1;
        book.history[lastIndex].returnedAt = block.timestamp;
    }

    function getHistory(uint bookId) public view returns (Transaction[] memory) {
        return books[bookId].history;
    }

    function getBooks() public view returns (uint[] memory, string[] memory, bool[] memory) {
        uint[] memory ids = new uint[](nextBookId);
        string[] memory titles = new string[](nextBookId);
        bool[] memory borrowed = new bool[](nextBookId);

        for (uint i = 0; i < nextBookId; i++) {
            ids[i] = i;
            titles[i] = books[i].title;
            borrowed[i] = books[i].isBorrowed;
        }

        return (ids, titles, borrowed);
    }
}
