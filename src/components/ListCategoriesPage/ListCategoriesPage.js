import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListCategoriesPage.css";

const ListCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="list-categories-container">
      <h2>Available Categories</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategoriesPage;
