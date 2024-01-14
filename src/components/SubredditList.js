// src/components/SubredditList.js

import React from 'react';

const SubredditList = ({ subreddits }) => {
  return (
    <div className="subreddit-list">
      <h2>Popular Subreddits</h2>
      <ul>
        {subreddits.map((subreddit) => (
          <li key={subreddit.id}>
            <a
              href={`https://www.reddit.com/r/${subreddit.display_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {subreddit.display_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditList;
