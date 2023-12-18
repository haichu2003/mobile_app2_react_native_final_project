import { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, Image, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ route, navigation }) {
    let url = route.params?.url ?? null;
    console.log(url);
    const [cat, setCat] = useState({
        breed: "",
        image: "",
    });

    const getCat = async () => {
        if (url === null) return;
        let res = await fetch(url);
        console.log(res);
        let json = await res.json();
        console.log(json);
        setCat({
            breed: json[0].breeds[0].name,
            image: json[0].url,
        });
    };

    useEffect(() => {
        getCat();
    }, [url]);

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
                {cat.image !== "" ? (
                    <Image
                        source={{ uri: cat.image }}
                        style={{
                            width: "90%",
                            height: "90%",
                            resizeMode: "contain",
                        }}
                    ></Image>
                ) : (
                    <Text>Loading...</Text>
                )}
                <Text style={{ fontSize: 20, padding: 20 }}>{cat.breed}</Text>
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
                        url = null;
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
