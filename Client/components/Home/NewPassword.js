import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput } from "react-native-paper";

const NewPassword = () => {
  const [formData, setFormData] = useState("");
  const [validPass, setValidPass] = useState([""]);

  const isPasswordValid = () => {
    var password = formData.password;
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (password.length < 8) {
      setValidPass("Password should be greater than 6 characters");
    } else if (password.length > 15) {
      setValidPass("Password should be lesser than 15 characters");
    } else if (regex.test(password) === false) {
      setValidPass("Password must contains letters and special characters");
    } else {
      setValidPass("Password is valid");
    }
  };
  const PassValid = () => {
    if (validPass === "Password is valid") {
      return <Text style={{ marginLeft: 10, color: "blue" }}>{validPass}</Text>;
    } else {
      return <Text style={{ marginLeft: 10, color: "red" }}>{validPass}</Text>;
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        mode="outlined"
        secureTextEntry={true}
        label="Password"
        outlineColor="white"
        placeholder="Enter your passowrd"
        onChangeText={(value) => setFormData({ ...formData, password: value })}
        onBlur={isPasswordValid}
        onFocus={() => {
          setValidPass("");
        }}
      />
      <PassValid />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 10,
  },
  text: {
    color: "black",
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
export default NewPassword;
