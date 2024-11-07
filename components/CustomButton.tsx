import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps{
    onPress: () => void;
    title: string;
    textStyle?: string;
    containerStyle?: string;
}

const CustomButton = ({ onPress, title, textStyle, containerStyle }: CustomButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.7} className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyle}`} onPress={onPress}>
            <Text className={`font-semibold text-lg ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;