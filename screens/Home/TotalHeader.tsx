import { StyleSheet } from 'react-native';
import { View, Text } from '../../components/styledComponents';
import { totalData } from '../../interfaces/total';

export function TotalHeader({ total }: { total?: totalData }) {
    return (
        <View style={[styles.container]}>
            <View style={[styles.principalContainer]}>
                <Text style={[styles.principalTitle]}>{total?.total}$</Text>
            </View>
            <View style={[styles.secondContainer]}>
                <Text style={[styles.secondaryTitle]}>
                    Entries: {total?.totalEntries}$
                </Text>
                <Text style={[styles.secondaryTitle]}>
                    Expenses: {total?.totalExpenses}$
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        padding: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    principalContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondContainer: {
        width: '50%',
    },
    principalTitle: {
        fontSize: 30,
        width: '50%',
        fontWeight: 'bold',
    },
    secondaryTitle: {
        width: '100%',
        fontWeight: 'bold',
    },
});
