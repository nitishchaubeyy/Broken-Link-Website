import api from '@/services/Api/api';
import { API_ENDPOINTS } from '@/constants/api.consts';

export const fetchGithubStars = async () => {
  const response = await api.get(API_ENDPOINTS.GITHUB_REPO);
  const data = response.data ? response.data : response;
  
  return data.stargazers_count;
};