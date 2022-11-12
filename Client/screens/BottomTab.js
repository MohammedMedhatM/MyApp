import React, { useState, useEffect, useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ShowScreen from "./ShowScreen";
import { Icon } from "@rneui/themed";

const Tab = createBottomTabNavigator();

function BottomTab() {
  const [alert, setAlert] = useState("");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <Icon name="home" type="FontAwesome" color={color} />;
          } else if (route.name === "Show") {
            return <Icon name="preview" type="Fontisto" color={color} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Show"
        component={ShowScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
