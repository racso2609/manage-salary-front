import { useContext } from 'react';
import { View, Text, TouchableOpacity } from '../styledComponents';
import ThemeContext from '../../context/colorContext';

import { StyleSheet } from 'react-native';
import { expenseInterface } from '../../interfaces/expenses';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

interface propsTypes {
    expense: expenseInterface;
    edit: () => void;
    width?: string | number;
    onDelete?: () => void;
    showIcons?: boolean;
}
export default function ExpenseCard(props: propsTypes) {
    const { expense, edit, showIcons, onDelete } = props;
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
            <Text numberOfLines={1}>{expense.description}</Text>
            <Text numberOfLines={1}>{expense.amount}</Text>

            {showIcons && (
                <View style={[styles.cardOption]}>
                    <TouchableOpacity onPress={edit}>
                        <FontAwesomeIcon icon={faPencil} color="blue" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onDelete}>
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
