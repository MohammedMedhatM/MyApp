import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import {
  TextInput,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Input, Button, CheckBox, Icon } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { postRequest } from "../../actions/request";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Notifications from "expo-notifications";

const RequestForm = ({ navigate, route }) => {
  const dispatch = useDispatch();
  const { user } = route.params || {};
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState([]);
  const [value, setValue] = useState([]);
  const [depValue, setDepValue] = useState([]);
  const [notification, setNotification] = useState();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [dep, setDep] = useState([
    { label: "cardiology", value: "cardiology" },
    { label: "Immunology", value: "Immunology" },
    { label: "Surgery", value: "Surgery" },
    { label: "Neurosurgery", value: "Neurosurgery" },
  ]);
  const [items, setItems] = useState(["DM", "Hypertension", "ISHD", "Stroke"]);
  const [request, setRequest] = useState({
    name: "",
    age: "",
    medical: [],
    diagnosis: "",
    details: "",
    image: [],
    patient_id: "",
    department: "",
    sender: "",
  });
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item} />;

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

  useEffect(() => {
    permisionFunction();
  }, []);

  const clear = () => {
    setRequest({
      name: "",
      age: "",
      medical: [],
      diagnosis: "",
      details: "",
      image: [],
      patient_id: "",
      department: "",
    });
  };
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const Dialogue = () => {
    return (
      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Successful Request</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  You have successfully placed your request, you can view it
                  from your request section
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    hideDialog();
                    navigate("Home");
                  }}
                >
                  Done
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      postRequest({
        ...request,
        medical: value,
        image: imageUri,
        department: depValue,
        sender: user._id,
      })
    );

    showDialog();
    clear();
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "column",
          flex: 2,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Request Form
          </Text>
        </View>
        <View style={{}}>
          <Text style={{ marginBottom: 10, marginLeft: 5, flex: 1 }}>
            Department
          </Text>

          <DropDownPicker
            placeholder="Select a department"
            searchable={true}
            searchPlaceholder="Search here"
            open={open}
            value={depValue}
            items={dep}
            setOpen={setOpen}
            setValue={setDepValue}
            setItems={setDep}
            maxHeight={150}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Patient Name"
            placeholder="Patient Name"
            onChangeText={(value) => setRequest({ ...request, name: value })}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Patient Id"
            placeholder="Patient Hosiptal Id"
            onChangeText={(value) =>
              setRequest({ ...request, patient_id: value })
            }
          />
          <TextInput
            style={styles.input}
            label="Age"
            mode="outlined"
            placeholder="Age"
            onChangeText={(value) => setRequest({ ...request, age: value })}
          />

          <TextInput
            style={styles.input}
            label="Provisional Diagnosis"
            mode="outlined"
            placeholder="Provisional Diagnosis"
            onChangeText={(value) =>
              setRequest({ ...request, diagnosis: value })
            }
          />
          <TextInput
            style={{ margin: 4, height: 200 }}
            multiline={true}
            label="Request Details"
            mode="outlined"
            placeholder="Enter your request in details"
            onChangeText={(value) => setRequest({ ...request, details: value })}
          />
          <Text>Past Medical History</Text>

          {items.map((item) => (
            <View style={{ flexDirection: "row", padding: 2 }} key={item.id}>
              <BouncyCheckbox
                text={item}
                onPress={(isChecked: boolean) => {
                  setValue((current) => [...current, item]);
                }}
              />
            </View>
          ))}

          <Text>Image upload</Text>

          <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20,
            }}
          >
            <Icon raised name="cloud-upload" type="Ionicons" onPress={pick} />
            {imageUri?.map((image) => (
              <View key={image.id}>
                <Image
                  source={[image]}
                  style={{ width: 50, height: 50, margin: 3 }}
                />
              </View>
            ))}
          </View>
          <Button onPress={handleSubmit} title="Submit Your Request" />
        </View>
        <Dialogue />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 4,
  },
});

export default RequestForm;
