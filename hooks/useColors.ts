import { useContext } from 'react';
import { ThemeContext } from '../context/theme';
import { themes } from '../utils/themes';

const useColor = () => {
    const { theme } = useContext(ThemeContext);
    return {
        colors: themes[theme],
    };
};
export default useColor;
