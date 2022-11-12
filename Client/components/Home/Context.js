import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("profile");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};
