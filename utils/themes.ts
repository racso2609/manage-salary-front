interface theme {
    bg: string;
    fg: string;
    bg2: string;
    hover: string;
    ph: string;
}
const defaultTheme: theme = {
    bg: 'white',
    fg: 'black',
    bg2: '#abdb2',
    hover: 'blue',
    ph: 'red',
};
const darkTheme: theme = {
    bg: '#000',
    fg: '#fff',
    bg2: 'gray',
    hover: 'blue',
    ph: '#282828',
};
export const themes: { default: theme; dark: theme } = {
    default: defaultTheme,
    dark: darkTheme,
};

export const posibleThemes = Object.keys(themes);
