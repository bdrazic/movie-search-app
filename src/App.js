import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import searchImage from "./assets/search-icon.svg";
import MovieComponent from "./components/MovieComponent";
import MovieInfo from "./components/MovieInfo";
import Footer from "./components/Footer";
import Watchlist from "./components/Watchlist";

import HeroSlide from "./components/HeroSlide";

import { GlobalProvider } from "./context/GlobalState";

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 30px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  align-items: center;
  background-color: #284D33;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #6ACC87;
  font-weight: bold;
  font-size: 2rem;
  padding-right: 10px;
  padding-left: 40px;
  cursor: pointer;
  letter-spacing: 2px;
  text-shadow: 5px 5px 8px #000;
  &:hover {
    text-shadow: 5px 5px 8px #6ACC87;
    transition: 2s ease;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  color: #6ACC87;
  font-weight: bold;
  border-bottom: 2px solid white;
  box-shadow: 0 10px 10px 0 #black;
  cursor: pointer;
  margin-right: 60px;

`;

const HeaderTitles = styled.div`
  font-size: 1rem;
  color: #6ACC87;
  font-weight: bold;
  border-bottom: 2px solid white;
  box-shadow: 0 10px 10px 0 #black;
  cursor: pointer;
  margin-inline-start: auto;
  margin-right: 90px;
  &:hover {
    font-size: 1.2rem;
    transition: 0.5s ease;
  }
`;

const SearchIcon = styled.img`
  width: 25px;
  height: 25px;
  color: white;
`;

const SearchInput = styled.input`
background-color: #284D33;
  border: none;
  font-size: 1rem;
  color: #6ACC87;
  font-weight: bold;
  box-shadow: 0 10px 10px 0 #black;
  cursor: pointer;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 24px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updatedMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${process.env.REACT_APP_OMDB_API_KEY}}`
    );
    updatedMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  const [showWatchlist, setShowWatchlist] = useState(false);

  const showWatchlistHandler = () => {
    setShowWatchlist(true);
  };

  return (
    <GlobalProvider>
      <div>
        <Container>
          <Header >
            <AppName onClick={() => setShowWatchlist(false)}>
              MOVIE PLUG
            </AppName>
            <HeaderTitles onClick={showWatchlistHandler}>
              WATCHLIST
            </HeaderTitles>

            <SearchBox>
            <SearchIcon src={searchImage} />
              <SearchInput  
                placeholder="PRONAĐI FILM..."
                value={searchQuery}
                onChange={onTextChange}
              />
            </SearchBox>
          </Header>
        </Container>
        <Container>
          {showWatchlist && <Watchlist />}
          {selectedMovie && (
            <MovieInfo
              selectedMovie={selectedMovie}
              onMovieSelect={onMovieSelect}
            />
          )}
          <MovieListContainer>
            {movieList?.length
              ? movieList.map((movie, i) => (
                  <MovieComponent
                    key={i}
                    movie={movie}
                    onMovieSelect={onMovieSelect}
                  />
                ))
              : ""}
          </MovieListContainer>
          <div style={{ margin: "0 10px" }}></div>
        </Container>
        <HeroSlide />
        <Footer />
      </div>
    </GlobalProvider>
  );
}

export default App;
