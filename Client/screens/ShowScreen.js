import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import ShowRequest from "../components/Home/ShowRequest.js";

const ShowScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <ShowRequest navigate={navigation.navigate} route={route} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default ShowScreen;
