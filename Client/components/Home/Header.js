import React from "react";
import {
  View,
  Text,
  Image,
  Linking,
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@rneui/themed";
import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";

const Headers = ({ navigate }) => {
  return (
    <SafeAreaProvider>
      <HeaderRNE
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Icon
                name="description"
                color="white"
                onPress={() => navigate("request")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Icon
                type="antdesign"
                name="rocket1"
                color="white"
                onPress={() => navigate("profile")}
              />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: "Requests", style: styles.heading }}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Headers;
