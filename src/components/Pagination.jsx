import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, darkMode }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxBoxes = 4; 
  let startPage = Math.max(1, currentPage - Math.floor(maxBoxes / 2));
  let endPage = Math.min(totalPages, startPage + maxBoxes - 1);

  startPage = Math.max(1, endPage - maxBoxes + 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-all ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : darkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-white'
            : 'bg-white hover:bg-gray-100 text-gray-900 shadow-sm'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
            currentPage === num
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white shadow-lg'
              : darkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-900 shadow-sm'
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-all ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : darkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-white'
            : 'bg-white hover:bg-gray-100 text-gray-900 shadow-sm'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
