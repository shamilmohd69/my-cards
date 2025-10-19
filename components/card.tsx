import React from "react";
import { Image, Text, View } from "react-native";

interface CardProps {
    title: string;
    subtitle?: string;
    fullName?: string;
    description: string;
    primaryImage?: string;
    secondaryImage?: string;
    bgColor?: string;
    textColor?: string;
    bottomText?: string;
    documentNumber?: string;
    dateOfBirth?: string;
    address?: string;
}

const Card: React.FC<CardProps> = ({ title, dateOfBirth, address, description, fullName, primaryImage, secondaryImage, bgColor, textColor, bottomText, documentNumber, subtitle }) => {
    return (
        <View className="rounded-xl  shadow-md m-2 min-h-72 relative flex flex-col justify-between" style={bgColor ? { backgroundColor: bgColor } : { backgroundColor: '#1E1C1C' }}>
            <View className="p-4">
                <View className="flex flex-row items-center gap-4">
                    {primaryImage && (
                        <Image
                            source={{ uri: primaryImage }}
                            className="w-10 rounded-xl h-14 mb-4"
                            resizeMode="contain"
                        />
                    )}
                    <View className="relative">
                        <Image
                            source={require("../assets/images/india-bg.png")}
                            className="w-52 rounded-xl h-14 mb-4 opacity-50"
                            resizeMode="contain"
                        />
                        <Text className="absolute top-2  left-6 transform   text-center text-sm font-semibold flex items-center justify-center" style={textColor ? { color: textColor } : { color: '#000' }}>
                            {subtitle}
                        </Text>

                    </View>
                    {secondaryImage && (
                        <Image
                            source={{ uri: secondaryImage }}
                            className="w-14 rounded-xl ml-auto h-14 mb-4"
                            resizeMode="contain"
                        />
                    )}
                </View>
                <View className="flex flex-row gap-3 items-start">
                    <View className="flex-1">
                        <Text className="text-sm" style={textColor ? { color: textColor } : { color: '#888' }}>
                            <Text className="font-semibold">Name: </Text>
                            {fullName}
                        </Text>
                        <Text className="mt-1 text-sm" style={textColor ? { color: textColor } : { color: '#888' }}>
                            <Text className="font-semibold">Date of Birth: </Text>
                            {dateOfBirth}
                        </Text>
                        <Text className="mt-1 text-sm" style={textColor ? { color: textColor } : { color: '#888' }}>
                            <Text className="font-semibold">Address: </Text>
                            {address}
                        </Text>
                    </View>
                    <Image
                        source={{ uri: 'https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png' }}
                        className="w-24 h-24 mb-4 ml-4"
                        resizeMode="contain"
                    />
                </View>


            </View>
            <View>
                {documentNumber && (
                    <Text
                        className="mb-2 text-center text-2xl font-semibold"
                        style={textColor ? { color: textColor } : { color: "#888" }}
                    >
                        {documentNumber.replace(/(\d{4})(?=\d)/g, "$1  ")}
                    </Text>
                )}



                {bottomText && (
                    <Text className="text-center py-2  text-xl border-t-2 border-[#d71921]  font-medium" style={textColor ? { color: textColor } : { color: '#FFFFFF' }}>{bottomText}</Text>
                )}

            </View>
        </View>
    );
};

export default Card;
