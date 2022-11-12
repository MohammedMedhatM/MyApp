import React, { useState } from "react";
import {
  View,
  Text,
  RefreshControl,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Register from "../components/Home/Register.js";
import NewPassword from "../components/Home/NewPassword.js";

const NewPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

          <Register
            getData={getData}
            route={route}
            navigate={navigation.navigate}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#abdbe3",
  },
});

export default NewPasswordScreen;
