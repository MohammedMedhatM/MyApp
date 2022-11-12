import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Badge,
  TextInput,
  Searchbar,
  Avatar,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/user";
import { ListItem } from "@rneui/themed";
import { io } from "socket.io-client";
import { NavigationHelpersContext } from "@react-navigation/native";

const ContactList = ({ navigate, navigation }) => {
  const { users } = useSelector((state) => state?.userReducer);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const onChangeSearch = (query) => setUser(query);

  useEffect(() => {
    dispatch(getUsers());
    setUser(users);
  }, []);

  const AvatarImage = ({ uri }) => {
    if (uri !== undefined) {
      return <Avatar.Image size={40} source={uri} />;
    } else {
      return (
        <Avatar.Image size={40} source={require("../../assets/empty.png")} />
      );
    }
  };

  return (
    <View>
      {users?.map((l, i) => (
        <TouchableOpacity
          onPress={() => {
            navigate("Message", {
              userId: l?._id,
              room: l?._id + l?.name,
              username: l?.name,
            });
          }}
        >
          <ListItem key={i} bottomDivider>
            <AvatarImage uri={l?.imageUri} />
            <ListItem.Content>
              <ListItem.Title>{l?.name}</ListItem.Title>
              <ListItem.Subtitle>{l?.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ContactList;
