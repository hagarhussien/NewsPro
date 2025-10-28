import { CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ selectedCategory, onCategoryChange, darkMode }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all font-medium text-sm ${
            selectedCategory === cat.id
              ? 'bg-blue-600 text-white shadow-md'
              : darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;