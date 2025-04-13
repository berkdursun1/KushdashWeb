export type GuessedPlayer = {
    name: string | null;
    position: string | null;
    age: number | null;
    foot: string | null;    
    nationality: string[];
    imageUrl: string | null;
    teams: string[] | null;
    scores: number | null;
    asists: number | null;
    matchs: number | null;
}
export type Guess = {
    position: boolean;
    age:number;
    foot:boolean;
    nationality:boolean;
    teams: string[];
    matchs: number,
    scores: number,
    asists: number,
}
export type GuessResponse = {
    guessed: Guess;
    guessedPlayer: GuessedPlayer;
}
export type GuessTips = {
    minAge: number | null;
    maxAge: number | null;
    minGoal: number | null;
    maxGoal: number | null;
    minAsist: number | null;
    maxAsist: number | null;
    minMatchs: number | null;
    maxMatchs: number | null;
}

export const InitialGuessTips: GuessTips = {
    minAge: null,
    maxAge: null,
    minGoal: null,
    maxGoal: null,
    minAsist: null,
    maxAsist: null, 
    minMatchs: null,
    maxMatchs: null
}

export const InitialGuessedPlayer : GuessedPlayer = {
    age: 0,
    name: "",
    position: "Position",
    foot: "Foot",
    nationality: [],
    imageUrl: "",
    teams: [""],
    matchs: null,
    scores: null,
    asists: null
}

export const InitialGuess : Guess = {
    age: 0,
    foot: false,
    nationality: false,
    position:false,
    teams: [""],
    matchs: 0,
    scores: 0,
    asists: 0
}

export const InitialRealPlayer: GuessedPlayer = {
    age: null,
    foot: null,
    imageUrl: null,
    name: null,
    nationality: [""],
    position: null,
    teams:[""],
    matchs: null,
    asists: null,
    scores: null
}