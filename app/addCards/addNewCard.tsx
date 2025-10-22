import React from "react";
import { Text, View } from "react-native";

const addNewCard = () => {
    return (
        <View
            className="bg-black"
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="text-white">Settings Screen</Text>
        </View>
    );
};

export default addNewCard;
