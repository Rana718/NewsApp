import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

export default function Header({}: Props) {
    return(
        <View className="px-4 flex-row justify-between items-center pb-5">
            <View className="flex-row items-center gap-3">
                <Image className="w-12 h-12 rounded-full" source={{uri: 'https://imgs.search.brave.com/YoTtxHQKQ1jLXtLCXtAb6b0Y7gJkO1cjTBrJ2vicedo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzY4LzI1Lzk1/LzM2MF9GXzc2ODI1/OTU5NV9XS1dhTHlT/MVh5T3FvS3hWbVFH/Slk2WmxuSWtHbWh4/Qi5qcGc'}}/>
                <View className="gap-1">
                    <Text className="text-xs text-darkGrey">Welcome!</Text>
                    <Text className="text-sm font-bold text-black">Guest !!</Text>
                </View>
            
            </View>

            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color={Colors.black}/>
            </TouchableOpacity>
        </View>
    )
}