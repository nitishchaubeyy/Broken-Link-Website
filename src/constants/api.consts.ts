import api from '@/services/Api/api';

export const API_ENDPOINTS = {
  GITHUB_REPO: 'https://api.github.com/repos/Deadlink-Hunter/Broken-Link-Website',
};

export const GITHUB_QUERY_KEY = 'githubStars';

export const GITHUB_STALE_TIME = 1000 * 60 * 5;

export const fetchGithubStars = async () => {
  const response = await api.get(API_ENDPOINTS.GITHUB_REPO);
  const data = response.data ? response.data : response;
  return data.stargazers_count as number;
};