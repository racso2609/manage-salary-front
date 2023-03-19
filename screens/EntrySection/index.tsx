import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import EntryCard from '../../components/entryCard';
import {
    ScrollView,
    Text,
    View,
    Button,
} from '../../components/styledComponents';
import { TabParamList } from '../../navigation/HomeBottomTab';
import {
    createType,
    RootStackLoggedParamList,
} from '../../navigation/LoggedStack';
import useEntries from '../../swr/useEntries';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Entry'>,
    StackScreenProps<RootStackLoggedParamList>
>;

const Entries: FC<Props> = ({ navigation }) => {
    const { entries, isLoading, isError } = useEntries();

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
