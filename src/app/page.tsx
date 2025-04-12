'use client'
import './globals.css';
import Player from "./Components/Card/player";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SelectContent, SelectItem } from '@radix-ui/react-select';
import { ComboboxDemo } from './Components/ComboBox';
import { Guess, GuessedPlayer, GuessResponse, GuessTips } from './models/guessResponse';

const API_URL = "https://localhost:7122/TransferMarkt/";

export default function Home() {
  const [realPlayerId, setRealPlayerId] = useState(0);
  const [players, setPlayers] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [guessTips, setGuessTips] = useState<GuessTips>({
    minAge: null,
    maxAge: null,
    minGoal: null,
    maxGoal: null,
    minAsist: null,
    maxAsist: null,    
  })
  const [minAgeRange, setMinAgeRange] = useState(null);
  const [maxAgeRange, setMaxAgeRange] = useState(null);
  const [guessedPlayers, setGuessPlayers] = useState<GuessResponse[]>([]);
  const [realPlayer, setRealPlayer] = useState<GuessedPlayer>({
    age: null,
    foot: null,
    imageUrl: null,
    name: null,
    nationality: [""],
    position: null,
    teams:[""],
  });
  const [guess, setGuess] = useState<GuessResponse>({
    guessed: {
      age: 0,
      foot: false,
      nationality: false,
      position:false,
      teams: [""]
    },
    guessedPlayer: {
      age: 0,
      name: "",
      position: "Position",
      foot: "Foot",
      nationality: [],
      imageUrl: "",
      teams: [""]
    }
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
    setRealPlayerId(Math.floor(Math.random() * (players.length - 0 + 1) + 0));
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
        nationality: isSuccess ? guess.guessedPlayer.nationality : realPlayer.nationality  
      }))
      
      if(guess.guessed.age === 1){
        // Lower age guessed
        if(minAgeRange === null || minAgeRange < guess.guessedPlayer.age){
          setGuessTips(prev => ({
            ...prev,
            minAge: guess.guessedPlayer.age
          }));
        }
        
      }
      else if(guess.guessed.age === 2){
        // Bigger age guessed
        if(maxAgeRange === null || maxAgeRange > guess.guessedPlayer.age){
          setGuessTips(prev => ({
            ...prev,
            maxAge: guess.guessedPlayer.age
          }));
        }
      }



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
            return(
            <Player guessResponse={guess.guessedPlayer}></Player>
          )})}
          
      </div>
      
  );
}


export function isEqualPlayers(guess: Guess){
  return guess.age === 0 && guess.foot && guess.nationality && guess.position;
}
