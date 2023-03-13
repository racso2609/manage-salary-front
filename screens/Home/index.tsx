import { View, Text, ScrollView } from '../../components/styledComponents';
import { StyleSheet } from 'react-native';
import useEntries from '../../swr/useEntries';
import useExpenses from '../../swr/useExpenses';
import EntryCard from '../../components/entryCard';
import { RootStackParamList, createType } from '../../navigation/Stack';

import ExpenseCard from '../../components/expenseCard';
import useTotal from '../../swr/useTotal';
import { TotalHeader } from './TotalHeader';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    const {
        entries,
        isLoading: isLoadingEntries,
        isError: isErrorEntries,
    } = useEntries();
    const {
        expenses,
        isLoading: isLoadingExpenses,
        isError: isErrorExpenses,
    } = useExpenses();
    const { total } = useTotal();

    return (
        <View style={styles.container}>
            <TotalHeader total={total} />

            {isLoadingEntries ? (
                <Text>...Loading</Text>
            ) : isErrorEntries ? (
                <Text>Error</Text>
            ) : (
                <View style={styles.scrollSection}>
                    <Text style={styles.title}>Entries</Text>
                    <ScrollView horizontal scrollEnabled>
                        {entries &&
                            entries.map((entry) => {
                                return (
                                    <EntryCard
                                        key={entry._id}
                                        edit={() => {
                                            navigation.navigate('Create', {
                                                entry: entry,

                                                type: createType.ENTRY,
                                            });
                                        }}
                                        entry={entry}
                                    />
                                );
                            })}
                    </ScrollView>
                </View>
            )}
            {isLoadingExpenses ? (
                <Text>...Loading</Text>
            ) : isErrorExpenses ? (
                <Text>Error</Text>
            ) : (
                <View style={styles.scrollSection}>
                    <Text style={styles.title}>Expenses</Text>
                    <ScrollView horizontal scrollEnabled>
                        {!expenses?.length ? (
                            <Text>Not expenses</Text>
                        ) : (
                            expenses.map((expense) => {
                                return (
                                    <ExpenseCard
                                        key={expense._id}
                                        edit={() => {
                                            navigation.navigate('Create', {
                                                expense: expense,
                                                type: createType.EXPENSE,
                                            });
                                        }}
                                        expense={expense}
                                    />
                                );
                            })
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scrollSection: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        margin: 10,
        width: '100%',
    },
});
