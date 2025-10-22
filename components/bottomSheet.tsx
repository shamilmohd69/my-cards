import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput, } from "@gorhom/bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { forwardRef, useCallback, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import CustomDropdown from "./customDropdown";

interface Props {
    title: string;
    snapPoints?: string[];
}

type Ref = BottomSheetModal;

const customBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    const [formData, setFormData] = useState<any>({});
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [cardType, setCardType] = useState("");
    const [selectedBg, setSelectedBg] = useState<string | null>(null);



    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const storeData = async (value: any) => {
        try {
            const existingData = await AsyncStorage.getItem('my-key-data');
            let dataArray = existingData ? JSON.parse(existingData) : [];
            dataArray.push(value);
            await AsyncStorage.setItem('my-key-data', JSON.stringify(dataArray));
            console.log("Saved array:", dataArray);
        } catch (e) {
            console.log(e);
        }
    };

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('my-key-data');
            console.log("All saved data cleared");
        } catch (e) {
            console.log("Error clearing data:", e);
        }
    };

    // Fake card backgrounds (replace with your image URLs)
    const cardBackgrounds = [
        { id: 1, uri: "https://static.vecteezy.com/system/resources/thumbnails/006/413/046/small/orange-purple-red-blue-gradient-soft-abstract-background-you-can-use-this-background-for-your-content-like-as-technology-video-gaming-promotion-card-banner-sports-presentation-website-etc-vector.jpg" },
        { id: 2, uri: "https://media.istockphoto.com/id/1498657258/vector/abstract-dark-blue-blurred-defocused-gradient-background-with-dynamic-effect.jpg?s=612x612&w=0&k=20&c=vMPhXTUdwfOK04ZM7k7qRPahqb3EogVJSWI5NmFpo9U=" },
        { id: 3, uri: "https://placehold.co/200x120/32CD32/FFF?text=Green+Card" },
    ];

    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            backdropComponent={renderBackdrop}
            snapPoints={props.snapPoints}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: '#0F0E0E' }}
            handleIndicatorStyle={{ backgroundColor: '#888', marginTop: 8 }}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
            handleComponent={() => (
                <Pressable onPress={() => setIsSelectOpen(false)} className="p-4 pb-8 bg-[#0F0E0E] items-center">
                    <View className="w-12 h-1.5 bg-gray-500 rounded-full mb-6" />
                    <Text className="text-white font-bold text-base">{props.title}</Text>
                </Pressable>
            )}
        >
            <BottomSheetScrollView className="p-4 pt-0">
                <Pressable onPress={() => setIsSelectOpen(false)}>
                    {/* Dropdown */}
                    <CustomDropdown
                        label="Card Type"
                        selectedValue={cardType}
                        onValueChange={(value) => {
                            setCardType(value);
                            setFormData({ ...formData, cardType: value });
                        }}
                        isSelectOpen={isSelectOpen}
                        setIsSelectOpen={setIsSelectOpen}
                        items={[
                            { label: "Aadhaar Card", value: "aadhaar" },
                            { label: "Debit Card", value: "debit" },
                            { label: "Driving Licence", value: "driving" },
                            { label: "Passport", value: "passport" },
                            { label: "Bank Card", value: "bank" },
                        ]}
                    />

                    {/* Common Fields */}
                    <View className="relative z-0">
                        <Text className="text-white mt-4">Full Name</Text>
                        <BottomSheetTextInput
                            value={formData.fullName}
                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>

                    <View className="relative z-0">
                        <Text className="text-white mt-4">Document Number</Text>
                        <BottomSheetTextInput
                            keyboardType={cardType === "debit" ? "numeric" : "default"} // numeric for debit
                            value={formData.documentNumber}
                            onChangeText={(text) => setFormData({ ...formData, documentNumber: text })}
                            placeholder="Document Number"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>

                    {/* Only show if Debit Card */}
                    {cardType === "debit" && (
                        <>
                            {/* Valid Upto */}
                            <View className="relative z-0">
                                <Text className="text-white mt-4">Valid Upto</Text>
                                <BottomSheetTextInput
                                    value={formData.expireDate}
                                    onChangeText={(text) => setFormData({ ...formData, expireDate: text })}
                                    placeholder="MM/YY"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>

                            <Text className="text-white mt-5 mb-2 font-semibold">Card Background</Text>
                            <View className="flex-row justify-between">
                                {cardBackgrounds.map(bg => (
                                    <TouchableOpacity
                                        key={bg.id}
                                        onPress={() => {
                                            setSelectedBg(bg.uri);
                                            setFormData({ ...formData, bgImage: bg.uri });
                                        }}
                                        className={`border-2 rounded-lg ${selectedBg === bg.uri ? "border-[#d71921]" : "border-transparent"}`}
                                    >
                                        <Image source={{ uri: bg.uri }} className="w-28 h-16 rp" />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}

                    {/* Save Button */}
                    <TouchableOpacity onPress={() => {
                        storeData(formData);
                        console.log(formData);
                        if (ref && "current" in ref && ref.current) {
                            ref.current.dismiss();
                        }
                        setFormData({});
                        setCardType("");
                        setSelectedBg(null);
                    }}>
                        <View className="bg-[#d71921] rounded-full mt-6 p-4 px-10 items-center w-fit mx-auto">
                            <Text className="text-white font-bold text-base">Save</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Clear Button */}
                    <TouchableOpacity onPress={clearData}>
                        <View className="bg-gray-700 rounded-full mt-4 p-4 px-10 items-center w-fit mx-auto">
                            <Text className="text-white font-bold text-base">Clear All</Text>
                        </View>
                    </TouchableOpacity>
                </Pressable>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});

export default customBottomSheet;
