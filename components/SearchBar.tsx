import { Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
    setSearchQuery: Function
};

export default function SearchBar({setSearchQuery}: Props) {
    return(
        <View className="px-3 pb-5">
            <View className="bg-gray-200 py-2 px-3 rounded-xl flex-row items-center">
                <Ionicons name="search-outline" size={20} color={Colors.lightGrey}/>
                <TextInput 
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="Search" autoCapitalize="none" placeholderTextColor={Colors.lightGrey} 
                    className="text-black ml-2 text-lg flex-1"
                />
            </View>
        </View>
    )
}