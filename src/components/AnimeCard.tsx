interface Anime {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
      large_image_url: string
    }
  }
  episodes: number | null
  year: number | null
  status: string
  genres: Array<{ mal_id: number; name: string }>
}

const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <div className='group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 hover:cursor-pointer hover:shadow-[0_0_50px_rgba(147,51,234,0.6)] hover:shadow-purple-600/60'>
      {/* Image Section with Status Badge */}
      <div className='relative'>
        <img 
          src={anime.images.jpg.large_image_url} 
          alt={anime.title} 
          className='w-full h-64 object-cover bg-gray-900'
        />
        {/* Status Badge */}
        <div className='absolute top-3 right-3'>
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold text-white ${
            anime.status === 'Currently Airing' ? 'bg-green-600' : 
            anime.status === 'Finished Airing' ? 'bg-gray-700' : 'bg-gray-600'
          }`}>
            {anime.status === 'Currently Airing' ? 'Airing' : 
             anime.status === 'Finished Airing' ? 'Completed' : anime.status}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className='p-4'>
        {/* Title */}
        <h2 className='text-lg font-bold mb-3 line-clamp-2 bg-white bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300'>{anime.title}</h2>
        
        {/* Metadata Row */}
        <div className='flex justify-between items-center mb-3 text-sm text-gray-400'>
          <span>{anime.year || 'Unknown'}</span>
          <span>{anime.episodes || 'Unknown'} episodes</span>
        </div>
        
        {/* Genre Tags */}
        <div className='flex flex-wrap gap-2'>
          {anime.genres?.slice(0, 3).map((genre) => (
            <span key={genre.mal_id} className='bg-gray-700 text-white px-3 py-1 rounded-full text-xs'>
              {genre.name}
            </span>
          ))}
          {anime.genres && anime.genres.length > 3 && (
            <span className='bg-gray-700 text-white px-3 py-1 rounded-full text-xs'>
              +{anime.genres.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnimeCard