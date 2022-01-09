import React, { useContext } from "react";
import { StyleSheet, StatusBar } from "react-native";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from "../../components/styledComponents";
import UseForms from "../../hooks/useForms";
import AuthContext from "../../context/auth";

export default function Login() {
  const email = UseForms({ type: "email", default: "" });
  const password = UseForms({ type: "password", default: "" });
  const { login } = useContext(AuthContext);
  const handleSubmit = () => {
    login({ email: email.defaultValue, password: password.defaultValue });
  };

  return (
    <View style={[styles.container]}>
      <StatusBar hidden={true} />
      <View style={styles.form}>
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

        <TouchableOpacity onPress={password.toggleSecureText}>
          {password?.secureTextEntry ? "Show " : "Hidden "}
          password
        </TouchableOpacity>

        <Button title='Login' onPress={handleSubmit}/>
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
});
