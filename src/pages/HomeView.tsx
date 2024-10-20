import React from "react";
import { CarouselMovie } from "../components/CarouselMovie";
import { PopularMovies } from "../components/PopularMovies";
export const HomeView: React.FC = () => {
  return (
    <>
      <section className="mx-auto max-w-6xl py-4">
        <CarouselMovie />
      </section>
      <section className="mx-auto max-w-6xl py-20">
        <PopularMovies />
      </section>
    </>
  );
};
