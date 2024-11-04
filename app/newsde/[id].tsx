import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { NewsDataType } from "@/types";
import axios from "axios";
import Loading from "@/components/Loading";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Params = {
  id?: string;
};

type Props = {};

export default function NewsDetails({}: Props) {
  const { id } = useLocalSearchParams<Params>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (!isLoading && news.length > 0) {
      checkBookmark(news[0].article_id);
    }
  }, [isLoading, news]);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const checkBookmark = async (newsId: string) => {
    const token = await AsyncStorage.getItem("bookmark");
    if (token) {
      const bookmarks = JSON.parse(token) as string[];
      setBookmarked(bookmarks.includes(newsId));
    }
  };

  const saveBookmark = async (newsId: string) => {
    try {
      setBookmarked(true);
      const token = await AsyncStorage.getItem("bookmark");
      const bookmarks = token ? (JSON.parse(token) as string[]) : [];

      if (!bookmarks.includes(newsId)) {
        bookmarks.push(newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        alert("News has been bookmarked");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const removeBookmark = async (newsId: string) => {
    try {
      setBookmarked(false);
      const token = await AsyncStorage.getItem("bookmark");
      if (token) {
        let bookmarks = JSON.parse(token) as string[];
        bookmarks = bookmarks.filter((id) => id !== newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        alert("News has been removed from bookmarks");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                bookmarked
                  ? removeBookmark(news[0].article_id)
                  : saveBookmark(news[0].article_id)
              }
            >
              <Ionicons
                name={bookmarked ? "heart" : "heart-outline"}
                color={bookmarked ? "red" : "black"}
                size={22}
              />
            </TouchableOpacity>
          ),
          title: "News Details"
        }}
      />
      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <ScrollView className="flex-1 bg-white px-5 pt-5 pb-5">
          <Text className="text-xl font-semibold text-gray-700 mb-2">
            {news[0].title}
          </Text>

          <View className="flex-row justify-between mb-4">
            <Text className="text-xs text-darkGrey">
              {moment(news[0].pubDate).format("MMMM DD hh:mm a")}
            </Text>

            <Text className="text-xs text-darkGrey">{news[0].source_name}</Text>
          </View>

          <Image
            className="w-full h-[300px] mb-4 rounded-xl"
            source={{ uri: news[0].image_url }}
          />

          {news[0].content ? (
            <Text className="text-[14px] text-darkGrey leading-6">
              {news[0].content}
            </Text>
          ) : (
            <Text className="text-[14px] text-darkGrey leading-6">
              {news[0].description}
            </Text>
          )}
        </ScrollView>
      )}
    </>
  );
}
