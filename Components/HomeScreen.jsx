import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const url = "https://api.api-ninjas.com/v1/imagetotext";
const key = process.env.X_API_KEY;

export default function HomeScreen({ route, navigation }) {
    let photo = route.params?.photo ?? null;
    const [text, setText] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(null);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                getText(result.uri);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getText = async (photo) => {
        if (!photo) return;
        var formData = new FormData();
        formData.append("image", {
            uri:
                Platform.OS === "android"
                    ? photo
                    : photo.replace("file://", ""),
            type: "image/jpeg",
            name: photo.replace("file://", ""),
        });
        try {
            let response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "X-Api-Key": key,
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData,
                },
                { mode: "no-cors" }
            );
            let data = await response.json();
            setText(data);
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    const updateText = async () => {
        const response = await getText(photo);
        return response;
    };
    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                flexDirection: "column",
                backgroundColor: "fff",
            }}
        >
            <View
                style={{
                    flex: 5,
                    width: "100%",
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 20, padding: 20 }}></Text>
                {photo && (
                    <Image
                        source={{ uri: photo }}
                        style={{
                            width: "90%",
                            height: "90%",
                            alignContent: "center",
                            alignSelf: "center",
                        }}
                    />
                )}
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                }}
            >
                <Pressable
                    style={{
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 20,
                        padding: 20,
                        borderRadius: 50,
                        borderWidth: 1,
                    }}
                    onPress={() => {
                        navigation.navigate("Menu", {
                            data: "Message from Home",
                        });
                    }}
                >
                    <Text>Take photo</Text>
                </Pressable>
            </View>
        </View>
    );
}
