# Anime Hub 🎬

A sleek and responsive web application for discovering and exploring a vast library of anime. Built with modern technologies, this platform offers a seamless user experience for searching, filtering, and browsing anime content fetched from the Jikan API.

## ✨ Features

- **Dynamic Browsing**: Explore various categories including Top Anime, Currently Airing, Upcoming Seasons, and Top Manga.
- **Advanced Search**: Instantly find any anime with a debounced search implementation for a smooth and responsive feel.
- **Powerful Filtering**: Refine your search results by release year and minimum score to find exactly what you're looking for.
- **Infinite Scrolling**: Effortlessly browse through extensive lists of anime with a seamless infinite scroll feature.
- **Modern UI**: A beautiful and responsive user interface crafted with Tailwind CSS, ensuring a great experience on any device.
- **Efficient Data Handling**: Leverages TanStack Query for robust data fetching, caching, and state management.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or a compatible package manager

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/FavourDarasimi/Anime-Hub.git
    ```

2.  **Navigate to the project directory**:

    ```bash
    cd Anime-Hub
    ```

3.  **Install dependencies**:

    ```bash
    npm install
    ```

4.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

## 🔧 Usage

Once the application is running, you can interact with it through your web browser:

- **Search**: Use the search bar at the top to look for specific anime titles. The results will update as you type.
- **Categories**: Click on the category buttons (e.g., "Top Anime", "Currently Airing", "Action") to browse pre-defined lists.
- **Filter**: Use the "Release Year" and "Score" dropdowns to narrow down the anime displayed in the current view.
- **Explore**: Simply scroll down the page. New anime will automatically load as you reach the bottom, allowing for continuous discovery.
- **View Details**: Hover over an anime card to see its score and other quick details.

## 🛠️ Technologies Used

This project is built with a modern, high-performance tech stack:

| Technology         | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **React**          | A JavaScript library for building user interfaces.                                           |
| **TypeScript**     | A typed superset of JavaScript that compiles to plain JavaScript.                            |
| **Vite**           | A next-generation frontend tooling that provides a faster and leaner development experience. |
| **Tailwind CSS**   | A utility-first CSS framework for rapidly building custom designs.                           |
| **TanStack Query** | A powerful library for fetching, caching, and updating asynchronous data.                    |
| **Axios**          | A promise-based HTTP client for the browser and Node.js.                                     |
