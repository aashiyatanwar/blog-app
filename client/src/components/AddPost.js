import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    // Clear error
    setError("");

    // Post data to backend
    axios
      .post(`${baseURL}posts`, { title, content })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while adding the post");
      });
  };

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-3xl font-bold mb-4">Add New Post</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter post content"
            rows="6"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
