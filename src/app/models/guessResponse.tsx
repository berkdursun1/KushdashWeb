export type GuessedPlayer = {
    name: string | null;
    position: string | null;
    age: number | null;
    foot: string | null;    
    nationality: string[];
    imageUrl: string | null;
    teams: string[] | null
}
export type Guess = {
    position: boolean;
    age:number;
    foot:boolean;
    nationality:boolean;
    teams: string[];
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
}