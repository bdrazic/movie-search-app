import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";

const Naslov = styled.span`
  font-weight: bold;
  color: black;
  display: column;
  flex-direction: row;
  padding-top: 10px;
  padding-right: 5px;
`;

const Opis = styled.span`
  font-weight: 500;
  color: #fffee6;
`;

const Film = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 20px;
`;

const Wrapper = styled.div`
  background-color: rgba(157, 157, 157, 0.5);
  width: 50%;
  margin: auto;
`;

const Button = styled.button`
  padding: 5px 5px;
  background-color: #C70B00;
  color: white;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  border: none;
  font-size: .8rem;
  transition: all 0.3s ease;
  line-height: 1;
  width: 150px;
  margin-top: 10px;
  &:hover {
    background-color: #7A0600;
    opacity: 1;
    cursor: pointer;
  }
`;

const Watchlist = () => {
  const { watchlist, removeMovieFromWatchlist } = useContext(GlobalContext);

  return (
    <Wrapper>
      <div>
        <h1
          style={{
            fontSize: "2rem",
            color: "#6ACC87",
            textAlign: "center",
            borderBottom: "1px solid white",
            textShadow: "5px 5px 8px #000",
          }}
        >
          MOJA WATCHLISTA
        </h1>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            paddingLeft: "20px",
          }}
        >
          {watchlist.length}{" "}
          {watchlist.length === 1
            ? "FILM"
            : watchlist.length === 2 || 3 || 4
            ? "FILMA"
            : "FILMOVA"}
        </span>
      </div>

      {watchlist.length > 0 ? (
        <div>
          {watchlist.map((movie) => (
            <Film>
              <div>
                <Naslov>Naslov:</Naslov> <Opis>{movie.Title}</Opis>
              </div>
              <div>
                <Naslov>Godina izlaska:</Naslov> <Opis>{movie.Year}.</Opis>
              </div>
              <div>
                <Naslov>Žanr:</Naslov> <Opis>{movie.Genre}</Opis>
              </div>
              <div>
                <Naslov>Radnja:</Naslov> <Opis>{movie.Plot}</Opis>
              </div>
              <div>
                <Naslov>IMDB Ocjena:</Naslov> <Opis>{movie.imdbRating}</Opis>
              </div>
              <Button onClick={() => removeMovieFromWatchlist(movie.imdbID)}>
                Ukloni s popisa
              </Button>
            </Film>
          ))}
        </div>
      ) : (
        <h2 style={{ marginLeft: "20px" }}>WATCHLISTA JE PRAZNA.</h2>
      )}
    </Wrapper>
  );
};

export default Watchlist;
