import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import Loading from "@/components/Loading";
import Animated from "react-native-reanimated";
import NewsItem from "@/components/NewsItem";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

export default function Saved({ }: Props) {
    const [bookmarkNews, setBookmarkedNews] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchBookmark();
    }, [isFocused])

    const fetchBookmark = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("bookmark");
            const res = token ? JSON.parse(token) : null;

            if (res) {
                let query_string = res.join(',');
                const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`;
                const response = await axios.get(URL);
                setBookmarkedNews(response.data.results);
            } else {
                setBookmarkedNews([]);
            }
        } catch (error) {
            console.error("Error fetching bookmarked news:", error);
            setBookmarkedNews([]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
            }} />

            {bookmarkNews.length === 0 && !isLoading && (
                <View className="flex-1 justify-start items-center mt-6">
                    <Text className="text-gray-700 font-bold text-xl">No bookmarked news</Text>
                </View>
            )}

            <View className="flex-1 m-5">
                {isLoading ? (
                    <Loading size={"large"} />
                ) : (
                    <Animated.FlatList
                        data={bookmarkNews}
                        keyExtractor={(_, index) => `list_items${index}`}
                        renderItem={({ item }) => (
                            //@ts-expect-error
                            <Link href={`/newsde/${item.article_id}`} asChild>
                                <TouchableOpacity>
                                    <NewsItem item={item} />
                                </TouchableOpacity>
                            </Link>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </>
    )
}