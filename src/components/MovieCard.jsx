import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card w-[230px] h-[435px] bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10 sm:w-[230px] sm:h-[400px]">
      <img
        className="rounded-lg h-auto w-auto "
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `/no-movie.png`
        }
        alt={title}
      />
      <div className="mt-4">
        <h3 className="text-white">{title}</h3>
        <div className="content">
          <div className="flex flex-row items-center gap-2">
            <img
              className="size-4 object-contain"
              src="/star.svg"
              alt="star-icon"
            />
            <p className="font-bold text-base text-white">
              {vote_average ? vote_average.toFixed(1) : `NA`}
            </p>
            <span>|</span>
            <span className="lang capitalize text-gray-100 font-medium text-base">
              {original_language}
            </span>
            <span>|</span>
            <span className="year  text-gray-100 font-medium text-base">
              {release_date
                ? release_date.split("-")[0] + "-" + release_date.split("-")[1]
                : `NA`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
