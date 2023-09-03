import { useAtom } from 'jotai';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import useForms from '../../hooks/useForms';
import { themeAtom } from '../../states/theme';
import { posibleThemes } from '../../utils/themes';
import SelectInput from '../SelectInput';
import { View, Text, TouchableOpacity } from '../styledComponents';

const ThemeSelectorContainer = styled(View)`
    background-color: ${(props) => props.theme.bg2};
`;

const ThemeSelector: FC = () => {
    const [selectedTheme, setTheme] = useAtom(themeAtom);
    const internalValue = useForms({ type: 'text', default: selectedTheme });

    return (
        <ThemeSelectorContainer style={styles.container}>
            <SelectInput show internalValue={internalValue}>
                <View border="1px solid gray">
                    {posibleThemes.map((theme, index) => {
                        return (
                            <TouchableOpacity
                                direction="column"
                                key={theme + index}
                                onPress={() => {
                                    internalValue.onChangeText(theme);
                                    setTheme(theme);
                                }}
                            >
                                <Text style={styles.selectText}>
                                    {theme[0].toUpperCase() +
                                        theme.substring(1)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </SelectInput>
        </ThemeSelectorContainer>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
    },
    selectText: {},
});
export default ThemeSelector;
