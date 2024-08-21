import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/add-post">Add Post</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
