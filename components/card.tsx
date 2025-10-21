import React from "react";
import { Image, Text, View } from "react-native";

interface CardProps {
    title: string;
    fullName?: string;
    description?: string;
    primaryImage?: string;
    secondaryImage?: string;
    qrCodeImage?: string;
    bgImage?: string;
    documentNumber?: string;
    dateOfBirth?: string;
    expireDate?: string;
    address?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    primaryImage,
    secondaryImage,
    bgImage,
    dateOfBirth,
    address,
    fullName,
    qrCodeImage,
    documentNumber,
    expireDate
}) => {

    if (title === "Aadhaar Card") {
        return (
            <View className="rounded-xl  shadow-md m-2 min-h-72 relative flex flex-col justify-between bg-white" >
                <View className="p-4">
                    <View className="flex flex-row items-center gap-4">
                        <Image
                            source={require("../assets/images/govt-of-india.png")}
                            className="w-10 rounded-xl h-14 mb-4"
                            resizeMode="contain"
                        />
                        <View className="relative">
                            <Image
                                source={require("../assets/images/india-bg.png")}
                                className="w-52 rounded-xl h-14 mb-4 opacity-40"
                                resizeMode="contain"
                            />
                            <Text className="absolute top-2  left-6 transform   text-center text-sm font-semibold flex items-center justify-center text-black" >
                                {`भारत सरकार \n Government of India`}
                            </Text>

                        </View>
                        <Image
                            source={require("../assets/images/aadhaar.png")}
                            className="w-14 rounded-xl ml-auto h-14 mb-4"
                            resizeMode="contain"
                        />
                    </View>
                    <View className="flex flex-row gap-3 items-start">
                        <View className="flex-1">
                            <Text className="text-sm text-black" >
                                <Text className="font-semibold">Name: </Text>
                                {fullName}
                            </Text>
                            <Text className="mt-1 text-sm" >
                                <Text className="font-semibold">Date of Birth: </Text>
                                {dateOfBirth}
                            </Text>
                            <Text className="mt-1 text-sm" >
                                <Text className="font-semibold">Address: </Text>
                                {address}
                            </Text>
                        </View>
                        {
                            qrCodeImage && (
                                <Image
                                    source={{ uri: qrCodeImage }}
                                    className="w-24 h-24  ml-4"
                                    resizeMode="contain"
                                />
                            )
                        }
                    </View>
                </View>
                <View>
                    {documentNumber && (
                        <Text
                            className="mb-2 text-center text-2xl font-semibold text-black"
                        >
                            {documentNumber.replace(/(\d{4})(?=\d)/g, "$1  ")}
                        </Text>
                    )}
                    <Text className="text-center py-2  text-xl border-t-2 border-[#d71921]  font-medium text-black">मेरा <Text className="text-[#d71921]">आधार,</Text>  मेरी पहचान</Text>
                </View>
            </View>
        );

    }

    if (title === "Debit Card") {
        return (
            <View className="rounded-xl  shadow-md  m-2 min-h-72 relative flex flex-col justify-between " >
                <Image source={{ uri: bgImage }} className="absolute inset-0 rounded-xl " resizeMode="cover" />
                <View className="p-5 flex-1 justify-between">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-white text-lg font-semibold" style={{ fontFamily: "SpaceGrotesk" }}>{description}</Text>
                        <Image
                            source={{
                                uri: primaryImage
                            }}
                            className="w-32 h-12"
                            resizeMode="center"
                        />
                    </View>

                    <View className="mt-3">
                        <View className="flex flex-row justify-between items-center">
                            <Image
                                source={{
                                    uri: "https://cdn-icons-png.freepik.com/256/6404/6404078.png?semt=ais_white_label",
                                }}
                                className="w-14 h-14 mb-2"
                                resizeMode="contain"
                            />
                            <Text className="text-white text-lg font-semibold" style={{ fontFamily: "SpaceGrotesk" }}>{title}</Text>
                            <Image
                                source={{
                                    uri: secondaryImage
                                }}
                                className="w-24 h-20 mb-2"
                                resizeMode="contain"
                            />

                        </View>

                        {documentNumber && (
                            <Text className="text-white text-2xl tracking-widest font-semibold" >
                                {documentNumber.replace(/(\d{4})(?=\d)/g, "$1  ")}
                            </Text>
                        )}
                    </View>

                    <View className="flex flex-row justify-between items-end mt-6">
                        <View>
                            <Text className="text-gray-300 text-xs uppercase" style={{ fontFamily: "SpaceGrotesk" }}>Card Holder</Text>
                            <Text className="text-white text-lg font-medium mt-1">{fullName}</Text>
                        </View>
                        {expireDate && (
                            <View>
                                <Text className="text-gray-300 text-xs uppercase" style={{ fontFamily: "SpaceGrotesk" }}>Valid Upto</Text>
                                <Text className="text-white text-lg font-medium mt-1 text-right">{expireDate}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );

    }


};

export default Card;
