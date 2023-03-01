import { useContext } from 'react';
import { View, Text, TouchableOpacity } from '../styledComponents';
import { entryInterface } from '../../interfaces/entries';
import ThemeContext from '../../context/colorContext';

import { StyleSheet } from 'react-native';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface propsTypes {
    entry: entryInterface;
    edit: () => void;
    width?: string | number;
    showIcons?: boolean;
}
export default function EntryCard(props: propsTypes) {
    const { entry, edit, showIcons } = props;
    const { theme } = useContext(ThemeContext);
    const { colors } = theme;

    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: colors.border,
            paddingHorizontal: 20,
            paddingVertical: 15,
            minWidth: 225,
            margin: 5,
            borderRadius: 20,
        },
        dot: {
            width: 10,
            height: 10,
        },
        cardOption: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
        },
    });
    return (
        <View style={[styles.card, { width: props.width }]}>
            <Text numberOfLines={1}>{entry.name}</Text>
            <Text numberOfLines={1}>{entry.description}</Text>
            <Text numberOfLines={1}>{entry.amount}</Text>
            {showIcons && (
                <View style={[styles.cardOption]}>
                    <TouchableOpacity onPress={edit}>
                        <FontAwesomeIcon icon={faPencil} color="blue" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={edit}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
