import { Animated, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams, Link } from "expo-router";
import axios from "axios";
import { NewsDataType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import NewsItem from "@/components/NewsItem";

type Props = {};

export default function Search({ }: Props) {
    const { query, category, country } = useLocalSearchParams<{
        query?: string;
        category?: string;
        country?: string;
    }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, []);
    const getNews = async () => {
        try {
            let setquery = '';
            let setcategory = '';
            let setcountry = '';

            if (typeof query === 'string' && query.length !== 0) {
                setquery = `&q=${query}`;
            }

            if (typeof category === 'string' && category.length !== 0) {
                setcategory = `&category=${category}`;
            }

            if (typeof country === 'string' && country.length !== 0) {
                setcountry = `&country=${country}`;
            }

            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=10${setcategory}${setcountry}${setquery}`;
            const response = await axios.get(URL);

            if (response && response.data) {
                setNews(response.data.results);
                setIsLoading(false);
            }

        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                ),
                title: "Search"
            }}
            />

            <View className="mx-5 mt-5 mb-3">
                {isLoading ? (
                    <Loading size={"large"}/>
                ) : (
                    <Animated.FlatList
                        data={news}
                        keyExtractor={(_, index) => `list_items${index}`}
                        renderItem={({ item }) => (
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
    );
}
