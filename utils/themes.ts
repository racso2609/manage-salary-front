interface theme {
    bg: string;
    fg: string;
    bg2: string;
    hover: string;
    ph: string;
    inactive: string;
}
const defaultTheme: theme = {
    bg: '#ffffff',
    fg: '#000000',
    bg2: '#e0e0e0',
    hover: 'blue',
    ph: 'red',
    inactive: 'gray',
};
const darkTheme: theme = {
    bg: 'black',
    fg: '#ffffff',
    bg2: '#838584',
    hover: 'blue',
    ph: '#282828',
    inactive: 'gray',
};
export const themes: { default: theme; dark: theme } = {
    default: defaultTheme,
    dark: darkTheme,
};

export const posibleThemes = Object.keys(themes);
