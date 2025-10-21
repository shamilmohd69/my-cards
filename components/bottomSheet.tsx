import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, Text, TouchableOpacity, View } from "react-native";
import CustomDropdown from "./CustomDropdown";

interface Props {
    title: string;
    snapPoints?: string[];
}



type Ref = BottomSheetModal;

const customBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    const [formData, setFormData] = useState<any>({});
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    useEffect(() => {
        const backAction = () => {
            if (ref && "current" in ref && ref.current) {
                ref.current.dismiss(); // close the sheet
                return true; // prevent default back action
            }
            return false; // let default behavior happen
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );


        return () => backHandler.remove();
    }, [ref]);

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
            // get existing data
            const existingData = await AsyncStorage.getItem('my-key-data');
            console.log(existingData);

            let dataArray = [];

            if (existingData !== null) {
                dataArray = JSON.parse(existingData);
            }

            // push new entry
            dataArray.push(value);

            // save back
            await AsyncStorage.setItem('my-key-data', JSON.stringify(dataArray));
            console.log("Saved array:", dataArray);
        } catch (e) {
            console.log(e);
        }
    };


    const [cardType, setCardType] = useState("");
    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            backdropComponent={renderBackdrop}
            snapPoints={props.snapPoints}
            enablePanDownToClose={true}
            // enableContentPanningGesture={false}
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
            <BottomSheetView className="p-4 pt-0">
                <Pressable onPress={() => setIsSelectOpen(false)}>
                    <CustomDropdown
                        label="Card Type"
                        selectedValue={cardType}
                        onValueChange={setCardType}
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
                    <View className="relative z-0">
                        <Text className="text-white mt-4">Card Holder Name</Text>
                        <BottomSheetTextInput
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                            placeholder="Your Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>
                    <View className="relative z-0">
                        <Text className="text-white mt-4">Document Number</Text>
                        <BottomSheetTextInput
                            value={formData.documentNumber}
                            onChangeText={(text) => setFormData({ ...formData, documentNumber: text })}
                            placeholder="Document Number"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>

                    <TouchableOpacity onPress={() => {
                        storeData(formData);
                        console.log(formData);
                        if (ref && "current" in ref && ref.current) {
                            ref.current.dismiss();
                        }
                        setFormData({});


                    }}>
                        <View className="bg-[#d71921] rounded-full mt-6 p-4 px-10 items-center w-fit mx-auto">
                            <Text className="text-white font-bold text-base">Save</Text>
                        </View>
                    </TouchableOpacity>

                </Pressable>
            </BottomSheetView>
        </BottomSheetModal >
    );
});

export default customBottomSheet;