import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // New state for success message
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the single user's data
  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (err) {
      setError("Failed to fetch user data");
    }
  };

  // Submit the updated user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        setSuccess("User updated successfully"); // Set success message

        // Delay the redirection by 2 seconds
        setTimeout(() => {
          navigate("/all"); // Navigate to the "Read" page after 2 seconds
        }, 2000);
      }
    } catch (err) {
      setError("Failed to update user");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {/* Display error if any */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Display success message if any */}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      <h2 className="text-center">Edit User</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
