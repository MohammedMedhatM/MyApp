import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import { Input, Icon } from "@rneui/themed";
import { register, getUser, udpateUser } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import AuthContext from "./AuthContext";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
  Divider,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const Profile = ({ route, navigate }) => {
  const dispatch = useDispatch();
  const userG = useSelector((state) => state?.userReducer);
  const userCurrent = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    position: "",
    photo: "",
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [disable, setDisable] = useState(true);

  const [value1, setValue1] = useState(null);
  const [items, setItems] = useState([
    { label: "cardiology", value: "cardiology" },
    { label: "Immunology", value: "Immunology" },
    { label: "Surgery", value: "Surgery" },
    { label: "Neurosurgery", value: "Neurosurgery" },
  ]);
  const [jobs, setJobs] = useState([
    { label: "Senior", value: "Senior" },
    { label: "Junior", value: "Junior" },
    { label: "Sub_Senior", value: "Sub_Senior" },
  ]);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [imageUri, setImageUri] = useState([]);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);
    setGalleryPermission(imagePermission.status === "granted");
    if (imagePermission.status !== "granted") {
      alert("Permission for media access needed.");
    }
  };
  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri((current) => [...current, result.uri]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(udpateUser({ ...user, department: value, position: value1 }));
  };

  useEffect(() => {
    dispatch(getUser(userCurrent?._id));
    if (userG.user) setUser(userG.user);
  }, [userCurrent]);

  useEffect(() => {
    if (userG.user) setUser(userG.user);
  }, [userG]);

  return (
    <View>
      <View style={styles.container}>
        <Avatar.Image
          source={imageUri}
          style={{ backgroundColor: "grey" }}
          size={175}
        />
        <Icon
          onPress={pick}
          name="add-a-photo"
          type="MaterialIcons"
          size="30"
        />
      </View>
      <View style={styles.containerText}>
        <Input
          mode="outlined"
          label="Name"
          value={user.name}
          onChangeText={(value) => setUser({ ...user, name: value })}
          style={styles.text}
          disabled={disable}
          rightIcon={
            <Icon
              onPress={() => {
                setDisable(false);
              }}
              name="edit"
              type="FontAwesome"
              size={24}
              color="black"
            />
          }
        />
        <Input
          mode="outlined"
          label="Email"
          value={user.email}
          onChangeText={(value) => setUser({ ...user, email: value })}
          style={styles.text}
          disabled={disable}
          rightIcon={
            <Icon
              onPress={() => {
                setDisable(false);
              }}
              name="edit"
              type="FontAwesome"
              size={24}
              color="black"
            />
          }
        />
        <Input
          mode="outlined"
          label="Password"
          value={user.password}
          onChangeText={(value) => setUser({ ...user, password: value })}
          secureTextEntry={true}
          style={styles.text}
          disabled={disable}
          rightIcon={
            <Icon
              onPress={() => {
                setDisable(false);
              }}
              name="edit"
              type="FontAwesome"
              size={24}
              color="black"
            />
          }
        />
        <Input
          mode="outlined"
          label="Phone Number"
          placeholder="Enter your phone number"
          value={user.phone}
          onChangeText={(value) => setUser({ ...user, phone: value })}
          value={user.phone}
          style={styles.text}
          disabled={disable}
          rightIcon={
            <Icon
              onPress={() => {
                setDisable(false);
              }}
              name="edit"
              type="FontAwesome"
              size={24}
              color="black"
            />
          }
        />
        <Divider
          style={{ marginBottom: 20, borderWidth: 1, borderColor: "grey" }}
          bold={true}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginBottom: 10, marginLeft: 5, flex: 1 }}>
            Department
          </Text>
          <Icon
            style={{ flex: 2, marginRight: 16 }}
            onPress={() => {
              setDisable(false);
            }}
            name="edit"
            type="FontAwesome"
            size={24}
            color="black"
          />
        </View>
        <View>
          <DropDownPicker
            placeholder="Select a department"
            searchable={true}
            searchPlaceholder="Search here"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            maxHeight={150}
            dropDownDirection="TOP"
          />
        </View>
        <Text style={{ marginTop: 20, marginBottom: 10, marginLeft: 5 }}>
          Position
        </Text>
        <DropDownPicker
          placeholder="Select your position"
          open={open1}
          stickyHeader={true}
          value={value1}
          items={jobs}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setJobs}
          maxHeight={150}
        />
      </View>
      <Button
        style={{ marginLeft: 20, marginRight: 20, marginBottom: 30 }}
        mode="contained"
        outlined
        type="submit"
        onPress={handleSubmit}
      >
        Save Changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    margin: 10,
  },
  containerText: {
    flex: 1,
    margin: 20,
    padding: 6,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
  },
});

export default Profile;
