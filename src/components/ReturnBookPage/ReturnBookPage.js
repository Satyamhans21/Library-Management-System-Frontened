import React, { useState } from "react";
import axios from "axios"; // To make API requests
import "./ReturnBookPage.css";

const ReturnBookPage = () => {
  const [bookId, setBookId] = useState("");
  const [borrowId, setBorrowId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle book return submission
  const handleReturnBook = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

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

      // Assume the API endpoint is `POST /return-book` (adjust based on your backend API)
      const response = await axios.post(
        "http://localhost:8080/borrowed-books/return",
        { borrowId},
        { headers }
      );

      // Handle success response
      setMessage("Book returned successfully.");
      setError("");
      setBookId("");
      setBorrowId("");
      setReturnDate("");
    } catch (err) {
      // Handle error response
      setMessage("");
      setError("Failed to return the book. Please try again.");
    }
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
        {/* <div className="form-group">
          <label>Return Date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div> */}
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Return Book</button>
      </form>
    </div>
  );
};

export default ReturnBookPage;
