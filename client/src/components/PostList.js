import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold">{post.title}</h3>
            <p className="mt-4 text-gray-600">
              {post.content.substring(0, 100)}...
            </p>
            <Link
              to={`/posts/${post._id}`}
              className="text-blue-600 mt-4 block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
