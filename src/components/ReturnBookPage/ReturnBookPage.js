import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReturnBookPage.css";

const ReturnBookPage = () => {
  const [borrowId, setBorrowId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Fetch borrowed books when the component mounts
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("User is not logged in");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://localhost:8080/borrowed-books", {
          headers,
        });

        setBorrowedBooks(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch borrowed books.");
        setBorrowedBooks([]);
      }
    };

    fetchBorrowedBooks();
  }, []);

  // Handle book return submission
  const handleReturnBook = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not logged in");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/borrowed-books/return",
        { borrowId },
        { headers }
      );

      setMessage("Book returned successfully.");
      setError("");
      setBorrowId("");

      const updatedBorrowedBooks = borrowedBooks.filter(
        (book) => book.borrowId !== parseInt(borrowId, 10)
      );
      setBorrowedBooks(updatedBorrowedBooks);
    } catch (err) {
      setMessage("");
      setError("Failed to return the book. Please try again.");
    }
  };

  // Helper function to calculate the fine
  const calculateFine = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.max((today - due) / (1000 * 60 * 60 * 24), 0); // Calculate the difference in days
    return Math.floor(diffDays) * 10; // Fine is $10 per overdue day
  };

  return (
    <div className="return-book-container">
      <h2>Return Book</h2>
      <form onSubmit={handleReturnBook} className="return-book-form">
        <div className="form-group">
          <label>Borrow ID:</label>
          <input
            type="text"
            value={borrowId}
            onChange={(e) => setBorrowId(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Return Book</button>
      </form>

      <h3>Borrowed Books</h3>
      {borrowedBooks.length > 0 ? (
        <table className="borrowed-books-table">
          <thead>
            <tr>
              <th>Borrow ID</th>
              <th>Book ID</th>
              <th>Borrowed Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Fine</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.borrowId}>
                <td>{book.borrowId}</td>
                <td>{book.bookId}</td>
                <td>{new Date(book.borrowedDate).toLocaleDateString()}</td>
                <td>{new Date(book.dueDate).toLocaleDateString()}</td>
                <td>
                  {book.returnDate
                    ? new Date(book.returnDate).toLocaleDateString()
                    : "Not Returned"}
                </td>
                <td>
                  {book.returnDate
                    ? 0 // No fine if the book is returned
                    : calculateFine(book.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No borrowed books found.</p>
      )}
    </div>
  );
};

export default ReturnBookPage;
