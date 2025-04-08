'use client'
import './globals.css';
import Image from 'next/image'
import Player from "./Components/Card/player";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SelectContent, SelectItem } from '@radix-ui/react-select';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronsUpDown } from 'lucide-react';
import { ComboboxDemo } from './Components/ComboBox';
import { GuessResponse } from './models/guessResponse';

const API_URL = "https://localhost:7122/TransferMarkt/";

export default function Home() {
  const teams = ["abc", "cde"]
  const [players, setPlayers] = useState([]);
  const [filteredItems, setFilteredItems] = useState(players);
  const [showDropDown, setShowDropDown] = useState(false);
  const [value, setValue] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [guess, setGuess] = useState<GuessResponse>({
    age: 0
  });
  var val = "";

  useEffect(() => {
    const GetAllPlayers = async () => {
      const response = await fetch(`${API_URL}GetAllPlayers`);
      const data = await response.json();
      setPlayers(data);
    }
    GetAllPlayers();
    
  }, [])

  useEffect(() => {
    const GuessApi = async (playerId, index) => {
      const response = await fetch(`${API_URL}Guess?playerId=${playerId}&index=${index}`);
      const data = await response.json();
      setGuess(data);
    }
    if(selectedPlayer !== ""){
      const guess = players.find(obj => obj.name === selectedPlayer)
      GuessApi(guess.id, 3);
    }    
  }, [selectedPlayer])
  

  return (
    /* <Image src={`/alex.jpeg`} width={500} height={500} alt="Picture"></Image>
      <div className="column-propertiesfor-teams">
        {teams.map((item, team) =>  (<span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset" >{item}</span>))}
      </div> */
        <div className="container">
          <Player guessResponse={guess}></Player>
          <div className='submit'>
            <div className='dropdown'>
            <ComboboxDemo players = {players} setSelectedPlayer={setSelectedPlayer}></ComboboxDemo>
              {showDropDown && <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>}
            </div>
            <Button className="bg-blue-900 text-yellow-300 hover:bg-blue-800">
            Give up
          </Button>
          </div>
      </div>
      
  );
}
