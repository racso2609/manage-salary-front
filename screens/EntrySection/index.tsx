import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import EntryCard from '../../components/entryCard';
import Spinner from '../../components/Spinner';
import {
    Text,
    View,
    Button,
    SafeAreaView,
} from '../../components/styledComponents';
import useToggle from '../../hooks/useToggle';
import useToken from '../../hooks/useToken';
import {
    EntriesStackParamList,
    createType,
} from '../../navigation/CreateStack';
import { deleteEntry } from '../../requests/entries';
import useEntries from '../../swr/useEntries';

type Props = StackScreenProps<EntriesStackParamList>;

const Entries: FC<Props> = ({ navigation }) => {
    const {
        entries,
        isLoading,
        isError,
        nextPage,
        isEmpty,
        isReachingEnd,
        setEntries,
    } = useEntries({
        limit: 20,
    });
    const { token } = useToken();
    const refreshControl = useToggle();
    const handleRefresh = () => {
        refreshControl.setIsActive(true);
        setEntries([]);
        refreshControl.setIsActive(false);
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>{refreshControl.isActive ? 'a' : 'b'}</Text>
            {isLoading && <Text>...Loading</Text>}
            {isError && <Text>...Error</Text>}

            {isEmpty && <Text>no entries added</Text>}
            {!isEmpty && (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshControl.isActive}
                            onRefresh={handleRefresh}
                        />
                    }
                    contentContainerStyle={[styles.scrollView]}
                    onEndReached={nextPage}
                    data={entries}
                    horizontal={false}
                    renderItem={({ item: entry }) => (
                        <EntryCard
                            entry={entry}
                            width="100%"
                            showIcons
                            marginVertical={10}
                            deleteEntry={() => {
                                deleteEntry({
                                    token,
                                    entryId: entry._id,
                                });
                            }}
                            edit={() => {
                                navigation.navigate('Create', {
                                    entry,
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
                            type: createType.ENTRY,
                        });
                    }}
                    title="create entry"
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
        // alignItems: 'center',
    },
    scrollView: {
        alignItems: 'stretch',
        paddingHorizontal: 10,
    },
});

export default Entries;
