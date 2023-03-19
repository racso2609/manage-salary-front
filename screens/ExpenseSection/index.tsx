import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import CategoryTag from '../../components/CategoryTag';
import ExpenseCard from '../../components/expenseCard';
import {
    Button,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from '../../components/styledComponents';
import useToken from '../../hooks/useToken';
import { expenseInterface } from '../../interfaces/expenses';
import { TabParamList } from '../../navigation/HomeBottomTab';
import {
    createType,
    RootStackLoggedParamList,
} from '../../navigation/LoggedStack';
import { deleteExpense } from '../../requests/expense';
import useCategories from '../../swr/useCategories';
import useExpenses from '../../swr/useExpenses';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Expense'>,
    StackScreenProps<RootStackLoggedParamList>
>;
const Expense: FC<Props> = ({ navigation }) => {
    const { token } = useToken();
    const { expenses, isLoading, isError } = useExpenses();
    const { categories } = useCategories();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const onSelectCategory = (categoryId: string) => {
        let categoriesSelected = selectedCategories;
        const category = selectedCategories?.find(
            (cate) => cate === categoryId
        );
        if (category)
            categoriesSelected = categoriesSelected.filter(
                (cat) => cat !== categoryId
            );
        else categoriesSelected = [...categoriesSelected, categoryId];

        setSelectedCategories(categoriesSelected);
    };
    const categoriesFilter = (expense: expenseInterface) => {
        if (!selectedCategories.length) return true;

        return selectedCategories.includes(expense.category);
    };

    return (
        <View style={[styles.container]}>
            <ScrollView
                scrollEnabled
                horizontal
                style={[{ marginVertical: 10, height: 30 }]}
            >
                {categories?.map((category) => {
                    return (
                        category.name && (
                            <TouchableOpacity
                                onPress={() => onSelectCategory(category._id)}
                                style={[{ marginHorizontal: 10 }]}
                                key={category?._id}
                            >
                                <CategoryTag
                                    category={category}
                                    active={selectedCategories.includes(
                                        category._id
                                    )}
                                />
                            </TouchableOpacity>
                        )
                    );
                })}
                <CategoryTag
                    category={{ _id: '1', name: '+' }}
                    fontSize="15"
                    color="purple"
                />
            </ScrollView>
            <ScrollView scrollEnabled style={[styles.scrollView]}>
                {isLoading && <Text>...Loading</Text>}
                {isError && <Text>...Error</Text>}
                {expenses?.filter(categoriesFilter)?.map((expense) => {
                    return (
                        <View key={expense?._id} style={[styles.cardItem]}>
                            <ExpenseCard
                                width="100%"
                                showIcons
                                expense={expense}
                                onDelete={() => {
                                    deleteExpense({
                                        expenseId: expense._id,
                                        token: token,
                                    });
                                }}
                                edit={() => {
                                    navigation.navigate('Create', {
                                        expense: expense,
                                        type: createType.EXPENSE,
                                    });
                                }}
                            />
                        </View>
                    );
                })}
            </ScrollView>
            <View style={[styles.buttonContainer]}>
                <Button
                    style={styles.buttonStyle}
                    onPress={() => {
                        navigation.navigate('Create', {
                            type: createType.EXPENSE,
                        });
                    }}
                    title="create expenses"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 20,
    },
    buttonStyle: {
        width: '90%',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardItem: {
        marginVertical: 10,
        width: '90%',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    scrollView: {
        alignItems: 'center',
    },
});

export default Expense;
