import { ActivityIndicator, View } from "react-native";
import React from "react";

type Props = React.ComponentProps<typeof ActivityIndicator>

export default function ({...props}: Props) {
    return(
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator {...props} />
        </View>
    )
}