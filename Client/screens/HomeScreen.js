import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Headers from "../components/Home/Header.js";
import Register from "../components/Home/Register.js";
import ViewRequest from "../components/Home/ViewRequest.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <ViewRequest
            refreshing={refreshing}
            onRefresh={onRefresh}
            route={route}
            navigate={navigation.navigate}
            navigation={navigation}
          />
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
  header: {
    margin: 20,
  },
});

export default HomeScreen;
