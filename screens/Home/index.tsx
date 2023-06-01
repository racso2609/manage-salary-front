import { View, Text, ScrollView } from '../../components/styledComponents';
import { StyleSheet } from 'react-native';
import useEntries from '../../swr/useEntries';
import useExpenses from '../../swr/useExpenses';
import EntryCard from '../../components/entryCard';

import ExpenseCard from '../../components/expenseCard';
import useTotal from '../../swr/useTotal';
import { TotalHeader } from './TotalHeader';
import CardSection from './CardSections';

export default function Home() {
    const {
        entries,
        isLoading: isLoadingEntries,
        isError: isErrorEntries,
    } = useEntries({ page: 0, limit: 20 });
    const {
        expenses,
        isLoading: isLoadingExpenses,
        isError: isErrorExpenses,
    } = useExpenses({ page: 0, limit: 20 });
    const { total } = useTotal({});

    return (
        <View style={styles.container}>
            <TotalHeader total={total} />

            <View style={styles.scrollSection}>
                <Text style={styles.title}>Entries</Text>
                <CardSection
                    isLoading={isLoadingEntries}
                    error={isErrorEntries ? 'Error' : ''}
                >
                    <ScrollView horizontal scrollEnabled>
                        {entries &&
                            entries?.map((entry) => {
                                return (
                                    <EntryCard key={entry._id} entry={entry} />
                                );
                            })}
                    </ScrollView>
                </CardSection>
            </View>
            <View style={styles.scrollSection}>
                <Text style={styles.title}>Expenses</Text>
                <CardSection
                    isLoading={isLoadingExpenses}
                    error={isErrorExpenses ? 'Error' : ''}
                >
                    <ScrollView horizontal scrollEnabled>
                        {Array.isArray(expenses) &&
                            expenses?.map((expense) => {
                                return (
                                    <ExpenseCard
                                        key={expense._id}
                                        expense={expense}
                                    />
                                );
                            })}
                    </ScrollView>
                </CardSection>
            </View>
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
