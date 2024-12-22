import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar"; // Import Sidebar component
import "./HomePage.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get("http://127.0.0.1:8080/books", { headers, withCredentials: true });
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Filtered books based on the search query
  const filteredBooks = data.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="home-page">
        <h1 className="home-title">Library Management System</h1>
        <h2 className="list-title">List of Books</h2>

        {error && <p className="error-message">{error}</p>}

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, author, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Books Table */}
        <div className="table-container">
          <table className="books-table">
            <thead>
              <tr>
                <th>BookID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Edition</th>
                <th>Genre</th>
                <th>Language</th>
                <th>Publisher</th>
                <th>Cost</th>
                <th>ISBN</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.bookId}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.edition}</td>
                    <td>{book.genre}</td>
                    <td>{book.language}</td>
                    <td>{book.publisher}</td>
                    <td>{book.cost}</td>
                    <td>{book.isbn}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No books found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
