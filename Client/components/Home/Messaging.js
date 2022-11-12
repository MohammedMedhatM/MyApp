import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Badge,
  Chip,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Icon } from "@rneui/themed";
import { getMessage } from "../../actions/message";
import AuthContext from "./AuthContext";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";

const Messaging = ({ route, navigation }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { userId, room, username } = route.params || {};
  const dispatch = useDispatch();
  const onChangeSearch = (query) => setUser(query);
  const socket = io("http://192.168.1.10:5000");
  const messages = useSelector((state) => state?.messageReducer);
  const [messageList, setMessageList] = useState([]);

  const user = useContext(AuthContext);

  const joinRoom = () => {
    if (userId !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userId,
        message: currentMessage,
        sender: user?._id,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    joinRoom();

    dispatch(getMessage({ id: userId }));

    navigation.setOptions({ title: username });
  }, []);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.messageView}>
        {messageList?.map((messages) => (
          <View style={styles.messageViewIn}>
            <Avatar.Image
              size={24}
              source={require("../../assets/empty.png")}
            />
            <Chip style={styles.message} elevated={true}>
              <TextInput style={{ fontSize: 15 }}>
                {messages?.message}
                <TextInput style={{ fontSize: 10, color: "grey" }}>
                  {"   "}
                  {moment(messages?.date).format("LT")}
                </TextInput>
              </TextInput>
            </Chip>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TextInput
          value={currentMessage}
          placeholder="Type your message"
          onChangeText={(text) => setCurrentMessage(text)}
          style={styles.inputMessage}
        />
        <Icon
          style={{ margin: 15, marginLeft: 1 }}
          name="sc-telegram"
          type="evilicon"
          color="#517fa4"
          size={40}
          onPress={sendMessage}
        />
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "stretch",
  },
  inputMessage: {
    borderRadius: 20,
    margin: 10,
    marginRight: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 350,
    height: 40,
  },
  message: {
    flexWrap: "wrap",
    marginLeft: 10,
    backgroundColor: "#ADD8E6",
    flexDirection: "column",
  },

  messageDate: {
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 10,
    flexDirection: "row",
  },
  messageView: {
    flex: 1,
    height: 550,
    flexDirection: "column",
  },
  messageViewIn: {
    flex: 1,
    height: 550,
    flexDirection: "row",
    margin: 10,
  },
  messageViewOut: {
    flex: 1,
    height: 550,
    flexDirection: "reverse-row",
    margin: 10,
  },
});
export default Messaging;
