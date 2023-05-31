import { View, Text, TouchableOpacity } from '../styledComponents';
import { entryInterface } from '../../interfaces/entries';

import { StyleSheet } from 'react-native';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface propsTypes {
    entry: entryInterface;
    edit?: () => void;
    deleteEntry?: () => void;
    width?: string | number;
    showIcons?: boolean;
    marginVertical?: number;
    marginHorizontal?: number;
}
export default function EntryCard(props: propsTypes) {
    const {
        entry,
        edit,
        showIcons,
        deleteEntry,
        marginHorizontal,
        marginVertical,
    } = props;

    return (
        <View
            style={[
                styles.card,
                { width: props.width, marginVertical, marginHorizontal },
            ]}
        >
            <Text numberOfLines={1}>{entry.name}</Text>
            <Text numberOfLines={1}>{entry.description}</Text>
            <Text numberOfLines={1}>{entry.amount}</Text>
            {showIcons && (
                <View style={[styles.cardOption]}>
                    {edit && (
                        <TouchableOpacity onPress={edit}>
                            <Text>
                                <FontAwesomeIcon icon={faPencil} color="blue" />
                            </Text>
                        </TouchableOpacity>
                    )}
                    {deleteEntry && (
                        <TouchableOpacity onPress={deleteEntry}>
                            <Text>
                                <FontAwesomeIcon icon={faTrash} />
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 20,
        paddingVertical: 15,
        minWidth: 225,
        margin: 'auto',
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
