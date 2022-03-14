import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import styled from "styled-components";
import "@splidejs/splide/dist/css/splide.min.css";
import "./slider.css";

import UilStar from "@iconscout/react-unicons/icons/uil-star";

const Popularno = styled.h1`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: white;
  margin: 0;
  background-color: rgba(157, 157, 157, 0.5);
  color: #6ACC87;
  text-shadow: 5px 5px 8px #000;
`;

const Naslov = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Vote = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const InfoColumn = styled.div`
  height: fit-content;
  padding: 10px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  color: white;
  background-color: rgba(157, 157, 157, 0.5);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

const WrappingDiv = styled.div`
  // border-top: 2px solid darkgray;
  // border-bottom: 2px solid darkgray;
`;

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`
        );
        setMovieItems(res.data.results.slice(0, 20));
        console.log(res);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getTopRated = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setTopRated(res.data.results);
        console.log(res);
      } catch {
        console.log("error");
      }
    };
    getTopRated();
  }, []);

  return (
    <WrappingDiv>
      <Popularno>Trenutno popularno </Popularno>
      <Splide
        className="slider__component"
        options={{
          perPage: 3,
          rewind: true,
        }}
      >
        {movieItems.map((movie, i) => (
          <SplideSlide className="swiper-wrapper splide__item" key={i}>
            <div
              className="splide__slider"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              }}
            >
              <InfoColumn>
                <Naslov>{movie.title}</Naslov>
                <span>Datum izlaska: {movie.release_date}</span>
                <Vote>
                  {movie.vote_average}{" "}
                  <UilStar size="20px" textAlign="center" />
                </Vote>
              </InfoColumn>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <div></div>
      <Popularno>Najbolje ocijenjeno </Popularno>
      <Splide
        className="slider__component"
        options={{
          perPage: 3,
          rewind: true,
        }}
      >
        {topRated.map((movie, i) => (
          <SplideSlide className="swiper-wrapper splide__item" key={i}>
            <div
              className="splide__slider"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
              }}
            >
              <InfoColumn>
                <Naslov>{movie.title}</Naslov>
                <span>
                  Godina izlaska: {movie.release_date.substring(0, 4)}.
                </span>
                <Vote>
                  {movie.vote_average}{" "}
                  <UilStar size="20px" textAlign="center" />
                </Vote>
              </InfoColumn>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </WrappingDiv>
  );
};

export default HeroSlide;
