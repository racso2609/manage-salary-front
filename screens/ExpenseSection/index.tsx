import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryTag from '../../components/CategoryTag';
import ExpenseCard from '../../components/expenseCard';
import Spinner from '../../components/Spinner';
import {
    Button,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from '../../components/styledComponents';
import useToken from '../../hooks/useToken';
import { categoryInterface } from '../../interfaces/categories';
import { TabParamList } from '../../navigation/LoggedRouter';
import {
    createType,
    EntriesStackParamList,
} from '../../navigation/CreateStack';
import { deleteExpense } from '../../requests/expense';
import useCategories from '../../swr/useCategories';
import useExpenses from '../../swr/useExpenses';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Expenses'>,
    StackScreenProps<EntriesStackParamList>
>;
const Expense: FC<Props> = ({ navigation }) => {
    const { token } = useToken();

    const {
        expenses,
        isLoading,
        isError,
        isEmpty,
        page: expensesPage,
        nextPage: expensesNextPage,
        isReachingEnd,
        setExpenses,
    } = useExpenses({
        limit: 20,
    });
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
    const refresh = () => setExpenses([]);

    return (
        <SafeAreaView style={[styles.container]}>
            <View height="70px">
                <ScrollView
                    scrollEnabled
                    horizontal
                    style={[{ marginVertical: 10 }]}
                    height="100%"
                >
                    {categories?.map((category: categoryInterface) => {
                        return (
                            category.name && (
                                <TouchableOpacity
                                    onPress={() =>
                                        onSelectCategory(category._id)
                                    }
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
            </View>
            <TouchableOpacity onPress={refresh}>
                <Text>refresh</Text>
            </TouchableOpacity>
            <Text>{expensesPage}</Text>
            <Text>{expenses.length}</Text>
            {isLoading && <Text>...Loading</Text>}
            {isError && <Text>...Error</Text>}
            {isEmpty && <Text>no expenses added</Text>}
            {expenses.length > 0 && (
                <FlatList
                    horizontal={false}
                    initialNumToRender={20}
                    contentContainerStyle={[styles.scrollView]}
                    onEndReached={expensesNextPage}
                    data={expenses}
                    renderItem={({ item: expense }) => (
                        <ExpenseCard
                            width="100%"
                            marginVertical={10}
                            showIcons
                            expense={expense}
                            onDelete={() => {
                                deleteExpense({
                                    expenseId: expense._id,
                                    token: token,
                                });
                                setExpenses([]);
                            }}
                            edit={() => {
                                navigation.navigate('Create', {
                                    expense: expense,
                                    type: createType.EXPENSE,
                                });
                            }}
                        />
                    )}
                    ListFooterComponent={
                        isReachingEnd || isEmpty ? null : Spinner
                    } // Loader when loading next page.
                    keyExtractor={(item) => item._id}
                />
            )}

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
        paddingHorizontal: 10,
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
    buttonContainer: {
        width: '100%',
    },
    scrollView: {
        alignItems: 'stretch',
        // flex: 1,
        paddingHorizontal: 10,
    },
});

export default Expense;
