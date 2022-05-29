import React, { FC, useContext } from "react";
import SelectInput from "../SelectInput";
import UseForms from "../../hooks/useForms";
import useToken from "../../hooks/useToken";
import UseCategories from "../../swr/useCategories";
import { childrenProps } from "../../types";
import { TouchableOpacity } from "../styledComponents";
import { categoryInterface } from "../../interfaces/categories";
import { StyleSheet, View } from "react-native";
import ThemeContext from "../../context/colorContext";
interface propsTypes extends childrenProps {
  value: {
    defaultValue: string;
    onChangeText: (a: string) => void;
  };
}

const CategorySelect: FC<propsTypes> = ({ value }) => {
  const { token } = useToken();
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  const internalValue = UseForms({ type: "text" });
  const { categories } = UseCategories({ token });
  const showPanel = categories && categories?.length > 0 ? true : false;
  const onHandleSelect = (category: categoryInterface) => {
    console.log("press");
    value.onChangeText(category._id);
    internalValue.onChangeText(category.name);
  };
  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.card,
      paddingHorizontal: 5,
      paddingVertical: 10,
      zIndex: 9999,
    },
    listItem: {
      paddingVertical: 5,
      zIndex: 9999,
    },
  });

  return (
    <View style={{ backgroundColor: "red", zIndex: -1 }}>
      <SelectInput internalValue={internalValue} show={showPanel}>
        <View style={[styles.list]}>
          {categories &&
            categories.map((category) => {
              return (
                <TouchableOpacity
                  style={[styles.listItem]}
                  key={"category-" + category._id}
                  onPress={() => {
                    onHandleSelect(category);
                  }}
                >
                  {category.name}
                </TouchableOpacity>
              );
            })}
        </View>
      </SelectInput>
    </View>
  );
};

export default CategorySelect;
