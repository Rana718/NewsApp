import { ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Loading from "./Loading";
import { Link } from "expo-router";
import NewsItem from "./NewsItem";

type Props = {
    newsList: Array<NewsDataType>
};

export default function NawsList({ newsList }: Props) {
    return (
        <ScrollView className="mx-4 mt-3" contentContainerStyle={{ paddingBottom: 40 }}>
            {newsList.length !== 0 ? (
                <>
                    {newsList.map((item, index) => (
                        <Link href={`/newsde/${item.article_id}`} asChild key={index}>
                            <TouchableOpacity>
                                <NewsItem item={item}/>
                            </TouchableOpacity>
                        </Link>

                    ))}
                </>
            ) : (
                <Loading size={"large"} />
            )}

        </ScrollView>
    )
}