import { View, Text, ScrollView } from '../../components/styledComponents';
import { StyleSheet } from 'react-native';
import useEntries from '../../swr/useEntries';
import useExpenses from '../../swr/useExpenses';
import EntryCard from '../../components/entryCard';
import { createType } from '../../navigation/LoggedStack';

import ExpenseCard from '../../components/expenseCard';
import useTotal from '../../swr/useTotal';
import { TotalHeader } from './TotalHeader';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackLoggedParamList } from '../../navigation/LoggedStack';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { TabParamList } from '../../navigation/HomeBottomTab';
import CardSection from './CardSections';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Info'>,
    StackScreenProps<RootStackLoggedParamList>
>;

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

            <View style={styles.scrollSection}>
                <Text style={styles.title}>Entries</Text>
                <CardSection
                    isLoading={isLoadingEntries}
                    error={isErrorEntries}
                >
                    <ScrollView horizontal scrollEnabled>
                        {entries &&
                            entries?.map((entry) => {
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
                </CardSection>
            </View>
            <View style={styles.scrollSection}>
                <Text style={styles.title}>Expenses</Text>
                <CardSection
                    isLoading={isLoadingExpenses}
                    error={isErrorExpenses}
                >
                    <ScrollView horizontal scrollEnabled>
                        {expenses &&
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
