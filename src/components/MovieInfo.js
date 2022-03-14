import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UilX } from "@iconscout/react-unicons";
import { GlobalContext } from "../context/GlobalState";

const API_KEY = "115bd368";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  background-color: rgba(157, 157, 157, 0.5);
`;

const CoverImage = styled.img`
  height: 352px;
  object-fit: cover;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
  overflow: hidden;
`;

const MovieInfoSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    color:  #fffee6;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  height: fit-content;
  padding: 8px;
  cursor: pointer;
  opacity: 0.8;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #21d07a;
  color: white;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  border: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  line-height: 1.1;
  width: 250px;
  &:hover {
    background-color: #1aa762;
    opacity: 1;
    cursor: pointer;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const MovieInfo = (props) => {
  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);

  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  // let storedMovie = watchlist.find((o) => o.imdbID === movieInfo.imdbID);
  // const watchlistDisabled = storedMovie ? true : false;

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => {
        setMovieInfo(response.data);
        console.log(response);
      });
  }, [selectedMovie]);

  return (
    <Container>
      {MovieInfoSpan ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfoSpan>
              IMDB Rating:
              <span> {movieInfo?.imdbRating}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Year:
              <span> {movieInfo?.Year}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Language:
              <span> {movieInfo?.Language}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Rated:
              <span> {movieInfo?.Rated}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Released:
              <span> {movieInfo?.Released}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Genre:
              <span> {movieInfo?.Genre}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Director:
              <span> {movieInfo?.Director}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Actors:
              <span> {movieInfo?.Actors}</span>
            </MovieInfoSpan>
            <MovieInfoSpan>
              Plot:
              <span> {movieInfo?.Plot}</span>
            </MovieInfoSpan>
            <Button
              // disabled={watchlistDisabled}
              onClick={() => addMovieToWatchlist(movieInfo)}
            >
              Add to Watchlist
            </Button>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>
            <UilX color="#FF1B00" style={{backgroundColor: 'white', borderRadius: '6px'}} />
          </Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default MovieInfo;
