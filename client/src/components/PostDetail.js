import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-3xl font-bold">{post.title}</h2>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}

export default PostDetail;
