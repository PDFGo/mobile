import { View, Text, Platform, Pressable } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface IProps {
  isBack?: boolean;
}

const Header: FC<IProps> = ({ isBack }) => {
  let navigation = useNavigation<NavigationProp<any, any>>();
  return (
    <View
      className={`flex flex-row justify-between ${
        Platform.OS === "android" && "mt-8"
      }`}
    >
      <Pressable
        className="bg-white p-3 rounded-full "
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name={isBack ? "arrow-back" : "search"}
          size={24}
          color="black"
        />
      </Pressable>
      <Text className="font-bold text-inherit text-[#DEE9BE] shadow shadow-white text-3xl">
        Go
        <Text className="font-bold text-inherit  text-[#53B436] text-2xl">
          PDF
        </Text>
      </Text>
    </View>
  );
};

export default Header;
