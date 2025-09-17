import React, { useState, useEffect } from 'react';
import { getContract } from "../utils/getContract";

const LibraryManagementSystem = () => {
  const [currentView, setCurrentView] = useState('bookList');
  const [walletConnected, setWalletConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  console.log("Admin" , isAdmin);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        isAdmin={isAdmin}
      />
      
      <div className="container mx-auto px-4 py-8">
        {!walletConnected ? (
          <ConnectWallet 
            setWalletConnected={setWalletConnected}
            setWalletAddress={setWalletAddress}
            setIsAdmin={setIsAdmin}
          />
        ) : (
          <>
            <HeaderSection currentView={currentView} />
            {currentView === 'addBook' && isAdmin && (
              <AddBook />
            )}
            {currentView === 'bookList' && (
             <BookList walletAddress={walletAddress} walletConnected={walletConnected} />

            )}
            {currentView === 'history' && (
              <BookHistory />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Header Section Component
const HeaderSection = ({ currentView }) => {
  const titles = {
    bookList: "Digital Library Collection",
    addBook: "Add New Book to Blockchain",
    history: "Borrowing History Ledger"
  };

  const descriptions = {
    bookList: "Explore our decentralized collection of books. Borrow and return with blockchain security.",
    addBook: "Add new books to the immutable blockchain ledger with secure transactions.",
    history: "View the complete transparent history of all book transactions on the blockchain."
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-indigo-900 mb-4">{titles[currentView]}</h1>
      <p className="text-lg text-indigo-700 max-w-2xl mx-auto">{descriptions[currentView]}</p>
    </div>
  );
};



// Navbar Component
const Navbar = ({ currentView, setCurrentView, walletConnected, walletAddress, isAdmin }) => {
  const shortenedAddress = walletAddress 
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : '';

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                LibraryChain
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${currentView === 'bookList' ? 'bg-white text-indigo-600 shadow-lg' : 'hover:bg-indigo-500'}`}
              onClick={() => setCurrentView('bookList')}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Books
              </span>
            </button>
            {isAdmin && (
              <button 
                className={`px-4 py-2 rounded-full transition-all duration-300 ${currentView === 'addBook' ? 'bg-white text-indigo-600 shadow-lg' : 'hover:bg-indigo-500'}`}
                onClick={() => setCurrentView('addBook')}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add Book
                </span>
              </button>
            )}
            <button 
              className={`px-4 py-2 rounded-full transition-all duration-300 ${currentView === 'history' ? 'bg-white text-indigo-600 shadow-lg' : 'hover:bg-indigo-500'}`}
              onClick={() => setCurrentView('history')}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                History
              </span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            {walletConnected && (
              <span className="bg-indigo-500 px-3 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {shortenedAddress}
              </span>
            )}
            {isAdmin && (
              <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// ConnectWallet Component
const ConnectWallet = ({ setWalletConnected, setWalletAddress, setIsAdmin }) => {
 const connectWallet = async () => {
  if (!window.ethereum) return alert("MetaMask not detected!");

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWalletAddress(accounts[0]);
    setWalletConnected(true);

    const contract = await getContract();
    if (!contract) return;

    const adminAddress = await contract.admin(); 
    console.log("Admin from contract:", adminAddress);
    console.log("Connected account:", accounts[0])

    setIsAdmin(accounts[0].toLowerCase() === adminAddress.toLowerCase());
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Failed to connect wallet: " + err.message);
  }
};




  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="h-64 md:h-full md:w-80 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="text-2xl font-bold">Blockchain Library</h3>
              <p className="mt-2">Secure, transparent book borrowing on the blockchain</p>
            </div>
          </div>
        </div>
        <div className="p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
            <p className="text-lg text-gray-600 mb-8">Access the decentralized library system</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="bg-indigo-100 inline-flex rounded-full p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Immutable Records</h3>
                <p className="text-sm text-gray-600">All transactions are permanently recorded on the blockchain</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="bg-purple-100 inline-flex rounded-full p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">Secure Access</h3>
                <p className="text-sm text-gray-600">Your wallet is your key to borrowing and returning books</p>
              </div>
            </div>
            
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Connect MetaMask Wallet
            </button>
            <p className="text-sm text-gray-500 mt-4">Make sure you have MetaMask installed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// AddBook Component
const AddBook = () => {
  const [title, setTitle] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  try {
    const contract = await getContract(); 
    if (!contract) return;

    const tx = await contract.addBook(title);
    await tx.wait();
    alert(`Book "${title}" added to blockchain!`);
    setTitle('');
  } catch (err) {
    console.error(err);
    alert("Failed to add book");
  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold">Add New Book to Blockchain</h2>
        <p className="opacity-90">Permanently record a new book on the decentralized ledger</p>
      </div>
      <form onSubmit={handleSubmit} className="p-8">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Book Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter book title to add to blockchain"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Add to Blockchain Library
        </button>
      </form>
    </div>
  );
};



const BookList = ({ walletAddress, walletConnected }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const contract = await getContract();
      const [ids, titles, borrowedStatuses] = await contract.getBooks();
      
      // Transform the data into a more usable format
      const booksData = ids.map((id, index) => ({
        id: Number(id),
        title: titles[index],
        isBorrowed: borrowedStatuses[index],
        borrowedBy: "", 
        cover: "📘" 
      }));
      
      setBooks(booksData);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    if (walletConnected) fetchBooks();
  }, [walletConnected]);

  const borrowBook = async (bookId) => {
    try {
      const contract = await getContract();
      const tx = await contract.borrowBook(bookId);
      await tx.wait();
      fetchBooks();
    } catch (err) {
      console.error("Error borrowing book:", err);
      alert("Failed to borrow book: " + err.message);
    }
  };

  const returnBook = async (bookId) => {
    try {
      const contract = await getContract();
      const tx = await contract.returnBook(bookId);
      await tx.wait();
      fetchBooks(); // refresh the list
    } catch (err) {
      console.error("Error returning book:", err);
      alert("Failed to return book: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Available Books</h2>
        <p className="opacity-90">Borrow and return books from the decentralized library</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all duration-300 hover:shadow-lg">
              <div className="p-5">
                <div className="text-5xl text-center mb-4">{book.cover}</div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{book.title}</h3>
                <div className="flex justify-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${book.isBorrowed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {book.isBorrowed ? 'Borrowed' : 'Available'}
                  </span>
                </div>
                <div className="text-center">
                  {!book.isBorrowed ? (
                    <button
                      onClick={() => borrowBook(book.id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Borrow
                    </button>
                  ) : (
                    <button
                      onClick={() => returnBook(book.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Return
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No books available in the library</p>
          </div>
        )}
      </div>
    </div>
  );
};



const BookHistory = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [history, setHistory] = useState([]);
  const [books, setBooks] = useState([]);

  // Fetch books for the dropdown
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const contract = await getContract();
        const [ids, titles] = await contract.getBooks();
        
        const booksData = ids.map((id, index) => ({
          id: Number(id),
          title: titles[index]
        }));
        
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    
    fetchBooks();
  }, []);

  const handleBookSelect = async (bookId) => {
    setSelectedBook(bookId);
    if (bookId) {
      try {
        await fetchHistory(bookId);
      } catch (err) {
        console.error("Error fetching history:", err);
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  };

  const fetchHistory = async (bookId) => {
    try {
      const contract = await getContract();
      // Use the correct function name from the contract
      const records = await contract.getHistory(bookId);
      
      const formattedRecords = records.map(r => ({
        borrower: r.borrower,
        borrowedAt: Number(r.borrowedAt),
        returnedAt: Number(r.returnedAt)
      }));
      
      setHistory(formattedRecords);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      alert("Failed to fetch history: " + err.message);
      setHistory([]);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp === 0) return 'Not returned yet';
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Borrowing History Ledger</h2>
        <p className="opacity-90">View the complete transparent history of all book transactions</p>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookSelect">
            Select a Book to View History
          </label>
          <select
            id="bookSelect"
            value={selectedBook}
            onChange={(e) => handleBookSelect(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Choose a book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Borrower Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Borrowed At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Returned At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((record, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.borrower}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(record.borrowedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(record.returnedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.returnedAt === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {record.returnedAt === 0 ? 'Borrowed' : 'Returned'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-indigo-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600">
              {selectedBook ? 'No history found for this book' : 'Please select a book to view its history'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LibraryManagementSystem;