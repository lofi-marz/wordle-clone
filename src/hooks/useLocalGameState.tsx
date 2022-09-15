import { useEffect, useState } from 'react';
import { Wordle } from '../wordle/wordle';

export function useLocalGameState() {
    const [localGameState, setGameState] = useState<Wordle | null>(null);
    //TODO: Maybe unique game state for each code?
    useEffect(() => {
        const oldVal = localStorage.getItem('game-state');
        console.log('Retrieved:', JSON.parse(oldVal as string));
        if (oldVal != null) setGameState(JSON.parse(oldVal) as Wordle);
    }, []);

    const updateLocalGameState = (currentState: Wordle) => {
        console.log('Setting value', currentState);
        setGameState(currentState); //But ideally we wouldn't use this value anyway
        localStorage.setItem('game-state', JSON.stringify(currentState));
    };

    return [localGameState, updateLocalGameState] as const;
}
