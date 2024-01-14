// src/redditAPI.js

const REDDIT_API_URL = 'https://www.reddit.com';

// Function to fetch popular subreddits
export const fetchPopularSubreddits = async () => {
  const response = await fetch(`${REDDIT_API_URL}/subreddits/popular/.json`);
  const data = await response.json();
  return data.data.children.map((child) => child.data);
};

// Function to fetch popular posts from a subreddit
export const fetchPopularPosts = async (subreddit) => {
  const response = await fetch(`${REDDIT_API_URL}/r/${subreddit}/hot/.json`);
  const data = await response.json();
  return data.data.children.map((child) => child.data);
};

// Function to fetch popular videos from a subreddit
export const fetchPopularVideos = async (subreddit) => {
  const response = await fetch(`${REDDIT_API_URL}/r/${subreddit}/top/.json?sort=top&t=week&limit=5`);
  const data = await response.json();
  return data.data.children.map((child) => child.data);
};

// Function to search Reddit for a query
export const searchReddit = async (query) => {
  const response = await fetch(`${REDDIT_API_URL}/search.json?q=${query}`);
  const data = await response.json();
  return data.data.children.map((child) => child.data);
};
