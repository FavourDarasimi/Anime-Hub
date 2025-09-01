interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  episodes: number | null;
  year: number | null;
  status: string;
  genres: Array<{ mal_id: number; name: string }>;
  score: number | null;
  isLoading: boolean;
}

const AnimeCard = ({
  anime,
  isLoading,
}: {
  anime: Anime;
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  return (
    <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:cursor-pointer">
      {/* Image Section with Status Badge and Score */}
      <div className="relative overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover bg-gray-900 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Status Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span
            className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold text-white ${
              anime.status === "Currently Airing"
                ? "bg-green-600"
                : anime.status === "Finished Airing"
                ? "bg-gray-700"
                : "bg-gray-600"
            }`}
          >
            {anime.status === "Currently Airing"
              ? "Airing"
              : anime.status === "Finished Airing"
              ? "Completed"
              : anime.status}
          </span>
        </div>

        {/* Score with Star - Shows on hover */}
        {anime.score && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-xs font-semibold">
              {anime.score.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 line-clamp-2 bg-white bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
          {anime.title}
        </h2>

        {/* Metadata Row */}
        <div className="flex justify-between items-center mb-2 sm:mb-3 text-xs sm:text-sm text-gray-400">
          <span>{anime.year || "Unknown"}</span>
          <span>{anime.episodes || "Unknown"} episodes</span>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {anime.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.mal_id}
              className="bg-gray-700 text-white px-2 sm:px-3 py-1 rounded-full text-xs"
            >
              {genre.name}
            </span>
          ))}
          {anime.genres && anime.genres.length > 3 && (
            <span className="bg-gray-700 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
              +{anime.genres.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
