import React, { useState } from "react";
import axios from "axios";
import "./AddCategoryPage.css";

const AddCategoryPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/categories/add",
        { name, description },
        { headers }
      );

      setMessage("Category added successfully!");
      setError("");
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Failed to add category. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>
      <form onSubmit={handleAddCategory} className="add-category-form">
        <div className="form-group">
          <label>Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryPage;
