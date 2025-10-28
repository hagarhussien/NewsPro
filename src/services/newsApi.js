import { API_KEY, ARTICLES_PER_PAGE } from '../utils/constants';

const BASE_URL = 'https://gnews.io/api/v4';

export const fetchTopHeadlines = async (category = 'general', page = 1, max = 9) => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=${category}&lang=en&country=us&max=${max}&page=${page}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return {
      articles: data.articles || [],
      totalArticles: data.totalArticles || 0
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchNews = async (query, page = 1, max = 9) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=en&max=${max}&page=${page}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search news');
    }
    
    const data = await response.json();
    return {
      articles: data.articles || [],
      totalArticles: data.totalArticles || 0
    };
  } catch (error) {
    throw new Error(error.message);
  }
};