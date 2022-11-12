import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Dialog,
  Portal,
  TextInput,
  Searchbar,
  Provider,
} from "react-native-paper";
import * as Notifications from "expo-notifications";

import { useDispatch, useSelector } from "react-redux";
import { getRequest, updateRequest } from "../../actions/request";
import { NavigationHelpersContext } from "@react-navigation/native";
import AuthContext from "./AuthContext";

const ShowRequest = ({ route, navigate }) => {
  const { id } = route?.params || {};
  const [info, setInfo] = useState({
    reply: "",
    accept: "",
    receiver: "",
  });
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const user = useContext(AuthContext);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const show = () => setVisible1(true);

  const hide = () => {
    navigate("Home");
    setVisible1(false);
  };

  const clear = () => {
    setInfo({ reply: "", accept: "" });
  };
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state?.requestReducer);

  const acceptSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateRequest({ ...info, accept: "true", receiver: user?._id }, id)
    );
    show();
    clear();
  };

  const rejectSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateRequest({ ...info, accept: "false", receiver: user?._id }, id)
    );
    hideDialog();

    clear();
  };
  useEffect(() => {
    dispatch(getRequest(id));
  }, [id]);

  const notifyInApp = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };
  const Loading = () => {
    if (!request) {
      return <ActivityIndicator style={{ padding: 20 }} size="large" />;
    }
  };

  return (
    <View>
      {!request ? (
        <>
          <Card style={{ padding: 10, margin: 10, marginTop: 100 }}>
            <Card.Content>
              <Title>Dear , {user?.name}</Title>
              <Paragraph>Sorry, you didn't select any requests</Paragraph>
            </Card.Content>
          </Card>
        </>
      ) : (
        <>
          <Card style={{ margin: 9 }}>
            <Card.Content>
              <Title>{request?.diagnosis}</Title>
              <Paragraph>{request?.details}</Paragraph>
              <Divider bold={true} />
              <Title>Patient Information</Title>
              <Paragraph>Name: {request?.name}</Paragraph>
              <Paragraph>Age: {request?.age}</Paragraph>
              <Paragraph>Patient Id: {request?.patient_id}</Paragraph>
              <Paragraph>
                Past Medical History: {request?.medical.join(", ")}
              </Paragraph>
            </Card.Content>
            {request?.image?.map((image) => (
              <View style={{ margin: 10 }}>
                <Card.Cover source={[image]} onPress={() => {}} />
              </View>
            ))}

            <Card.Actions>
              <Button onPress={showDialog}>Decline</Button>
              <Button onPress={acceptSubmit}>Accept</Button>
            </Card.Actions>
          </Card>
          <Provider>
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Reason for rejection</Dialog.Title>
                  <Dialog.Content>
                    <TextInput
                      label="Reply"
                      name="reply"
                      placeholder="Please type your reason for rejecting the request"
                      multiline={true}
                      onChangeText={(value) =>
                        setInfo({ ...info, reply: value })
                      }
                      mode="outlined"
                      style={{ margin: 2, height: 80 }}
                    />
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button mode="contained" onPress={rejectSubmit}>
                      Submit
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </Provider>
          <Provider>
            <View>
              <Portal>
                <Dialog visible={visible1} onDismiss={hide}>
                  <Dialog.Title>Successful Request</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>
                      You have successfully placed your request, you can view it
                      from your request section
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hide}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </Provider>
        </>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "stretch",
  },
  image: {
    flex: 1,
  },
});

export default ShowRequest;
