import React from "react";
import { CarouselMovie } from "../components/movies/CarouselMovie";
import { PopularMovies } from "../components/movies/MoviePopular";
export const HomeView: React.FC = () => {
  return (
    <>
      <section className="mx-auto max-w-6xl py-10">
        <CarouselMovie />
      </section>
      <section className="mx-auto max-w-6xl py-20">
        <PopularMovies />
      </section>
    </>
  );
};
