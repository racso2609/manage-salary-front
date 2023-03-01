import React, { FC, useContext } from 'react';
import SelectInput from '../SelectInput';
import UseForms from '../../hooks/useForms';
import useToken from '../../hooks/useToken';
import UseCategories from '../../swr/useCategories';
import { childrenProps } from '../../types';
import { categoryInterface } from '../../interfaces/categories';
import { StyleSheet, View } from 'react-native';
import ThemeContext from '../../context/colorContext';
import { Text, TouchableOpacity } from '../styledComponents';
interface propsTypes extends childrenProps {
    value: {
        defaultValue: string;
        onChangeText: (a: string) => void;
    };
    categoryName?: string;
}

const CategorySelect: FC<propsTypes> = ({ value, categoryName }) => {
    const { token } = useToken();
    const { theme } = useContext(ThemeContext);
    const { colors } = theme;
    const internalValue = UseForms({ type: 'text', default: categoryName });
    const { categories } = UseCategories({ token });
    const showPanel = categories && categories?.length > 0 ? true : false;
    const onHandleSelect = (category: categoryInterface) => {
        value.onChangeText(category._id);
        internalValue.onChangeText(category.name);
    };
    const styles = StyleSheet.create({
        list: {
            backgroundColor: colors.card,
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
