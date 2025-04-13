'use client'
import './globals.css';
import Player from "./Components/Card/player";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ComboboxDemo } from './Components/ComboBox';
import { Guess, GuessedPlayer, GuessResponse, GuessTips, InitialGuess, InitialGuessedPlayer, InitialGuessTips, InitialRealPlayer } from './models/guessResponse';

const API_URL = "https://localhost:7122/TransferMarkt/";

export default function Home() {
  const [realPlayerId, setRealPlayerId] = useState(0);
  const [players, setPlayers] = useState([]);
  const [isSucceed, setIsSucceed] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [guessTips, setGuessTips] = useState<GuessTips>(InitialGuessTips)
  const [guessedPlayers, setGuessPlayers] = useState<GuessResponse[]>([]);
  const [realPlayer, setRealPlayer] = useState<GuessedPlayer>(InitialRealPlayer);
  const [guess, setGuess] = useState<GuessResponse>({
    guessed: InitialGuess,
    guessedPlayer: InitialGuessedPlayer
  });

  useEffect(() => {
    const GetAllPlayers = async () => {
      const response = await fetch(`${API_URL}GetAllPlayers`);
      const data = await response.json();
      setPlayers(data);
    }
    GetAllPlayers();
    
  }, [])

  useEffect(() => {
    const GuessApi = async (playerId: number, index: number) => {
      const response = await fetch(`${API_URL}Guess?playerId=${playerId}&index=${index}`);
      const data = await response.json();
      setGuess(data);
    }
    if(selectedPlayer !== ""){
      const selectedPlayerToGuess = players.find(obj => obj.name === selectedPlayer)
      if(selectedPlayerToGuess){
        GuessApi(selectedPlayerToGuess.id, realPlayerId);
      }
    }  
  }, [selectedPlayer])
  
  useEffect(() => {
    setRealPlayerId(Math.floor(Math.random() * (players.length - 0 + 1) + 1));
  },[players])

  useEffect(() => {
    if(guess.guessedPlayer.name !== ""){
      setGuessPlayers(prevGuesses => [...prevGuesses, guess]);
      const isSuccess = isEqualPlayers(guess.guessed);
      setIsSucceed(isSuccess)
      setRealPlayer(prev => ({
        ...prev,
        age: guess.guessed.age === 0 ? guess.guessedPlayer.age : realPlayer.age,
        position: guess.guessed.position ? guess.guessedPlayer.position : realPlayer.position,
        foot: guess.guessed.foot ? guess.guessedPlayer.foot : realPlayer.foot,
        imageUrl: isSuccess ? guess.guessedPlayer.imageUrl : realPlayer.imageUrl,
        name: isSuccess ? guess.guessedPlayer.name : realPlayer.name,
        nationality: isSuccess ? guess.guessedPlayer.nationality : realPlayer.nationality,
        matchs: guess.guessed.matchs === 0 ? guess.guessedPlayer.matchs : realPlayer.matchs,
        scores: guess.guessed.scores === 0 ? guess.guessedPlayer.scores : realPlayer.scores,
        asists: guess.guessed.asists === 0 ? guess.guessedPlayer.assists : realPlayer.assists
      }))
      setGuessTips(prev => {
        const { guessed, guessedPlayer } = guess;
      
        const minAge = (guessed.age === 1) ? (prev.minAge != null && guessedPlayer.age != null && prev.minAge < guessedPlayer.age)
          ? guessedPlayer.age : (prev.minAge == null ? guess.guessedPlayer.age : prev.minAge)
          : prev.minAge;
      
        const maxAge = (guessed.age === 2) ?  (prev.maxAge != null && guessedPlayer.age != null && prev.maxAge > guessedPlayer.age)
          ? guessedPlayer.age : (prev.maxAge == null ? guess.guessedPlayer.age : prev.maxAge)
          : prev.maxAge;
      
        const minMatchs = (guessed.matchs == 1) ? (prev.minMatchs != null && guessedPlayer.matchs != null && prev.minMatchs < guessedPlayer.matchs)
          ? guessedPlayer.matchs : (prev.minMatchs == null ? guess.guessedPlayer.matchs : prev.minMatchs)
          : prev.minMatchs;
      
        const maxMatchs = (guessed.matchs == 2) ? (prev.maxMatchs != null && guessedPlayer.matchs != null && prev.maxMatchs > guessedPlayer.matchs)
          ? guessedPlayer.matchs : (prev.maxMatchs == null ? guess.guessedPlayer.matchs : prev.maxMatchs)
          : prev.maxMatchs;
      
        const minGoal = (guessed.scores == 1) ? (prev.minGoal != null && guessedPlayer.scores != null && prev.minGoal < guessedPlayer.scores)
          ? guessedPlayer.scores : (prev.minGoal == null ? guess.guessedPlayer.scores : prev.minGoal)
          : prev.minGoal;

        const maxGoal = (guessed.scores == 2) ? (prev.maxGoal != null && guessedPlayer.scores != null && prev.maxGoal > guessedPlayer.scores)
          ? guessedPlayer.scores : (prev.maxGoal == null ? guess.guessedPlayer.scores : prev.maxGoal)
          : prev.maxGoal;  

          const minAsist = (guessed.asists == 1) ? (prev.minAsist != null && guessedPlayer.asists != null && prev.minAsist < guessedPlayer.asists)
          ? guessedPlayer.asists : (prev.minAsist == null ? guess.guessedPlayer.asists : prev.minAsist)
          : prev.minAsist;

        const maxAsist = (guessed.asists == 2) ? (prev.maxAsist != null && guessedPlayer.asists != null && prev.maxAsist > guessedPlayer.asists)
          ? guessedPlayer.asists : (prev.maxAsist == null ? guess.guessedPlayer.asists : prev.maxAsist)
          : prev.maxAsist; 

        return {
          ...prev,
          minAge,
          maxAge,
          minMatchs,
          maxMatchs,
          minGoal,
          maxGoal,
          minAsist,
          maxAsist
        };
      });



    }
  }, [guess])

  

  return (
        <div className="container">
          <Player guessResponse={realPlayer} guessTips={guessTips}></Player>
          <div className='submit'>
            <div className='dropdown'>
            <ComboboxDemo players = {players} setSelectedPlayer={setSelectedPlayer} isSucceed={isSucceed}></ComboboxDemo>
            </div>
            <Button className="bg-blue-900 text-yellow-300 hover:bg-blue-800">
            Give up
          </Button>
          </div>
          {guessedPlayers.map((guess) => {
            console.log("sended guess");
            console.log(guess);
            console.log("sended guess tips");
            console.log(guessTips);
            console.log("REAL Player")
            console.log(realPlayer)

            return(
            <Player guessResponse={guess.guessedPlayer}></Player>
          )})}
          
      </div>
      
  );
}


export function isEqualPlayers(guess: Guess){
  return guess.age === 0 && guess.foot && guess.nationality && guess.position;
}
