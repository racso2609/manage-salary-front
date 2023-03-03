interface theme {
    bg: string;
    fg: string;
    bg2: string;
    hover: string;
}
const defaultTheme: theme = {
    bg: 'white',
    fg: 'black',
    bg2: 'gray',
    hover: 'blue',
};
const darkTheme: theme = {
    bg: 'black',
    fg: 'white',
    bg2: 'gray',
    hover: 'blue',
};
export const themes: { default: theme; dark: theme } = {
    default: defaultTheme,
    dark: darkTheme,
};

export const posibleThemes = Object.keys(themes);
