import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useLocalStorage = <S>(initialState: S, key: string): [S, Dispatch<SetStateAction<S>>] => {
    const get = (): S => {
        const storage = localStorage.getItem(key);
        if (storage) {
            return JSON.parse(storage).value;
        }
        return initialState;
    }
    const [value, getValue] = useState(get());

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify({value}));
    })

    return [value, getValue];
};

export default useLocalStorage;