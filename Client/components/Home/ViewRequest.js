import React, { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
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
  MD2Colors,
  ActivityIndicator,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../actions/request";
import * as Notifications from "expo-notifications";
import { register, getUser } from "../../actions/user";
import AuthContext from "./AuthContext";
import { CommonActions } from "@react-navigation/native";

const ViewRequest = ({ navigate, route, navigation }) => {
  const dispatch = useDispatch();
  const [req, setReq] = useState("");
  const [count, setCount] = useState(0);
  const { requests } = useSelector((state) => state?.requestReducer);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const user = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const registerForPushNotificationsAsync = async () => {
    try {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        throw new Error("Permission not granted!");
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

      return token;
    } catch (error) {
      console.error([error]);
    }
  };
  useEffect(() => {
    registerForPushNotificationsAsync();
    dispatch(getRequests());
    setReq(requests);
  }, [dispatch]);

  const Loading = () => {
    if (requests === null) {
      return <ActivityIndicator style={{ padding: 20 }} size="large" />;
    }
  };
  const newReq = () => {
    const diff = req?.length - requests?.length;
    if (diff > 0) {
      setCount(diff);
      navigation.setOptions({ tabBarBadge: count });
    } else {
      navigation.setOptions({
        tabBarBadgeStyle: { backgroundColor: "transparent" },
      });
    }
  };

  useEffect(() => {
    newReq();
  }, [requests]);

  return (
    <ScrollView>
      <Loading />
      <View style={styles.container}>
        {requests?.map((request) => (
          <Card
            style={styles.card}
            mode="contained"
            elevation={10}
            key={request._id}
          >
            <Card.Content>
              <Title>{request?.diagnosis}</Title>
              <Paragraph>{request?.details}</Paragraph>
            </Card.Content>
            <Card.Cover source={request?.image} />
            <Card.Actions>
              <Text>Ordered by {request?.sender?.department}</Text>
              <Button
                onPress={() => {
                  navigate("Show", { id: request._id });
                }}
              >
                View
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 4,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    margin: 4,
  },
});

export default ViewRequest;
