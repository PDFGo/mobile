import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";

interface IProps {
  children: React.ReactNode;
}

const Wrapper: FC<IProps> = ({ children }) => {
  return (
    <SafeAreaView className="bg-[#F2F7EA]">
      <StatusBar
        style="auto"
        translucent={true}
        hideTransitionAnimation={"slide"}
      />
      <View className="bg-[#F2F7EA] h-full py-5 px-6 sm:px-20 sm:py-10">
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Wrapper;
