// src/components/PostList.js

import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      <h2>Popular Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
