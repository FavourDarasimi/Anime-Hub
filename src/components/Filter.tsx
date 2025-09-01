import React from "react";

const Filter = ({
  selectedYear,
  setSelectedYear,
  selectedScore,
  setSelectedScore,
}: {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedScore: string;
  setSelectedScore: (score: string) => void;
}) => {
  return (
    <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row flex-wrap gap-8">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="year-filter"
          className="text-sm font-medium text-gray-300 whitespace-nowrap"
        >
          Release Year:
        </label>
        <div className="relative">
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="appearance-none w-40 px-3 py-1 bg-gray-800 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none text-sm flex-1 sm:flex-none scrollbar-hide pr-8"
          >
            <option value="">All Years</option>
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="score-filter"
          className="text-sm font-medium text-gray-300 whitespace-nowrap"
        >
          Score:
        </label>
        <div className="relative">
          <select
            id="score-filter"
            value={selectedScore}
            onChange={(e) => setSelectedScore(e.target.value)}
            className="appearance-none px-3 py-1 bg-gray-800 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none text-sm flex-1 sm:flex-none scrollbar-hide pr-8"
          >
            <option value="">All Scores</option>
            <option value="9">9+ (Excellent)</option>
            <option value="8">8+ (Very Good)</option>
            <option value="7">7+ (Good)</option>
            <option value="6">6+ (Fair)</option>
            <option value="5">5+ (Average)</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {(selectedYear || selectedScore) && (
        <button
          onClick={() => {
            setSelectedYear("");
            setSelectedScore("");
          }}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm self-end border-2 border-gray-600 cursor-pointer"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default Filter;
