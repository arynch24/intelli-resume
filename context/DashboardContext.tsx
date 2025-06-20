import { createContext, useContext, useState, ReactNode } from 'react'

//Define the context type
type ThemeContextType = {
    dialogboxstatus: boolean;
    setDialogBoxStatus: (status: boolean) => void;
}

// Create context with default undefined (we'll handle this safely later)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider props type
type ThemeProviderProps = {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [dialogboxstatus, setDialogBoxStatus] = useState<boolean>(false);

    return (
        <ThemeContext.Provider value={{ dialogboxstatus, setDialogBoxStatus }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useDashboard = useContext(ThemeContext)

