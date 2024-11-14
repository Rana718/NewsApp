import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import CheckBox from "@/components/CheckBox";
import { useNewsCategories } from "@/hooks/useNewsCatgories";
import { useNewsCountry } from "@/hooks/useNewsCounries";
import { Link } from "expo-router";


type Props = {};

export default function Discover({ }: Props) {
    const { top: safeTop } = useSafeAreaInsets();
    const { categories, toggleCategory } = useNewsCategories();
    const { country, toggleCountry } = useNewsCountry();
    const [searchText, setSearchText] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    return (
        <ScrollView style={{ paddingTop: safeTop + 20}}>

            <SearchBar setSearchQuery={setSearchText} />
            <Text className="text-xl font-bold mb-2 ml-3">
                Categories
            </Text>
            <View className="flex-row flex-wrap gap-1 mt-1 mx-1 mb-5">
                {categories.map((category) => (
                    <CheckBox
                        key={category.id} label={category.title} checked={category.selected}
                        onPress={() => { toggleCategory(category.id); setSelectedCategory(category.slug) }}
                    />
                ))}

            </View>

            <Text className="text-xl font-bold mb-2 ml-3">
                Country
            </Text>
            <View className="flex-row flex-wrap gap-1 mt-1 mx-1 mb-5">
                {country.map((item, index) => (
                    <CheckBox key={index} label={item.name} checked={item.selected}
                        onPress={() => { toggleCountry(index); setSelectedCountry(item.name) }}
                    />
                ))}
            </View>

            <Link href={{
                pathname: '/newsde/search',
                params: {
                    query: searchText,
                    country: selectedCountry,
                    category: selectedCategory
                }
            }} asChild>
                <TouchableOpacity className="bg-tint items-center p-3 rounded-lg mx-3 my-2">
                    <Text className="text-white font-semibold text-[16px]">Search</Text>
                </TouchableOpacity>
            </Link>
        </ScrollView>
    )
}