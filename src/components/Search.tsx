const Search = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4  justify-center">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search for anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Search;
