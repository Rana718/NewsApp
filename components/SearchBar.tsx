import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from "@/constants/Colors";

type Props = {
    setSearchQuery: Function,
};

export default function SearchBar({ setSearchQuery }: Props) {
    const [query, setQuery] = useState("");



    return (
        <View className="px-3 pb-5">
            <View className="bg-gray-200 py-2 px-3 rounded-xl flex-row items-center">
                { query.length === 0 &&
                    <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
                }
                <TextInput
                    onChangeText={(text) => {
                        setQuery(text);
                        setSearchQuery(text);
                    }}
                    value={query}
                    placeholder="Search" autoCapitalize="none" placeholderTextColor={Colors.lightGrey}
                    className="text-black ml-2 text-lg flex-1"
                />
                {(query.length !== 0) && (
                    <TouchableOpacity>
                        <FontAwesome name="search" size={24} color={Colors.tint} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}