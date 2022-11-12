import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";

import { Text, View, DeviceEventEmitter } from "react-native";
import { Divider, Provider } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Avatar } from "@rneui/themed";
import decode from "jwt-decode";
import { EventRegister } from "react-native-event-listeners";

import {
  NavigationContainer,
  NavigationHelpersContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { Provider as ProviderA, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import RequestScreen from "./screens/RequestScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MessageTab from "./screens/MessageScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";

import ShowScreen from "./screens/ShowScreen";
import BottomTab from "./screens/BottomTab";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import AuthContext from "./components/Home/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setisSignedIn] = useState("");
  const [SignedIn, setSignedIn] = useState("");

  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const [logged, setLogged] = useState("");
  const showMenu = () => setVisible(true);
  const [token, setToken] = useState("");
  const hideMenu = () => setVisible(false);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem("profile");

      if (user !== null) {
        setisSignedIn(true);
        const id = JSON.parse(user);
        setToken(id?.token);

        setUser(id?.result);
      } else {
        setisSignedIn(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("profile");
      setToken("");
      getData();
    } catch (e) {}
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
    getData();
  }, [token]);
  if (token.isLoading) {
    return <SplashScreen />;
  }
  const Drawer = createDrawerNavigator();
  return (
    <ProviderA store={store}>
      <AuthContext.Provider value={user}>
        <NavigationContainer>
          <Drawer.Navigator>
            {token ? (
              <>
                <Drawer.Screen
                  logged={logged}
                  setlogged={setUser}
                  name="Requests"
                  component={BottomTab}
                  user={user}
                  options={() => ({
                    headerStyle: {
                      backgroundColor: "#abdbe3",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                    headerRight: () => (
                      <Provider>
                        <View
                          style={{
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Menu
                            visible={visible}
                            anchor={
                              <Avatar
                                size={40}
                                rounded
                                containerStyle={{ fontWeight: "bold" }}
                                title={user?.name?.charAt(0)}
                                onPress={showMenu}
                              />
                            }
                            onRequestClose={hideMenu}
                          >
                            <MenuItem onPress={hideMenu}>Profile</MenuItem>
                            <MenuItem onPress={logOut}>Log Out</MenuItem>
                          </Menu>
                        </View>
                      </Provider>
                    ),
                  })}
                />
                <Drawer.Screen
                  name="Request"
                  initialParams={{ user: user }}
                  component={RequestScreen}
                />
                <Drawer.Screen
                  initialParams={{ users: user }}
                  name="Profile"
                  component={ProfileScreen}
                />
                <Drawer.Screen
                  initialParams={{ user: user }}
                  name="Messages"
                  component={MessageTab}
                />
              </>
            ) : (
              <>
                <Drawer.Screen
                  name="Sign Up"
                  component={AuthScreen}
                  getData={getData}
                  initialParams={{ user: user, getData }}
                  options={{ headerShown: false }}
                />
                <Drawer.Screen
                  name="NewPassword"
                  component={NewPasswordScreen}
                  getData={getData}
                  initialParams={{ user: user, getData }}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ProviderA>
  );
}
