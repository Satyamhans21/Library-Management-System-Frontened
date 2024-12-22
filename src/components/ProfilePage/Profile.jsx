import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar"; // Import Sidebar component
import "./ProfilePage.css"; // Importing the CSS file
import { FaUserCircle, FaMale, FaFemale } from "react-icons/fa"; // Importing gender-specific icons

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
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

        const response = await axios.get("http://127.0.0.1:8080/users/me", {
          headers,
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading-message">
        <p>Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-title">User Profile</h1>
        <div className="profile-card">
          <div className="profile-picture">
            {/* Display gender-specific icon or fallback */}
            {user.gender === "Male" ? (
              <FaMale size={100} color="#007bff" />
            ) : user.gender === "Female" ? (
              <FaFemale size={100} color="#ff69b4" />
            ) : (
              <FaUserCircle size={100} color="#ccc" />
            )}
          </div>
          <div className="profile-details">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Contact Number:</strong> {user.contactNumber}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Roles:</strong>
              {user.roles && user.roles.length > 0
                ? user.roles
                    .map((role, index) => <span key={index}>{role.name}</span>)
                    .join(", ")
                : "No Roles Assigned"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
