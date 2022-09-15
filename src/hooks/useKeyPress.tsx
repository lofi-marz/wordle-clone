import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';

export function useKeyPress(onKeyPress: (key: string) => void) {
    const onKeyDown = (event: KeyboardEvent) => {
        onKeyPress(event.key);
    };
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
}
