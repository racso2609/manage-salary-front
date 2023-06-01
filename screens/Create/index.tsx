import React, { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    View,
    Text,
    Button,
    TextInput,
} from '../../components/styledComponents';
import useForms from '../../hooks/useForms';
import useToken from '../../hooks/useToken';
import useCategories from '../../swr/useCategories';
import { createEntry, updateEntries } from '../../requests/entries';
import { createExpense, updateExpense } from '../../requests/expense';

import CategorySelect from '../../components/CategorySelect';
import {
    createType,
    EntriesStackParamList,
} from '../../navigation/CreateStack';
type Props = NativeStackScreenProps<EntriesStackParamList, 'Create'>;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: -1,
    },
    inputContainer: {
        width: '90%',
        marginTop: 20,
    },
    sendButton: {
        width: '90%',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
export default function ({ route, navigation }: Props) {
    const { params } = route;
    const { entry, expense, type } = params;
    const { token } = useToken();
    const {
        categories,
        // isLoading: isLoadingCategories,
        // isError: isErrorCategories,
    } = useCategories();

    const editableObject = entry || expense;

    const category = useForms({
        type: 'text',
        default:
            // @ts-ignore
            type === createType.ENTRY || !editableObject?.category
                ? ''
                : // @ts-ignore
                  editableObject.category,
    });

    const amount = useForms({
        type: 'text',
        default: editableObject?.amount?.toString(),
    });
    const description = useForms({
        type: 'text',
        default: editableObject?.description,
    });
    const name = useForms({
        type: 'text',
        default: type === createType.ENTRY ? entry?.name : '',
    });

    const create = type === createType.ENTRY ? createEntry : createExpense;
    const update = type === createType.ENTRY ? updateEntries : updateExpense;

    const onSubmit = async () => {
        const data = {
            amount: amount.defaultValue,
            description: description.defaultValue,
            name: name.defaultValue,
            category: category.defaultValue,
        };
        if (!editableObject?._id) await create({ data, token, id: '' });
        else await update({ data, token, id: editableObject._id });
        navigation.pop();
    };
    return (
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                {type === createType.ENTRY && (
                    <>
                        <Text>Name</Text>
                        <TextInput {...name} />
                    </>
                )}

                <Text>Amount</Text>
                <TextInput keyboardType="numeric" {...amount} />
                <Text>Description</Text>
                <TextInput height={70} multiline {...description} />
                {type === createType.EXPENSE && (
                    <>
                        <Text>Categories</Text>
                        <CategorySelect
                            value={category}
                            categoryName={
                                categories?.find(
                                    (categoryF) =>
                                        categoryF._id.toString() ===
                                        category.defaultValue.toString()
                                )?.name
                            }
                        />
                    </>
                )}
            </View>
            <Button
                style={styles.sendButton}
                onPress={onSubmit}
                title="create"
            />
        </View>
    );
}
