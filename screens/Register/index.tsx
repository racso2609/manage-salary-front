import React, { useContext } from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "../../components/styledComponents";
import UseForms from "../../hooks/useForms";
import AuthContext from "../../context/auth";

export default function Register() {
  const email = UseForms({ type: "email", default: "" });
  const firstName = UseForms({ type: "text", default: "" });
  const lastName = UseForms({ type: "text", default: "" });
  const password = UseForms({ type: "password", default: "" });

  const { register } = useContext(AuthContext);
  const handleSubmit = () => {
    if (register)
      register({
        email: email.defaultValue,
        password: password.defaultValue,
        firstName: firstName.defaultValue,
        lastName: lastName.defaultValue,
      });
  };

  return (
    <View style={[styles.container]}>
      <StatusBar hidden={true} />
      <View style={styles.form}>
        <View style={styles.doubleForm}>
          <TextInput
            {...firstName}
            placeholder="first name"
            style={{ marginRight: 5, flexGrow: 0.9 }}
          />

          <TextInput
            {...lastName}
            placeholder="last name"
            style={{ marginLeft: 5, flexGrow: 0.9 }}
          />
        </View>
        <TextInput
          defaultValue={email.defaultValue}
          onChangeText={email.onChangeText}
          placeholder="email"
        />

        <TextInput
          defaultValue={password.defaultValue}
          onChangeText={password.onChangeText}
          placeholder="password"
          secureTextEntry={password.secureTextEntry}
        />

        <TouchableOpacity
          onPress={password.toggleSecureText}
          style={{ marginBottom: 10 }}
        >
          {password?.secureTextEntry ? "Show " : "Hidden "}
          password
        </TouchableOpacity>

        <Button title="Register" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  h1: {
    fontSize: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  doubleForm: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
