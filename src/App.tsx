import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import AnimeCard from './components/AnimeCard'

const URL_API: string = "https://api.jikan.moe/v4"

const categories = [
  // Anime Categories
  { id: 'top', name: 'Top Anime', endpoint: '/top/anime' },
  { id: 'airing', name: 'Currently Airing', endpoint: '/seasons/now' },
  { id: 'upcoming', name: 'Upcoming', endpoint: '/seasons/upcoming' },


  // Manga Categories
  { id: 'manga', name: 'Top Manga', endpoint: '/top/manga' },


  // Anime Genres
  { id: 'genre_action', name: 'Action', endpoint: '/anime?genres=1' },
  { id: 'genre_adventure', name: 'Adventure', endpoint: '/anime?genres=2' },
  { id: 'genre_comedy', name: 'Comedy', endpoint: '/anime?genres=4' },
  { id: 'genre_drama', name: 'Drama', endpoint: '/anime?genres=8' },
  { id: 'genre_fantasy', name: 'Fantasy', endpoint: '/anime?genres=10' },
  { id: 'genre_horror', name: 'Horror', endpoint: '/anime?genres=14' },
  { id: 'genre_mystery', name: 'Mystery', endpoint: '/anime?genres=7' },
  { id: 'genre_romance', name: 'Romance', endpoint: '/anime?genres=22' },
  { id: 'genre_scifi', name: 'Sci-Fi', endpoint: '/anime?genres=24' },
  { id: 'genre_sports', name: 'Sports', endpoint: '/anime?genres=30' },
  { id: 'genre_sliceoflife', name: 'Slice of Life', endpoint: '/anime?genres=36' },
  { id: 'genre_supernatural', name: 'Supernatural', endpoint: '/anime?genres=37' },
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('top')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500) // Wait 500ms after user stops typing

    return () => clearTimeout(timer)
  }, [searchQuery])
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['anime', selectedCategory, debouncedSearchQuery, pageNumber],
    queryFn: async () => {
      if (debouncedSearchQuery.trim()) {
        const response = await axios.get(`${URL_API}/anime?q=${encodeURIComponent(debouncedSearchQuery.trim())}&limit=20`)
        return response.data
      } else {
        const category = categories.find(cat => cat.id === selectedCategory)
        const response = await axios.get(`${URL_API}${category?.endpoint}?limit=20&page=${pageNumber}`)
        return response.data
      }
    },
    enabled: !isSearching
  })

  useEffect(() => {
    console.log(data)

    if (!data?.data) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === data.data.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [data?.data])

  if (isLoading) return <div className='bg-black text-white min-h-screen flex items-center justify-center'>Loading...</div>
  if (error) return <div className='bg-black text-white min-h-screen flex items-center justify-center'>Error: {error.message}</div>

  const currentAnime = data?.data?.[currentIndex]

  return (
    <div className='bg-black text-white min-h-screen'>
      {/* Category Navigation */}
      <div className='bg-gray-900 border-b border-gray-700 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          {/* Search Bar */}
          <div className='flex items-center gap-4 mb-4'>
            <div className='relative flex-1 max-w-md'>
              <input
                type='text'
                placeholder='Search for anime...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20'
              />
              <svg
                className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('top')
                }}
                className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors'
              >
                Clear
              </button>
            )}
          </div>
          
         
     
        </div>
      </div>

      {/* Anime List Section */}
      <div className='p-8'>
         {/* Categories */}
        <div className='relative mx-20'>
            {/* Gradient Overlays for Scroll Indicators */}
            <div className='absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10'></div>
            <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10'></div>
            
            {/* Scrollable Categories */}
            <div className='flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSearchQuery('')
                    // Generate a random page number between 1 and 10 for variety
                    setPageNumber(Math.floor(Math.random() * 10) + 1)
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 border-2 ${
                    selectedCategory === category.id && !searchQuery
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500 shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600 hover:text-white hover:shadow-md'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        <h2 className='text-4xl font-bold text-center mb-8'>
          {debouncedSearchQuery 
            ? `Search Results for "${debouncedSearchQuery}"`
            : categories.find(cat => cat.id === selectedCategory)?.name
          }
        </h2>
        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-xl'>Loading...</div>
          </div>
        ) : error ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-xl text-red-400'>Error: {(error as Error).message}</div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto'>
            {data?.data?.map((anime: any) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
