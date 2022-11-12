import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Provider,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from "react-native-paper";

const Dialogue = ({ open }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog
            style={styles.dialog}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Check your Email</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                We sent you an email containing a link, follow it to reset your
                password.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#ADD8E6",
    height: 200,
  },
});
export default Dialogue;
