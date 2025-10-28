import { API_KEY } from '../utils/constants';

const BASE_URL = 'https://gnews.io/api/v4';

const proxyFetch = async (url) => {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error('Failed to fetch data through proxy');
  return response.json();
};

export const fetchTopHeadlines = async (category = 'general', page = 1, max = 9) => {
  try {
    const url = `${BASE_URL}/top-headlines?category=${category}&lang=en&country=us&max=${max}&page=${page}&apikey=${API_KEY}`;
    const data = await proxyFetch(url);

    return {
      articles: data.articles || [],
      totalArticles: data.totalArticles || 0,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchNews = async (query, page = 1, max = 9) => {
  try {
    const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=en&max=${max}&page=${page}&apikey=${API_KEY}`;
    const data = await proxyFetch(url);

    return {
      articles: data.articles || [],
      totalArticles: data.totalArticles || 0,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
