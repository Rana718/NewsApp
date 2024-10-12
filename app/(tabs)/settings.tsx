import { Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

export default function Settings({}: Props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <>
            <Stack.Screen options={{
                headerShown: true,
                title: "Settings"
            }} />

            <View className="flex-1 p-5">
                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">About</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">Send Feedback</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">Privacy Policy</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">Terms of Use</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 pt-4">
                    <Text className="text-[16px] font-medium text-black">Dark Mode</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: 'Colors.tint'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 pt-2 pb-4">
                    <Text className="text-[16px] font-bold text-red-500">Logout</Text>
                    <MaterialIcons
                        name="logout"
                        size={24}
                        color={"red"}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}