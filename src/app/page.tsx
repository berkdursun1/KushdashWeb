'use client'
import './globals.css';
import Player from "./Components/Card/player";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ComboboxDemo } from './Components/ComboBox';
import { combineTeams, GuessedPlayer, GuessResponse, GuessTips, InitialGuess, InitialGuessedPlayer, InitialGuessTips, InitialRealPlayer, isEqualPlayers, PlayerSummary } from './models/guessResponse';
import ThemeToggle from './Components/ThemeToggle';
import ErrorAlert from './Components/ErrorAlert/errorAlert';

const API_URL = "https://sezgpmgxuc.us-west-2.awsapprunner.com";
const INITIAL_GUESS_COUNT = 8;



const getTeamCode = (teamName: string) => {
  return teamName === "Fenerbahce" ? 0 : 1;
}


export default function Home() {
  const [realPlayerId, setRealPlayerId] = useState(0);
  const [players, setPlayers] = useState<PlayerSummary[]>([]);
  const [fenerPlayers, setFenerPlayers] = useState<PlayerSummary[]>([]);
  const [besiktasPlayers, setBesiktasPlayers] = useState<PlayerSummary[]>([]);
  const [isSucceed, setIsSucceed] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [guessTips, setGuessTips] = useState<GuessTips>(InitialGuessTips)
  const [guessedPlayers, setGuessPlayers] = useState<GuessResponse[]>([]);
  const [realPlayer, setRealPlayer] = useState<GuessedPlayer>(InitialRealPlayer);
  const [team, setTeam] = useState<string>("Fenerbahce");
  const [guess, setGuess] = useState<GuessResponse>({
    guessed: InitialGuess,
    guessedPlayer: InitialGuessedPlayer
  });
  const [score,setScore] = useState(0);
  const [remain, setRemain] = useState(INITIAL_GUESS_COUNT);

  useEffect(() => {
    const GetAllPlayers = async (team_id: number) => {
      const response = await fetch(`${API_URL}GetAllPlayers?team=${team_id}`);
      const data = await response.json();
      setPlayers(data);
      if(team_id === 0){
        setFenerPlayers(data);
      }else{
        setBesiktasPlayers(data);
      }
    }
    if(team === "Fenerbahce" && fenerPlayers.length > 0){
      setPlayers(fenerPlayers);
    }else if(team === "Besiktas" && besiktasPlayers.length > 0){
      setPlayers(besiktasPlayers);
    }else{
      GetAllPlayers(getTeamCode(team));
    }
    },[team]);

  useEffect(() => {
    const GuessApi = async (playerId: number, index: number, team_id: number) => {
      const response = await fetch(`${API_URL}Guess?playerId=${playerId}&index=${index}&team=${team_id}`);
      const data = await response.json();
      setGuess(data);
    }
    if(selectedPlayer !== ""){
      const selectedPlayerToGuess = players.find(obj => obj.name === selectedPlayer)
      if(selectedPlayerToGuess){
        GuessApi(selectedPlayerToGuess.id, realPlayerId, getTeamCode(team));
      }
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayer])
  
  useEffect(() => {
    var playerId = 31//;
    setRealPlayerId(playerId);
    // When the players is received successfully.
    const InitialGuess = async (team_id: number) => {
      const response = await fetch(`${API_URL}InitialGuess?index=${playerId}&team=${team_id}`);
      const data = await response.json();
      setRealPlayer(data);
    }
    InitialGuess(getTeamCode(team));
  },[players])

  useEffect(() => {
    if(guess.guessedPlayer.name !== ""){
      setGuessPlayers(prevGuesses => [guess, ...prevGuesses]);
      const isSuccess = isEqualPlayers(guess.guessed);
      if(isSuccess){
        setScore(score + 1);
      }
      else{
      if(guess.guessedPlayer.age != 0){
        setRemain(remain - 1);

      }
    }
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
        asists: guess.guessed.asists === 0 ? guess.guessedPlayer.asists : realPlayer.asists,
        teams: realPlayer.teams !== null ? combineTeams(realPlayer.teams, guess.guessed.teams) : guess.guessed.teams
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
     (
      <div className="container">
        {(!isSucceed && remain === 0) &&<ErrorAlert message="Belki de Galatasarayli olma zamanin gelmistir"/>}
        <Player guessResponse={realPlayer} guessTips={guessTips} remainingGuesses={remain} correctGuesses={score}></Player>
        <div className='submit'>
          <div className='dropdown'>
            <ComboboxDemo players={players} setSelectedPlayer={setSelectedPlayer} isSucceed={(isSucceed) || (remain <= 0)}></ComboboxDemo>
          </div>
          <Button className="bg-blue-900 text-yellow-300 hover:bg-blue-800">Give up</Button>
        </div>
        <div className='rowPlayers'>
          {guessedPlayers.map((guess, index) => {
            return(
              <Player key={index} guessTips={null} guessResponse={guess.guessedPlayer}></Player>
            )
          })}
        </div>
        <ThemeToggle isFenerMode={setTeam}/>
      </div>
    ) 
  );
}



