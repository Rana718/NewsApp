import { Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import newsCategoryList from "@/constants/Categories";


type Props = {};

export default function Discover({}: Props) {
    const { top: safeTop } = useSafeAreaInsets();

    return(
        <View style={{paddingTop: safeTop+20}}>
            <SearchBar/>
            <Text className="text-xl font-bold mb-2 ml-3">
                Categories
            </Text>

            <View className="flex-row flex-wrap gap-4 mt-1 mx-1 mb-5">
                {newsCategoryList.map((category) =>(
                    <Text className="">{category.title}</Text>
                ))}

            </View>
        </View>
    )
}