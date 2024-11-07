import { View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, { SharedValue } from "react-native-reanimated";

type Props = {
    items: NewsDataType[],
    pageinationIndex: number,
    scollX: SharedValue<number>
};

export default function Pagination({items, pageinationIndex, scollX}: Props) {
    return(
        <View className="flex-row h-[40px] justify-center items-center">
            {items.map((_, index)=>{
                return <Animated.View key={index} className={`h-2 w-2 rounded-full mx-1 ${pageinationIndex===index ? 'bg-tint': 'bg-gray-800'}`} />
            })}
        </View>
    )
}