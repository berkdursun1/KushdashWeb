export type GuessedPlayer = {
    name: string | null;
    position: string | null;
    age: number | null;
    foot: string | null;    
    nationality: string[];
    imageUrl: string | null;
}
export type Guess = {
    position: boolean;
    age:number;
    foot:boolean;
    nationality:boolean;
}
export type GuessResponse = {
    guessed: Guess;
    guessedPlayer: GuessedPlayer;
}