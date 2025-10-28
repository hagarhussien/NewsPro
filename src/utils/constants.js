export const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
console.log("API KEY:", import.meta.env.VITE_NEWS_API_KEY);
export const CATEGORIES = [
  { id: 'general', name: 'General' },
  { id: 'world', name: 'World' },
  { id: 'nation', name: 'Nation' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'sports', name: 'Sports' },
  { id: 'science', name: 'Science' },
  { id: 'health', name: 'Health' }
];

export const ARTICLES_PER_PAGE = 9;