import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch, darkMode }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        
        <input
          type="text"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`w-full pl-12 pr-28 py-4 rounded-xl text-base transition-all ${
            darkMode 
              ? 'bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500' 
              : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200 focus:border-blue-500 shadow-sm'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
        
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;