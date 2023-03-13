import { useAtom } from 'jotai';
import { FC } from 'react';
import useForms from '../../hooks/useForms';
import { themeAtom } from '../../states/theme';
import { posibleThemes } from '../../utils/themes';
import SelectInput from '../SelectInput';
import { View, Text, TouchableOpacity } from '../styledComponents';

const ThemeSelector: FC = () => {
    const [selectedTheme, setTheme] = useAtom(themeAtom);
    const internalValue = useForms({ type: 'text', default: selectedTheme });

    return (
        <View>
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
                                <Text>{theme}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </SelectInput>
        </View>
    );
};

export default ThemeSelector;
