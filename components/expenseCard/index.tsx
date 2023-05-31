import { View, Text, TouchableOpacity } from '../styledComponents';

import { StyleSheet } from 'react-native';
import { expenseInterface } from '../../interfaces/expenses';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

interface propsTypes {
    expense: expenseInterface;
    edit?: () => void;
    width?: string | number;
    onDelete?: () => void;
    showIcons?: boolean;
    marginHorizontal?: string | number;
    marginVertical?: string | number;
}
export default function ExpenseCard(props: propsTypes) {
    const {
        expense,
        edit,
        showIcons,
        onDelete,
        marginHorizontal,
        marginVertical,
    } = props;

    return (
        <View
            style={[
                styles.card,
                { width: props.width, marginHorizontal, marginVertical },
            ]}
        >
            <Text numberOfLines={1}>{expense.description}</Text>
            <Text numberOfLines={1}>{expense.amount}</Text>

            {showIcons && (
                <View style={[styles.cardOption]}>
                    {edit && (
                        <TouchableOpacity onPress={edit}>
                            <Text>
                                <FontAwesomeIcon icon={faPencil} />
                            </Text>
                        </TouchableOpacity>
                    )}
                    {onDelete && (
                        <TouchableOpacity onPress={onDelete}>
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
