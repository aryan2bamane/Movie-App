import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search w-full px-10 my-10 text-white  ">
      <div className="flex items-center bg-white/10 pl-5 rounded-2xl">
        <img src="/search.svg" alt="search-icon" />
        <input
          className="w-full bg-transparent py-2 sm:pr-10 sm:pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden"
          type="text"
          placeholder="Search through thousands of movies!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
