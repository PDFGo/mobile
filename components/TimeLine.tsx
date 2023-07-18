import { View, Text } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../lib/colors";
// @ts-ignore
import Pulse from "react-native-pulse";

interface IProps {
  step: number;
}

const TimeLine: FC<IProps> = ({ step }) => {
  return (
    <View
      className="px-6 border-0 border-t-4 flex-1 mx-2 "
      style={{
        borderColor: colors.secondary,
      }}
    >
      <View className="absolute -top-[18px] -left-2">
        <Ionicons name="radio-button-on" size={30} color={colors.secondary} />
        {step === 1 && (
          <Pulse
            color={colors.secondary}
            numPulses={5}
            diameter={60}
            speed={50}
            duration={4000}
          />
        )}
      </View>
      <Text className="absolute mt-3 -left-4 text-xs font-semibold">
        Choose file
      </Text>
      <View className="absolute -top-[18px] left-[55%] w-[30px]">
        <Ionicons name="radio-button-on" size={30} color={"#53B436"} />
        {step === 2 && (
          <Pulse
            color={colors.secondary}
            numPulses={5}
            diameter={60}
            speed={50}
            duration={4000}
          />
        )}
      </View>
      <Text className="absolute mt-3 left-[50%] text-xs font-semibold">
        Extraction
      </Text>

      <View className="absolute -top-[18px] -right-2">
        <Ionicons name="radio-button-on" size={30} color={colors.secondary} />
        {step === 3 && (
          <Pulse
            color={colors.secondary}
            numPulses={5}
            diameter={60}
            speed={50}
            duration={4000}
          />
        )}
      </View>
      <Text className="absolute mt-3 -right-4 text-xs font-semibold">
        View Result
      </Text>
    </View>
  );
};

export default TimeLine;
