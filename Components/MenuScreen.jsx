import { useState, useRef } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function MenuScreen({ navigation }) {
    const [selected, setSelected] = useState(null);
    const data = [
        { key: 1, value: "Cat" },
        { key: 2, value: "Dog" },
        { key: 3, value: "Bird", disabled: true },
        { key: 4, value: "Fish", disabled: true },
        { key: 5, value: "Hamster", disabled: true },
    ];
    const api = {
        1: {
            value: `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${process.env.CAT_API_KEY}`,
        },
        2: {
            value: `https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${process.env.DOG_API_KEY}`,
        },
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
            <View>
                <SelectList
                    setSelected={(val) => {
                        setSelected(val);
                    }}
                    data={data}
                    save="value"
                />
            </View>
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignSelf: "center",
                    alignItems: "center",
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
                        if (selected !== null) {
                            let url =
                                api[data.find((x) => x.value == selected).key]
                                    .value;
                            // console.log(selected);
                            // console.log(url);
                            navigation.navigate("Home", {
                                url: url,
                            });
                        } else {
                            Alert.alert("Please select an animal");
                        }
                    }}
                >
                    <Text>Done</Text>
                </Pressable>
            </View>
        </View>
    );
}
