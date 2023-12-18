import { useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Camera, CameraType } from "expo-camera";

export default function MenuScreen({ navigation }) {
    const [permission, setPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);
    return (
        <View style={{ height: "100%" }}>
            <Camera
                style={{ flex: 1, width: "100%" }}
                type={type}
                ref={cameraRef}
                zoom={0}
            >
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        flex: 1,
                        width: "100%",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            alignSelf: "center",
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <Pressable
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: "#fff",
                            }}
                            onPress={async () => {
                                if (cameraRef.current) {
                                    let photo =
                                        await cameraRef.current.takePictureAsync();
                                    console.log(photo);
                                    navigation.navigate("Home", {
                                        photo: photo.uri,
                                    });
                                }
                            }}
                        ></Pressable>
                    </View>
                </View>
            </Camera>
        </View>
    );
}
