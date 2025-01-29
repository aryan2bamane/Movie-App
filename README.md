

# React Movie App 🎬✨


## 🚀 Key Features

### 🌟 Movie Browsing
- **Browse effortlessly**: Fetch and display movie data from The Movie Database (TMDb) API. Whether you’re into action, comedy, or drama, it’s all at your fingertips.
  
### 🔍 Search Functionality
- **Find your next favorite**: Use the real-time search feature to look up specific movie titles. Watch as the results **update dynamically** with every keystroke, so you’re never stuck waiting.



## 🛠️ Technologies Used

- **ReactJS**: The powerful JavaScript library that makes the app **interactive** and easy to update in real-time.
- **Tailwind CSS**: Styling made simple and **elegant** with this utility-first CSS framework.
- **Appwrite**: Our backend server that handles the heavy lifting, tracking your search history, and storing trending movie data.
- **TMDb API**: The treasure chest of all movie data! It powers our movie browsing feature.

---

## 🌱 Getting Started

Ready to get your hands dirty? Here’s how to run the app locally and get it up and running on your machine!

### 1️⃣ Clone the Repository
Start by cloning the project to your local machine.

```bash
git clone https://github.com/aryan2bamane/movie-app.git
cd movie-app
```

### 2️⃣ Install Node.js and npm
If you don’t have Node.js and npm installed, grab them from [nodejs.org](https://nodejs.org/).

### 3️⃣ Install Dependencies

Install the required dependencies by running:

```bash
npm install
```

### 4️⃣ Set Up Appwrite
Here’s where things get fun! We need **Appwrite** to track search trends and handle movie data.

- Create an account on [Appwrite](https://appwrite.io/).
- Create a new project and a database named `movies`.
- Add a collection named `metric` with these attributes:
  - `search_term` (String, required)
  - `count` (Integer, default 1)
  - `poster_url` (String, required)
  - `movie_id` (Integer, required)
  
- Set the permissions to allow **all access**.
- Copy your **Project ID**, **Database ID**, and **Collection ID**—we’ll use them soon!

### 5️⃣ Configure Environment Variables
Create a `.env.local` file in the root of your project, and fill it in with the following environment variables:

```bash
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_TMDB_API_KEY=your_tmdb_api_key
```

> Don’t have a TMDb API key? [Sign up here](https://www.themoviedb.org/) to get one. It’s free!

### 6️⃣ Start the Application

Run the following to start the app:

```bash
npm run dev
```

Now, go ahead and open [http://localhost:5173](http://localhost:5173) in your browser. You’re ready to browse movies and see real-time trending data!

---

## 🧩 Project Structure

Here’s a breakdown of the app’s structure, so you’ll know exactly where to find everything:

```
movie-app/
├── node_modules/                  # Project dependencies
├── public/                         # Static assets (images, icons, etc.)
│   └── assets/
├── src/                            # Source code
│   ├── components/                 # Reusable components (MovieCard, Search, Spinner)
│   ├── appwrite.js                    # Appwrite interaction (handling search and trending data)
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point for React
│   ├── index.css                   # Global and Tailwind styles
│   └── .env.local                  # Store your API keys and Appwrite config
├── vite.config.js                  # Vite configuration
├── package.json                    # Project metadata and dependencies
├── README.md                       # Project documentation
└── .gitignore                      # Git ignore file
```

---

## 🌍 Deployment

When you’re ready to share the app with the world, here’s how you can deploy it:

### 1️⃣ Build the Application
Run the following to create an optimized production build:

```bash
npm run build
```

### 2️⃣ Deploy to Your Hosting Provider
- Log in to your hosting provider (e.g., Hostinger, Netlify).
- Upload the contents of the `dist` folder to your root directory.


That's it! You’ve got a fully functional, trendy, movie-searching app ready to rock. Happy coding and movie watching! 🍿🎥
