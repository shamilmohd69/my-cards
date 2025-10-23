import CustomDropdown from '@/components/customDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddNewCard = () => {
    const [formData, setFormData] = useState<any>({});
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [cardType, setCardType] = useState("");
    const [selectedBg, setSelectedBg] = useState<string | null>(null);

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

    const cardBackgrounds = [
        { id: 1, uri: "https://static.vecteezy.com/system/resources/thumbnails/006/413/046/small/orange-purple-red-blue-gradient-soft-abstract-background-you-can-use-this-background-for-your-content-like-as-technology-video-gaming-promotion-card-banner-sports-presentation-website-etc-vector.jpg" },
        { id: 2, uri: "https://media.istockphoto.com/id/1498657258/vector/abstract-dark-blue-blurred-defocused-gradient-background-with-dynamic-effect.jpg?s=612x612&w=0&k=20&c=vMPhXTUdwfOK04ZM7k7qRPahqb3EogVJSWI5NmFpo9U=" },
        { id: 3, uri: "https://placehold.co/200x120/32CD32/FFF?text=Green+Card" },
    ];

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            className='bg-black p-4'
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView>
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
                        <TextInput
                            value={formData.fullName}
                            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>

                    <View className="relative z-0">
                        <Text className="text-white mt-4">Document Number</Text>
                        <TextInput
                            keyboardType={cardType === "debit" ? "numeric" : "default"}
                            value={formData.documentNumber}
                            onChangeText={(text) => setFormData({ ...formData, documentNumber: text })}
                            placeholder="Document Number"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>

                    {/* Aadhaar Card */}
                    {cardType === "aadhaar" && (
                        <>
                            <View className="relative z-0">
                                <Text className="text-white mt-4">Date of Birth</Text>
                                <TextInput
                                    value={formData.dateOfBirth}
                                    onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                                    placeholder="DD/MM/YYYY"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>

                            <View className="relative z-0">
                                <Text className="text-white mt-4">Address</Text>
                                <TextInput
                                    value={formData.address}
                                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                                    placeholder="Full Address"
                                    placeholderTextColor="#888"
                                    multiline
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>
                        </>
                    )}

                    {/* Debit Card */}
                    {cardType === "debit" && (
                        <>
                            <View className="relative z-0">
                                <Text className="text-white mt-4">Valid Upto</Text>
                                <TextInput
                                    value={formData.expireDate}
                                    onChangeText={(text) => setFormData({ ...formData, expireDate: text })}
                                    placeholder="MM/YY"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>

                            <View className="relative z-0">
                                <Text className="text-white mt-4">CVV</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={formData.cvv}
                                    onChangeText={(text) => setFormData({ ...formData, cvv: text })}
                                    placeholder="CVV"
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
                                        <Image source={{ uri: bg.uri }} className="w-28 h-16 rounded-lg" />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}

                    {/* Driving Licence */}
                    {cardType === "driving" && (
                        <>
                            <View className="relative z-0">
                                <Text className="text-white mt-4">Date of Birth</Text>
                                <TextInput
                                    value={formData.dateOfBirth}
                                    onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                                    placeholder="DD/MM/YYYY"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>

                            <View className="relative z-0">
                                <Text className="text-white mt-4">Blood Group</Text>
                                <TextInput
                                    value={formData.bloodGroup}
                                    onChangeText={(text) => setFormData({ ...formData, bloodGroup: text })}
                                    placeholder="e.g. O+, B-"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>
                        </>
                    )}

                    {/* Passport */}
                    {cardType === "passport" && (
                        <>
                            <View className="relative z-0">
                                <Text className="text-white mt-4">Nationality</Text>
                                <TextInput
                                    value={formData.nationality}
                                    onChangeText={(text) => setFormData({ ...formData, nationality: text })}
                                    placeholder="e.g. Indian"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>

                            <View className="relative z-0">
                                <Text className="text-white mt-4">Expiry Date</Text>
                                <TextInput
                                    value={formData.expiryDate}
                                    onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
                                    placeholder="DD/MM/YYYY"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>
                        </>
                    )}

                    {/* Bank Card */}
                    {cardType === "bank" && (
                        <>
                            <View className="relative z-0">
                                <Text className="text-white mt-4">Bank Name</Text>
                                <TextInput
                                    value={formData.bankName}
                                    onChangeText={(text) => setFormData({ ...formData, bankName: text })}
                                    placeholder="Enter bank name"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>

                            <View className="relative z-0">
                                <Text className="text-white mt-4">IFSC Code</Text>
                                <TextInput
                                    value={formData.ifsc}
                                    onChangeText={(text) => setFormData({ ...formData, ifsc: text })}
                                    placeholder="Enter IFSC"
                                    placeholderTextColor="#888"
                                    className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                                />
                            </View>
                        </>
                    )}


                    <TouchableOpacity
                        onPress={() => {
                            // Add title based on selected card type before saving
                            const titleMap: Record<string, string> = {
                                aadhaar: "Aadhaar Card",
                                debit: "Debit Card",
                                driving: "Driving Licence",
                                passport: "Passport",
                                bank: "Bank Card",
                            };

                            const dataToSave = {
                                ...formData,
                                title: titleMap[cardType] || "Unknown Card",
                            };

                            storeData(dataToSave);
                            console.log("Saving:", dataToSave);

                            // reset fields
                            setFormData({});
                            setCardType("");
                            setSelectedBg(null);
                        }}
                    >
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddNewCard;
