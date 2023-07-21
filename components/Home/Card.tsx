import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import { IHomeScreenCard } from "../../lib/constants.types";
import { FontAwesome5 } from "@expo/vector-icons";

interface IProps extends IHomeScreenCard {
  index: number;
  onPress: () => void;
}

const Card: FC<IProps> = ({ title, icon, color, index, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        elevation: 0.5,
      }}
      className={`bg-white shadow-inner rounded-3xl mb-2 py-6 ${
        index % 2 === 0 ? "mr-4" : "ml-4"
      } ${index === 0 || index === 1 ? "mt-0" : "mt-6"}`}
    >
      <View className="flex flex-col items-center justify-center justify-items-center">
        <FontAwesome5 name={icon} size={50} color={color} />
        <Text className="mt-4 font-semibold text-lg">{title}</Text>
      </View>
    </Pressable>
  );
};

export default Card;
