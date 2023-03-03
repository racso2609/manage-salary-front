import { useAtom } from 'jotai';
import { createContext, ReactNode } from 'react';
import { ThemeProvider as Styledtheme } from 'styled-components';
import { FC } from 'react';
import { themeAtom } from '../states/theme';
import { themes } from '../utils/themes';

export const ThemeContext = createContext({
    theme: 'default',
    setTheme: (theme: string) => {},
});

interface propsType {
    children: ReactNode;
}
const ThemeProvider: FC<propsType> = ({ children }) => {
    const [theme, setTheme] = useAtom<string>(themeAtom);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {
                //// eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Styledtheme theme={themes[theme] || themes.default}>
                    {children}
                </Styledtheme>
            }
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;
