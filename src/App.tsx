import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import AnimeCard from "./components/AnimeCard";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Filter from "./components/Filter";

const URL_API: string = "https://api.jikan.moe/v4";

const categories = [
  // Anime Categories
  { id: "all", name: "All Anime", endpoint: "/anime" },
  { id: "top", name: "Top Anime", endpoint: "/top/anime" },
  { id: "airing", name: "Currently Airing", endpoint: "/seasons/now" },
  { id: "upcoming", name: "Upcoming", endpoint: "/seasons/upcoming" },

  // Manga Categories
  { id: "manga", name: "Top Manga", endpoint: "/top/manga" },

  // Anime Genres
  { id: "genre_action", name: "Action", endpoint: "/anime?genres=1" },
  { id: "genre_adventure", name: "Adventure", endpoint: "/anime?genres=2" },
  { id: "genre_comedy", name: "Comedy", endpoint: "/anime?genres=4" },
  { id: "genre_drama", name: "Drama", endpoint: "/anime?genres=8" },
  { id: "genre_fantasy", name: "Fantasy", endpoint: "/anime?genres=10" },
  { id: "genre_horror", name: "Horror", endpoint: "/anime?genres=14" },
  { id: "genre_mystery", name: "Mystery", endpoint: "/anime?genres=7" },
  { id: "genre_romance", name: "Romance", endpoint: "/anime?genres=22" },
  { id: "genre_scifi", name: "Sci-Fi", endpoint: "/anime?genres=24" },
  { id: "genre_sports", name: "Sports", endpoint: "/anime?genres=30" },
  {
    id: "genre_sliceoflife",
    name: "Slice of Life",
    endpoint: "/anime?genres=36",
  },
  {
    id: "genre_supernatural",
    name: "Supernatural",
    endpoint: "/anime?genres=37",
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedScore, setSelectedScore] = useState("");

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "anime",
      selectedCategory,
      debouncedSearchQuery,
      selectedYear,
      selectedScore,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      if (debouncedSearchQuery.trim()) {
        const response = await axios.get(
          `${URL_API}/anime?q=${encodeURIComponent(
            debouncedSearchQuery.trim()
          )}&limit=20&page=${pageParam}`
        );
        return response.data;
      } else {
        const category = categories.find((cat) => cat.id === selectedCategory);
        let url = `${URL_API}${category?.endpoint}?limit=20&page=${pageParam}`;

        // Add score filter if selected
        if (selectedScore) {
          url += `&min_score=${selectedScore}`;
        }

        const response = await axios.get(url);
        console.log("API URL:", url); // Debug log
        return response.data;
      }
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.pagination?.has_next_page ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  // Client-side filtering for year
  const filteredData = useMemo(() => {
    if (!data?.pages) return data;

    const filteredPages = data.pages.map((page) => ({
      ...page,
      data: page.data.filter((anime: any) => {
        // Filter by year if selected
        if (selectedYear) {
          const animeYear = new Date(
            anime.aired?.from || anime.year || ""
          ).getFullYear();
          if (animeYear !== parseInt(selectedYear)) {
            return false;
          }
        }
        return true;
      }),
    }));

    return {
      ...data,
      pages: filteredPages,
    };
  }, [data, selectedYear]);

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }

      // Show back to top button when scrolled down
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error)
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen p-5 ">
      {/* Search + Categories */}
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Anime list */}
      <div className="p-4 sm:p-6 lg:p-8">
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Filters */}
        <Filter
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedScore={selectedScore}
          setSelectedScore={setSelectedScore}
        />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 px-2">
            {debouncedSearchQuery
              ? `Search Results for "${debouncedSearchQuery}"`
              : categories.find((cat) => cat.id === selectedCategory)?.name}
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <BeatLoader color="#8b5cf6" size={15} />
            </div>
          ) : (
            <>
              {filteredData?.pages.flatMap((page) => page.data).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                    />
                  </svg>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">
                    No anime found
                  </h3>
                  <p className="text-gray-500 max-w-md text-sm sm:text-base">
                    {debouncedSearchQuery
                      ? `No anime found for "${debouncedSearchQuery}". Try adjusting your search terms or filters.`
                      : "No anime available for the selected category and filters. Try changing your filters or selecting a different category."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                  {filteredData?.pages.flatMap((page) =>
                    page.data.map((anime: any) => (
                      <AnimeCard
                        key={anime.mal_id}
                        anime={anime}
                        isLoading={isLoading}
                      />
                    ))
                  )}
                </div>
              )}
            </>
          )}

          {isFetchingNextPage && (
            <div className="text-center py-4">
              <BeatLoader color="#8b5cf6" size={15} />
            </div>
          )}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-3 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
