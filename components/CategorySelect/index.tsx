import React, { FC } from 'react';
import SelectInput from '../SelectInput';
import useForms from '../../hooks/useForms';
import useCategories from '../../swr/useCategories';
import { childrenProps } from '../../types';
import { categoryInterface } from '../../interfaces/categories';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from '../styledComponents';
interface propsTypes extends childrenProps {
    value: {
        defaultValue: string;
        onChangeText: (a: string) => void;
    };
    categoryName?: string;
}

const CategorySelect: FC<propsTypes> = ({ value, categoryName }) => {
    const internalValue = useForms({ type: 'text', default: categoryName });
    const { categories } = useCategories();
    const showPanel = categories && categories?.length > 0 ? true : false;
    const onHandleSelect = (category: categoryInterface) => {
        value.onChangeText(category._id);
        internalValue.onChangeText(category.name);
    };
    const styles = StyleSheet.create({
        list: {
            paddingHorizontal: 5,
            paddingVertical: 10,
        },
        listItem: {
            paddingVertical: 5,
        },
    });

    return (
        <View>
            <SelectInput internalValue={internalValue} show={showPanel}>
                <View style={[styles.list]}>
                    {categories &&
                        categories.map((category) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.listItem]}
                                    key={'category-' + category._id}
                                    onPress={() => {
                                        onHandleSelect(category);
                                    }}
                                >
                                    <Text>{category.name}</Text>
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </SelectInput>
        </View>
    );
};

export default CategorySelect;
