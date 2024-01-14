// src/components/VideoList.js

import React from 'react';

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      <h2>Popular Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
