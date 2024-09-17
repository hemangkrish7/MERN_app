import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]); // Initialize as empty array
  const [error, setError] = useState("");

  // Fetch data from the server
  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      setError("Failed to fetch data");
    }
  }

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("Deleted successfully");
        
        setTimeout(() => {
          setError(""); // Clear error after 2 seconds
          getData(); // Refresh the data
        }, 1000);
      }
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

  return (
    <div className="container my-2">
      {/* Display error if any */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <h2 className="text-center">All data</h2>

      <div className="row">
        {/* Map over the fetched data to render cards */}
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {ele.email}
                  </h6>
                  <p className="text-muted">{ele.age}</p>
                  <a
                    href="#"
                    className="card-link"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </a>
                  <Link to={`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Read;
