import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Loading from "./Loading";

type Props = {
    newsList: Array<NewsDataType>
};

export default function NawsList({ newsList }: Props) {
    return (
        <ScrollView className="mx-4 mt-3" contentContainerStyle={{ paddingBottom: 40 }}>
            {newsList.length !== 0 ? (
                <>
                    {newsList.map((item, index) => (
                        <View key={index} className="flex-1 flex-row items-center mb-5 gap-[10px]">

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

                    ))}
                </>
            ) : (
                <Loading size={"large"} />
            )}

        </ScrollView>
    )
}