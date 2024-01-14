// src/App.js

import React, { useState, useEffect } from 'react';
import SubredditList from './components/SubredditList';
import PostList from './components/PostList';
import VideoList from './components/VideoList';
import { fetchPopularSubreddits, fetchPopularPosts, fetchPopularVideos, searchReddit } from './redditAPI';
import './styles.css';

// Function to shuffle an array randomly
function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
} 

function App() {
  const [subreddits, setSubreddits] = useState([]);
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentVisible, setContentVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for dark mode

  // Define an array of subreddit names
  const subredditNames = ['AskReddit', 'funny', 'news', 'aww', 'gaming'];

  useEffect(() => {
    // Function to fetch initial data
    const fetchInitialData = async () => {
      try {
        // Fetch popular subreddits and limit to 10
        const subredditData = await fetchPopularSubreddits();
        setSubreddits(subredditData.slice(0, 10));
  
        // Fetch popular posts from all subreddits and limit to 10 in total
        const postPromises = subredditNames.map((subreddit) =>
          fetchPopularPosts(subreddit)
        );
        const postData = await Promise.all(postPromises);
        const allPosts = postData.flat().slice(0, 10); // Limit to 10 posts in total
        setPosts(allPosts);
  
        // Fetch popular videos from each subreddit
        const videoPromises = subredditNames.map((subreddit) =>
          fetchPopularVideos(subreddit)
        );
        const videoData = await Promise.all(videoPromises);
        const allVideos = videoData.reduce((accumulator, current) =>
          accumulator.concat(current)
        );
        // Shuffle the list of videos and limit to 5
        setVideos(shuffleArray(allVideos).slice(0, 5));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
  
    fetchInitialData();
  }, []);
  

  useEffect(() => {
    // Function to fetch search results
    const fetchSearchResults = async () => {
      try {
        if (searchQuery) {
          // Fetch search results
          const searchData = await searchReddit(searchQuery);
          setSearchResults(searchData.slice(0, 5)); // Display the first 20 search results
        } else {
          setSearchResults([]); // Clear search results when the search query is empty
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery) {
      searchReddit(searchQuery)
        .then((data) => setSearchResults(data.slice(0, 5))) // Display the first 20 search results
        .catch((error) => console.error('Error searching Reddit:', error));
    }
  };

  // Delay the visibility of content by 2 seconds
  useEffect(() => {
    const delay = setTimeout(() => {
      setContentVisible(true);
      const header = document.querySelector('.header');
      header.classList.add('visible'); // Add the 'visible' class to the header
    }, 2000);

    return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="nav-bar">
        <img src="/RedditTrending.png" alt="RedditTrending" />
        <button
          className="dark-mode-button"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="header">
        <h1>RedditTrending</h1>
        <p>Catch up on Reddit's trending content on a single page!</p>
      </div>

      {contentVisible && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Reddit"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>
      )}

      {contentVisible && !searchQuery && (
        <div className="columns">
          <SubredditList subreddits={subreddits} />
          <PostList posts={posts} />
          <VideoList videos={videos} />
        </div>
      )}

      {contentVisible && searchQuery && (
        <div className="columns-center">
          <PostList posts={searchResults} />
          <VideoList videos={searchResults} />
        </div>
      )}
    </div>
  );
}

export default App;
