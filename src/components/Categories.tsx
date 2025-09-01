const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: {
  categories: any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <div className="relative mx-4 sm:mx-8 lg:mx-20 mb-6">
      {/* Gradient Overlays for Scroll Indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10"></div>

      {/* Scrollable Categories */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setSearchQuery("");
              // Generate a random page number between 1 and 10 for variety
            }}
            className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 border-2 ${
              selectedCategory === category.id && !searchQuery
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500 shadow-lg shadow-purple-500/25"
                : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600 hover:text-white hover:shadow-md"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
