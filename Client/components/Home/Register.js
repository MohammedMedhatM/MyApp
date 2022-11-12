import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { register, signin, passForget } from "../../actions/user";
import { TextInput } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { DeviceEventEmitter } from "react-native";
import Dialogue from "./Dialogue";

const Register = ({ navigate, route }) => {
  const dispatch = useDispatch();
  const { user, getData } = route?.params || {};
  const [newUser, setNewUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
  });
  const [validEmail, setValidEmail] = useState("");
  const [validPass, setValidPass] = useState([""]);
  const [forget, setForget] = useState(false);
  const [open, setOpen] = useState(false);

  const clear = () => {
    setFormData({
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      lastName: "",
    });
  };

  const oldUser = () => {
    clear();
    setNewUser(false);
  };

  const newUsers = async () => {
    clear();

    setNewUser(true);
  };

  const isEmailValid = () => {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = formData.email;
    if (regex.test(email) === false) {
      setValidEmail("Not a valid Email");
    } else {
      setValidEmail("Email is valid");
    }
  };

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

  const EmailValid = () => {
    if (validEmail === "Email is valid") {
      return (
        <Text style={{ marginLeft: 10, color: "blue" }}>{validEmail}</Text>
      );
    } else {
      return <Text style={{ marginLeft: 10, color: "red" }}>{validEmail}</Text>;
    }
  };

  const PassValid = () => {
    if (validPass === "Password is valid") {
      return <Text style={{ marginLeft: 10, color: "blue" }}>{validPass}</Text>;
    } else {
      return <Text style={{ marginLeft: 10, color: "red" }}>{validPass}</Text>;
    }
  };

  const disabledTrue = () => {
    if (validPass === "Password is valid" && validEmail === "Email is valid") {
      return false;
    } else {
      return true;
    }
  };

  const submitForget = (e) => {
    e.preventDefault();

    dispatch(passForget({ formData: formData.email }));

    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUser === true) {
      await dispatch(signin(formData));
      getData();

      setFormData({
        firstName: "",
        email: "",
      });
    } else {
      dispatch(register(formData));
      setFormData({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
      });
    }
  };
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        padding: 20,
        paddingTop: 0,
        justifyContent: "center",
      }}
    >
      <View>
        <Image
          style={{
            width: 200,
            height: 200,
            position: "center",
            marginLeft: 80,
          }}
          source={require("../../assets/Requests-logos_transparent.png")}
        />
      </View>
      <View style={{ amrgin: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 30, color: "white" }}>
          {newUser ? "Welcome Back" : "Welcome to Requests"}
        </Text>
      </View>
      {forget ? (
        <>
          {open ? (
            <>
              <View style={styles.body}>
                <Text style={styles.emailMessage}>Check your Email</Text>
                <Text style={styles.emailBody}>
                  We sent you an email containing a link, follow it to reset
                  your password.
                </Text>
                <Button onPress={navigate("sign Up")} style={styles.button}>
                  Go Back
                </Button>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.text}>Enter Your Registered Email below</Text>
              <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                outlineColor="white"
                placeholder="Enter your Email"
                textContentType="emailAddress"
                onChangeText={(value) => {
                  setFormData({ ...formData, email: value });
                }}
                onBlur={isEmailValid}
                onFocus={() => {
                  setValidEmail("");
                }}
                value={formData.email}
              />
              <EmailValid />
              <Button onPress={submitForget} style={{ margin: 10 }}>
                Submit Your Email
              </Button>
            </>
          )}
        </>
      ) : (
        <View style={{}}>
          {newUser ? (
            <>
              <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                outlineColor="white"
                placeholder="Enter your Email"
                textContentType="emailAddress"
                onChangeText={(value) => {
                  setFormData({ ...formData, email: value });
                }}
                onBlur={isEmailValid}
                onFocus={() => {
                  setValidEmail("");
                }}
                value={formData.email}
              />

              <EmailValid />
              <TextInput
                style={styles.input}
                mode="outlined"
                secureTextEntry={true}
                label="Password"
                outlineColor="white"
                placeholder="Enter your passowrd"
                onChangeText={(value) =>
                  setFormData({ ...formData, password: value })
                }
                onBlur={isPasswordValid}
                onFocus={() => {
                  setValidPass("");
                }}
              />
              <PassValid />

              <Text
                onPress={() => {
                  setForget(true);
                }}
                style={{ marginLeft: 10 }}
              >
                Forget your password
              </Text>
              <Text
                style={{ margin: 10, textAlign: "right" }}
                onPress={oldUser}
              >
                Don't have an account? Sign Up
              </Text>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                outlineColor="white"
                placeholder="Enter your Email"
                textContentType="emailAddress"
                value={formData.email}
                onChangeText={(value) =>
                  setFormData({ ...formData, email: value })
                }
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                secureTextEntry={true}
                label="Password"
                outlineColor="white"
                placeholder="Enter your passowrd"
                onChangeText={(value) =>
                  setFormData({ ...formData, password: value })
                }
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                name="confirm"
                mode="outlined"
                outlineColor="white"
                label="Confirm Password"
                placeholder="Re-enter your passowrd"
                onChangeText={(value) =>
                  setFormData({ ...formData, confirmPassword: value })
                }
              />

              <TextInput
                style={styles.input}
                name="firstName"
                mode="outlined"
                outlineColor="white"
                label="First Name"
                placeholder="Enter your First Name"
                onChangeText={(value) =>
                  setFormData({ ...formData, firstName: value })
                }
              />

              <TextInput
                style={styles.input}
                name="lastName"
                mode="outlined"
                label="Last Name"
                outlineColor="white"
                placeholder="Enter your Last Name"
                onChangeText={(value) =>
                  setFormData({ ...formData, lastName: value })
                }
              />
              <Text
                style={{ margin: 10, textAlign: "right" }}
                onPress={newUsers}
              >
                Already have an account? Sign In
              </Text>
            </>
          )}
          <Button
            onPress={handleSubmit}
            disabled={disabledTrue()}
            title="Submit"
          />
        </View>
      )}
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
  emailMessage: { margin: 10, fontSize: 25 },
  emailBody: {
    margin: 10,
    fontSize: 15,
  },
  body: {
    margin: 10,
    padding: 10,
    flex: 0.3,
    backgroundColor: "#FAF9F6",
    borderRadius: 20,
  },
  button: {
    margin: 10,
    marginLeft: 200,
    borderRadius: 10,
  },
});

export default Register;
