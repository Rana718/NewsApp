import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
    setSearchQuery: Function,
    EnableButton?: Boolean,
};

export default function SearchBar({ setSearchQuery, EnableButton = false }: Props) {
    const [query, setQuery] = useState("");



    return (
        <View className="px-3 pb-5">
            <View className="bg-gray-200 py-2 px-3 rounded-xl flex-row items-center">
                {(!EnableButton) &&
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
                {(EnableButton) && (
                    <Link href={{
                        pathname: '/newsde/search',
                        params: {
                            query: query,
                        }
                    }} asChild>
                        <TouchableOpacity className="py-1">
                            <FontAwesome name="search" size={24} color={Colors.tint} />
                        </TouchableOpacity>
                    </Link>
                )}
            </View>
        </View>
    )
}