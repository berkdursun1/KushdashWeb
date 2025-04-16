"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction } from "react"
import { PlayerSummary } from "../models/guessResponse"
import styles from './combobox.module.css'

export function ComboboxDemo({players, setSelectedPlayer, isSucceed} : {players : PlayerSummary[], setSelectedPlayer: Dispatch<SetStateAction<string>>, isSucceed: boolean}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={styles.triggerButton}
          disabled={isSucceed}
        >
          {value
            ? players.find((players) => players.name === value)?.name
            : "Select player..."}
          <ChevronsUpDown className={styles.icon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.dropdownContent}>
        <Command className={styles.commandContainer}>
          <div className={styles.searchWrapper}>
            <CommandInput 
              placeholder="Search player..." 
              className={cn(styles.searchInput, "no-search-icon")} 
            />
          </div>
          <CommandList className={styles.commandList}>
            <CommandEmpty className={styles.emptyMessage}>No player found.</CommandEmpty>
            <CommandGroup className={styles.playerGroup}>
              {players.map((player) => (
                <CommandItem
                  key={player.id}
                  value={player.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setSelectedPlayer(currentValue);
                  }}
                  className={styles.playerOption}
                >
                  {player.name}
                  <Check
                    className={cn(
                      styles.checkIcon,
                      value === player.name ? styles.checkIconVisible : styles.checkIconHidden
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
