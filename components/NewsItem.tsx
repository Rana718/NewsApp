import { Text, View, Image } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";



export default function NewsItem({ item }: { item: NewsDataType }) {
    return (
        <View className="flex-1 flex-row items-center mb-5 gap-[10px]">

            <Image className="w-[90px] h-[100px] rounded-2xl" source={{ uri: item.image_url }} />

            <View className="flex-1 gap-[5px] justify-center">

                <Text className="text-xs text-darkGrey capitalize">
                    {item.category}
                </Text>

                <Text numberOfLines={2} className="text-black font-semibold">
                    {item.title}
                </Text>
                <View className="flex-row items-center gap-[5px]">
                    <Image className="w-4 h-4 rounded-full" source={{ uri: item.source_icon }} />
                    <Text className="text-[12px] font-normal text-darkGrey">
                        {item.source_name}
                    </Text>
                </View>

            </View>
        </View>
    )
}