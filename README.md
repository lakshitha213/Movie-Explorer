
# 🎬 Movie Explorer

> **Discover Your Favorite Films**

Movie Explorer is a modern and responsive movie discovery web application built with **React.js** and **Material UI (MUI)**. The application integrates with the **TMDb (The Movie Database) API** to provide real-time movie information.

Users can search for movies, explore trending films, view detailed movie information, watch trailers, filter movies, and save their favorite movies for later.

---

## 🌐 Live Demo

🔗 **Live Demo:** [Movie Explorer](https://movieexplore1.netlify.app/)

🔗 **GitHub Repository:** [Movie Explorer](https://github.com/lakshitha213/Movie-Explorer)

---

## 📸 Screenshots

### 🔐 Login Page

<img width="1356" height="597" alt="Screenshot 2026-10-07 231020" src="https://github.com/user-attachments/assets/b9733486-66a0-469c-a13e-5c91821d02ef" />

### 🏠 Home Page

<img width="1362" height="592" alt="Screenshot 2026-10-07 231244" src="https://github.com/user-attachments/assets/9e145a22-a8f5-4972-a9d4-d0398feae59a" />

### 🔎 Search Results

<img width="1359" height="593" alt="Screenshot 2026-10-07 231118" src="https://github.com/user-attachments/assets/bb515ba8-b8ea-42b5-8514-4c9b899c32d2" />

### 🎬 Movie Details

<img width="1357" height="598" alt="Screenshot 2026-10-07 231133" src="https://github.com/user-attachments/assets/4f41ac64-0bfb-4922-8b34-fbfa799d70ab" />

<img width="1356" height="532" alt="Screenshot 2026-10-07 231144" src="https://github.com/user-attachments/assets/bd462df0-f883-45c0-9e9f-6dcbcf472c50" />


### ❤️ Favorites

<img width="1357" height="528" alt="Screenshot 2026-10-07 231201" src="https://github.com/user-attachments/assets/c2ede83c-6696-4983-8a96-cacf2e7a72c4" />

### 🌙 Dark Mode

<img width="1359" height="601" alt="Screenshot 2026-10-07 231230" src="https://github.com/user-attachments/assets/1f37668e-f4ad-4d08-9057-94b91a0509d4" />

<img width="1361" height="593" alt="Screenshot 2026-10-07 231042" src="https://github.com/user-attachments/assets/7c8462d9-8582-47f8-b5ae-7bbf4e551c67" />


> **Note:** Replace the screenshot paths with your actual screenshot locations.

---

# ✨ Features

## 🔐 User Login

- Username and password login interface
- Login state persistence using `localStorage`
- Logout functionality
- Client-side login experience

> **Note:** The login system is implemented for frontend demonstration purposes and does not use a backend authentication service.

---

## 🔎 Movie Search

Users can search for movies by entering a movie title.

The application fetches relevant results from the TMDb API and displays them in a responsive movie grid.

Each movie card includes:

- 🎬 Movie poster
- 📝 Movie title
- 📅 Release year
- ⭐ Rating
- ❤️ Favorite button

---

## 🔥 Trending Movies

The home page displays trending movies retrieved directly from the TMDb API.

Users can select any movie to open its detailed information page.

---

## 🎬 Movie Details

The movie details page provides comprehensive information about the selected movie.

It includes:

- Movie title
- Movie poster
- Backdrop image
- Release date
- Runtime
- Rating
- Overview
- Genres
- Cast
- Trailer
- Additional movie information

---

## ❤️ Favorite Movies

Users can save movies to their favorite list.

Favorites are stored locally using browser `localStorage`.

Users can:

- Add movies to favorites
- Remove movies from favorites
- View all favorite movies
- Open favorite movie details
- Keep favorites after refreshing the browser

---

## 🌙 Dark Mode & ☀️ Light Mode

Movie Explorer supports both dark and light themes.

Users can switch between:

- 🌙 Dark Mode
- ☀️ Light Mode

Theme management is handled using the **React Context API**.

---

## 🎯 Movie Filters

Users can filter movies based on:

- 🎭 Genre
- 📅 Release year
- ⭐ Rating

These filters make it easier to discover movies according to specific preferences.

---

## 📄 Load More

Movie search results support pagination using a **Load More** button.

~~~text
Search Movie
     ↓
Page 1
     ↓
Load More
     ↓
Page 2
     ↓
Load More
     ↓
Page 3
~~~

This improves performance and provides a better browsing experience.

---

## ▶️ Movie Trailers

Where trailer information is available, users can access movie trailers through the movie details page.

Trailer information is retrieved using TMDb movie video data.

---

## 📱 Responsive Design

The application follows a mobile-first responsive design approach.

Movie Explorer is designed to work across:

- 📱 Mobile devices
- 📲 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

Material UI responsive components are used throughout the application.

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend framework |
| JavaScript | Application logic |
| Material UI | UI components and styling |
| React Router DOM | Client-side routing |
| Axios | HTTP/API requests |
| React Context API | State management |
| TMDb API | Movie data |
| Local Storage | Client-side persistence |
| HTML5 | Application structure |
| CSS3 | Styling |
| Git | Version control |
| GitHub / GitLab | Source code management |
| Netlify | Deployment |

---

# 🏗️ Application Architecture

The application follows a component-based React architecture.

~~~text
                        Movie Explorer
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
          Login             Home           Favorites
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
              Search       Trending      Filters
                 │            │            │
                 └────────────┼────────────┘
                              │
                              ▼
                         TMDb API
                              │
                              ▼
                       Movie Results
                              │
                              ▼
                       Movie Details
~~~

---

# 📂 Project Structure

~~~text
Movie-Explorer/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   │
│   ├── Assets/
│   │   ├── images/
│   │   └── ...
│   │
│   ├── Components/
│   │   ├── MovieCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── MovieGrid.jsx
│   │   └── ...
│   │
│   ├── Context/
│   │   ├── ThemeContext.jsx
│   │   └── ...
│   │
│   ├── Pages/
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Favorites.jsx
│   │   └── ...
│   │
│   ├── Services/
│   │   └── tmdbApi.js
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── screenshots/
│   ├── login.png
│   ├── home.png
│   ├── search-results.png
│   ├── movie-details.png
│   ├── favorites.png
│   └── dark-mode.png
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
~~~

---

# 🔑 TMDb API Integration

Movie Explorer uses **The Movie Database (TMDb)** API to retrieve real-time movie information.

### TMDb Website

[https://www.themoviedb.org/](https://www.themoviedb.org/)

### TMDb API Documentation

[https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)

---

## 📡 API Endpoints Used

### Trending Movies

~~~http
GET /trending/movie/week
~~~

Used to display popular and trending movies.

---

### Search Movies

~~~http
GET /search/movie
~~~

Used to search for movies based on the user's search query.

---

### Movie Details

~~~http
GET /movie/{movie_id}
~~~

Used to retrieve detailed information about a movie.

---

### Movie Credits

~~~http
GET /movie/{movie_id}/credits
~~~

Used to retrieve cast information.

---

### Movie Videos

~~~http
GET /movie/{movie_id}/videos
~~~

Used to retrieve trailers and other video information.

---

### Movie Genres

~~~http
GET /genre/movie/list
~~~

Used to retrieve movie genres.

---

# 🔄 API Request Flow

~~~text
User Action
     │
     ▼
React Component
     │
     ▼
Axios Request
     │
     ▼
TMDb API
     │
     ▼
JSON Response
     │
     ▼
React State
     │
     ▼
UI Update
~~~

---

# ⚙️ Installation & Setup

## Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- Git

You can check the installed versions:

~~~bash
node --version
~~~

~~~bash
npm --version
~~~

---

## 1. Clone the Repository

~~~bash
git clone https://github.com/lakshitha213/Movie-Explorer
~~~

---

## 2. Navigate to the Project

~~~bash
cd Movie-Explorer
~~~

---

## 3. Install Dependencies

~~~bash
npm install
~~~

---

## 4. Configure TMDb API

Create a `.env` file in the project root directory.

~~~env
REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
~~~

Replace:

~~~text
YOUR_TMDB_API_KEY
~~~

with your actual TMDb API key.

---

## 5. Start the Development Server

~~~bash
npm start
~~~

The application will run at:

~~~text
http://localhost:3000
~~~

---

# 🔐 Environment Variables

The project requires the following environment variables:

| Variable | Description |
|---|---|
| `REACT_APP_TMDB_API_KEY` | TMDb API key |
| `REACT_APP_TMDB_BASE_URL` | TMDb API base URL |

Example:

~~~env
REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
~~~

### ⚠️ Important

Never commit your `.env` file containing sensitive credentials to GitHub.

Add the following to `.gitignore`:

~~~gitignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
~~~

---

# 🧭 Application Routes

The application uses **React Router DOM** for navigation.

| Route | Description |
|---|---|
| `/` | Login page |
| `/home` | Home / movie discovery |
| `/movie/:id` | Movie details |
| `/favorites` | Favorite movies |

---

# 💾 Local Storage

Movie Explorer uses browser `localStorage` for client-side persistence.

The application can store:

~~~text
Login state
Username
Last searched movie
Favorite movies
Theme preference
~~~

Example:

~~~javascript
localStorage.setItem(
  "favorites",
  JSON.stringify(favorites)
);
~~~

---

# 🧠 State Management

The application uses **React Context API** for global state management.

Context is used to manage application-wide information such as:

- Theme
- Light/Dark mode
- Shared UI state

Local component state is managed using React hooks such as:

~~~javascript
useState()
useEffect()
~~~

---

# ❤️ Favorites Flow

~~~text
User clicks Favorite
        ↓
Movie added to favorites
        ↓
React State Updated
        ↓
localStorage Updated
        ↓
Favorites Page
        ↓
User can view/remove movie
~~~

---

# 🔎 Search Flow

~~~text
User enters movie name
        ↓
SearchBar
        ↓
Search request
        ↓
Axios
        ↓
TMDb API
        ↓
Search results
        ↓
Movie Grid
        ↓
User selects movie
        ↓
Movie Details
~~~

---

# 🎬 Movie Details Flow

~~~text
Movie Card
     ↓
User clicks movie
     ↓
React Router
     ↓
Movie Details Page
     ↓
Movie ID
     ↓
TMDb API
     ↓
Movie Information
     ↓
Details displayed
~~~

---

# ⚠️ Error Handling

The application provides user-friendly error handling for common problems.

Handled scenarios include:

- Invalid API key
- API request failure
- Network connection problems
- No search results
- Movie not found
- Missing movie poster
- Missing trailer
- Loading states

Instead of exposing raw API errors, the application displays understandable messages to the user.

---

# 🧪 Testing

The following functionality should be tested before deployment.

## Login Testing

- [x] Valid username
- [x] Valid password
- [x] Empty username validation
- [x] Empty password validation
- [x] Logout functionality

## Search Testing

- [x] Search valid movie
- [x] Search invalid movie
- [x] Empty search
- [x] No search results
- [x] API error handling

## Movie Details Testing

- [x] Movie title
- [x] Movie poster
- [x] Release date
- [x] Rating
- [x] Genres
- [x] Overview
- [x] Cast
- [x] Trailer

## Favorites Testing

- [x] Add movie
- [x] Remove movie
- [x] View favorites
- [x] Persist favorites after refresh

## Theme Testing

- [x] Light mode
- [x] Dark mode
- [x] Theme switching
- [x] Theme persistence

## Responsive Testing

Tested on:

- [x] Mobile
- [x] Tablet
- [x] Laptop
- [x] Desktop

---

# 📱 Responsive Design

The application uses Material UI's responsive layout system.

Example responsive layout:

~~~text
Desktop
┌────────┬────────┬────────┬────────┐
│ Movie  │ Movie  │ Movie  │ Movie  │
└────────┴────────┴────────┴────────┘

Tablet
┌────────┬────────┬────────┐
│ Movie  │ Movie  │ Movie  │
└────────┴────────┴────────┘

Mobile
┌────────┐
│ Movie  │
├────────┤
│ Movie  │
├────────┤
│ Movie  │
└────────┘
~~~

---

# 🚀 Deployment

Movie Explorer can be deployed using **Netlify** or **Vercel**.

## Build for Production

Run:

~~~bash
npm run build
~~~

This creates the production build inside:

~~~text
build/
~~~

---

## 🌐 Netlify Deployment

### Build Command

~~~bash
npm run build
~~~

### Publish Directory

~~~text
build
~~~

### Environment Variables

Add the following variables in Netlify:

~~~text
REACT_APP_TMDB_API_KEY
REACT_APP_TMDB_BASE_URL
~~~

After configuring the environment variables, deploy the application.

---

# 🔀 Git Workflow

Recommended Git workflow:

~~~bash
git add .
~~~

~~~bash
git commit -m "Add movie explorer features"
~~~

~~~bash
git push origin main
~~~

---

# 📋 Project Requirements Checklist

| Requirement | Status |
|---|---|
| User Login Interface | ✅ |
| Username & Password | ✅ |
| Movie Search | ✅ |
| Movie Poster Grid | ✅ |
| Movie Title | ✅ |
| Release Year | ✅ |
| Movie Rating | ✅ |
| Movie Details | ✅ |
| Movie Overview | ✅ |
| Movie Genres | ✅ |
| Movie Cast | ✅ |
| Movie Trailer | ✅ |
| Trending Movies | ✅ |
| Light Mode | ✅ |
| Dark Mode | ✅ |
| TMDb API Integration | ✅ |
| Search Pagination | ✅ |
| API Error Handling | ✅ |
| React Context API | ✅ |
| Local Storage | ✅ |
| Favorite Movies | ✅ |
| Genre Filter | ✅ |
| Year Filter | ✅ |
| Rating Filter | ✅ |
| Load More | ✅ |
| React Router | ✅ |
| Responsive Design | ✅ |
| Deployment | ✅ |

---

# 🔮 Future Improvements

The following features could be added in future versions:

- 🔐 Real backend authentication
- 👤 User profiles
- ☁️ Cloud-based favorite synchronization
- ⭐ User movie ratings
- 💬 Movie reviews
- 🎯 Personalized recommendations
- 🤖 AI-powered movie recommendations
- 🔔 Movie release notifications
- 🎞️ Watchlist functionality
- 🌍 Multi-language support
- 📊 Movie statistics
- 🔍 Advanced search
- 🎭 Actor/Actress profile pages

---

# 📦 Production Build

To create an optimized production build:

~~~bash
npm run build
~~~

The generated production files will be placed in:

~~~text
build/
~~~

These files can be deployed to services such as:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

---

# 🧑‍💻 Developer

## Thilina Lakshitha

Software Engineering & QA Engineering Enthusiast

### Technical Skills Demonstrated

- React.js
- JavaScript
- Material UI
- REST API Integration
- Axios
- React Router
- React Context API
- Local Storage
- Responsive Web Design
- Git
- GitHub / GitLab
- Netlify Deployment

---

# 📚 Resources

- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [The Movie Database](https://www.themoviedb.org/)
- [TMDb API Documentation](https://developers.themoviedb.org/3)

---

# 🙏 Acknowledgements

Special thanks to **The Movie Database (TMDb)** for providing the movie data API used in this project.

Movie data and images are provided by TMDb.

This project is not affiliated with or endorsed by TMDb.

---

# 📄 License

This project was developed for **educational and internship evaluation purposes**.

The project source code is available for learning and demonstration purposes.

---

# ⭐ Support

If you found this project useful, please consider giving the repository a ⭐ on GitHub.

Thank you for checking out **Movie Explorer**! 🎬🍿
