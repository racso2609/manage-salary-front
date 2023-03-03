import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { categoryInterface } from '../../interfaces/categories';
import { Text, View } from '../styledComponents';
interface propsType {
    category: categoryInterface;
    color?: string;
    fontSize?: any;
    active?: boolean;
}
const CategoryTag: FC<propsType> = ({ category, color, fontSize, active }) => {
    return (
        <View style={[styles.tagContainer]}>
            <Text style={[styles.textContainer]}>{category.name}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    tagContainer: {
        // backgroundColor: active ? colors.active : colors.card,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    textContainer: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CategoryTag;
