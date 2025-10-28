import { Clock, Calendar, ExternalLink } from 'lucide-react';

const NewsCard = ({ article, darkMode }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
        darkMode ? 'bg-gray-800 hover:shadow-2xl hover:shadow-blue-500/10' : 'bg-white hover:shadow-xl shadow-md'
      }`}
    >
      {/* News Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
        />
        
        {/* Time badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {getTimeAgo(article.publishedAt)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Source */}
        <div className="mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
          }`}>
            {article.source.name}
          </span>
        </div>

        {/* Title */}
        <h2 className={`text-lg font-bold mb-2 line-clamp-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {article.title}
        </h2>
        
        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-3 flex-1 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {article.description || 'No description available.'}
        </p>

        {/* Footer */}
        <div className={`flex items-center justify-between pt-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {formatDate(article.publishedAt)}
            </span>
          </div>
          
          {/* Read button */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            Read
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;