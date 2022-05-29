import {
  View,
  Text,
  Button,
  TextInput,
} from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import UseForms from "../../hooks/useForms";
import useToken from "../../hooks/useToken";
import useCategories from "../../swr/useCategories";
import { createEntry, updateEntries } from "../../requests/entries";
import { createExpense, updateExpense } from "../../requests/expense";
import { RootStackParamList, createType } from "../../navigation/Stack";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import SelectInput from "../../components/SelectInput";
type Props = NativeStackScreenProps<RootStackParamList, "Create">;

export default function ({ route }: Props) {
  const { params } = route;
  const { entry, expense, type } = params;
  const { token } = useToken();
  const {
    categories,
    // isLoading: isLoadingCategories,
    // isError: isErrorCategories,
  } = useCategories({ token });

  const editableObject = entry || expense;

  const amount = UseForms({
    type: "text",
    default: editableObject?.amount?.toString(),
  });
  const description = UseForms({
    type: "text",
    default: editableObject?.description,
  });
  const name = UseForms({
    type: "text",
    default: type === createType.ENTRY ? entry?.name : "",
  });

  const create = type === createType.ENTRY ? createEntry : createExpense;
  const update = type === createType.ENTRY ? updateEntries : updateExpense;

  const onSubmit = async () => {
    const data = {
      amount: amount.defaultValue,
      description: description.defaultValue,
      name: name.defaultValue,
    };
    if (!editableObject?._id) await create({ data, token, id: "" });
    else await update({ data, token, id: editableObject._id });
  };
  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        {type === createType.ENTRY && (
          <>
            <Text>Name</Text>
            <TextInput {...name} />
          </>
        )}

        <Text>Amount</Text>
        <TextInput keyboardType="numeric" {...amount} />
        <Text>Description</Text>
        <TextInput height={70} multiline {...description} />
        {type === createType.EXPENSE && (
          <>
            <Text>Categories</Text>
            <SelectInput {...name} />
          </>
        )}
      </View>
      <Button style={styles.sendButton} onPress={onSubmit} title="create" />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginTop: 20,
  },
  sendButton: {
    width: "90%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
