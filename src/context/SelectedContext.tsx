import React, { useState } from "react";

type SelectedContextType = {
    mans: string[];
    setMans: React.Dispatch<React.SetStateAction<string[]>>;
    cats: string[];
    setCats: React.Dispatch<React.SetStateAction<string[]>>;
    modelss: Map<string, string[]>;
    setModelss: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
    dealType: Map<string, string[]>;
    setDealTypee: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
}

const SelectedContext = React.createContext<SelectedContextType>({} as SelectedContextType);

export const SelectedContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [mans, setMans] = useState<string[]>([]);
    const [cats, setCats] = useState<string[]>([]);
    const [modelss, setModelss] = useState<Map<string, string[]>>(new Map());
    const [dealType, setDealTypee] = useState<Map<string, string[]>>(new Map());

    return (
        <SelectedContext.Provider
            value={{
                mans,
                setMans,
                cats,
                setCats,
                modelss,
                setModelss,
                dealType,
                setDealTypee
            }}
        >
            {children}
        </SelectedContext.Provider>
    );
}


export const useSelectedContext = () => {
    return React.useContext(SelectedContext);
}
    