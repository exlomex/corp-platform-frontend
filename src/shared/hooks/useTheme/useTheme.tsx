import {useContext} from 'react';
import {ThemeContext} from '@/shared/ui/ThemeContext/ThemeContext.ts';
import {Theme} from "../../types/theme.ts";

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
    setNewTheme: (newTheme: Theme) => void;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const setNewTheme = (theme) => {
        setTheme?.(theme)
    }

    const toggleTheme = () => {
        const newTheme: Theme = theme === Theme.DARK_THEME ? Theme.LIGHT_THEME : Theme.DARK_THEME;
        setTheme?.(newTheme);
    };

    return {
        theme: theme || Theme.LIGHT_THEME,
        toggleTheme,
        setNewTheme
    };
}
