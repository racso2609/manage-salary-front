import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import EntryCard from '../../components/entryCard';
import {
    ScrollView,
    Text,
    View,
    Button,
} from '../../components/styledComponents';
import useToken from '../../hooks/useToken';
import { createType, RootStackParamList } from '../../navigation/Stack';
import UseEntries from '../../swr/useEntries';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const Entries: FC<Props> = ({ navigation }) => {
    const { token } = useToken();
    const { entries, isLoading, isError } = UseEntries({ token });

    return (
        <View style={[styles.container]}>
            <ScrollView scrollEnabled style={[styles.scrollView]}>
                {isLoading && <Text>...Loading</Text>}
                {isError && <Text>...Error</Text>}
                {entries?.map((entry) => {
                    return (
                        <View key={entry._id} style={[styles.cardItem]}>
                            <EntryCard
                                entry={entry}
                                width="100%"
                                showIcons
                                edit={() => {
                                    navigation.navigate('Create', {
                                        entry,
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
                            type: createType.ENTRY,
                        });
                    }}
                    title="create entry"
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
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    cardItem: {
        marginVertical: 10,
        width: '90%',
    },
    scrollView: {
        alignItems: 'center',
    },
});

export default Entries;
