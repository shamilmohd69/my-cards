import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, Text, View } from "react-native";
import CustomDropdown from "./CustomDropdown";

interface Props {
    title: string;
    snapPoints?: string[];
}



type Ref = BottomSheetModal;

const customBottomSheet = forwardRef<Ref, Props>((props, ref) => {

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
                        <Text className="text-white mt-4">Card Name</Text>
                        <BottomSheetTextInput
                            placeholder="Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>
                    <View className="relative z-0">
                        <Text className="text-white mt-4">Card Name</Text>
                        <BottomSheetTextInput
                            placeholder="Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>
                    <View className="relative z-0">
                        <Text className="text-white mt-4">Card Name</Text>
                        <BottomSheetTextInput
                            placeholder="Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>
                    <View className="relative z-0">
                        <Text className="text-white mt-4">Card Name</Text>
                        <BottomSheetTextInput
                            placeholder="Name"
                            placeholderTextColor="#888"
                            className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                        />
                    </View>
                </Pressable>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default customBottomSheet;