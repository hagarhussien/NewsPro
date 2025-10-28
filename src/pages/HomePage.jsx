import { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import NewsCard from '../components/NewsCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { fetchTopHeadlines, searchNews } from '../services/newsApi';
import { ARTICLES_PER_PAGE } from '../utils/constants';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    loadNews();
  }, [category, page]);

  const loadNews = async () => {
    setLoading(true);
    setError(null);

    try {
      let result;
      if (searchQuery) {
        result = await searchNews(searchQuery, page, ARTICLES_PER_PAGE);
      } else {
        result = await fetchTopHeadlines(category, page, ARTICLES_PER_PAGE);
      }
      
      setArticles(result.articles);
      setTotalArticles(result.totalArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadNews();
  };

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    setSearchQuery('');
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      
      {/* Header Section */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors ${
        darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'
      } border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            darkMode={darkMode}
          />
          <CategoryFilter 
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            darkMode={darkMode}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading && <Loading />}
        
        {error && <ErrorMessage message={error} darkMode={darkMode} />}
        
        {!loading && !error && articles.length > 0 && (
          <>
            {/* Section Title */}
            <div className="text-center mb-10">
              <h2 className={`text-3xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Latest News
              </h2>
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Stay updated with recent stories
              </p>
            </div>

            {/* News Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => (
                <NewsCard 
                  key={index}
                  article={article} 
                  darkMode={darkMode}
                />
              ))}
            </div>
            
            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              darkMode={darkMode}
            />
          </>
        )}
        
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📰</div>
            <p className={`text-2xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No News Found
            </p>
            <p className={`text-base mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try a different search or category
            </p>
            <button
              onClick={() => setCategory('general')}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              Browse All News
            </button>
          </div>
        )}
      </main>

    
      {/* Footer */}
<footer className={`mt-16 py-12 ${
  darkMode ? 'bg-gray-800/50' : 'bg-white/50'
} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md`}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      
      {/* About Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            NewsPro
          </h3>
        </div>
        <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your trusted source for the latest news from around the world. Stay informed, stay ahead.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Categories
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {['World', 'Technology', 'Business', 'Sports'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat.toLowerCase())}
              className={`text-sm text-left hover:underline transition-colors ${
                darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Developer Info */}
      <div>
        <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Developed By
        </h4>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-2`}>
          <p className="font-semibold">
            <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Hager Hussien</span>
          </p>
          <p>Full Stack Developer</p>
          <div className="flex gap-3 mt-3">
            {/* GitHub */}
            <a 
              href="https://github.com/hagarhussien?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`hover:scale-110 transition-transform ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a 
              href="www.linkedin.com/in/hager-hussien" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`hover:scale-110 transition-transform ${
                darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
          </div>
        </div>
      </div>
    </div>

    
  </div>
</footer>
    </div>
  );
};

export default HomePage;