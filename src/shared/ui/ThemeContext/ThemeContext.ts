import {Theme} from "../../types/theme.ts";
import {createContext} from "react";

interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void
}
export const ThemeContext = createContext<ThemeContextProps>({})
