import { View, Text, Pressable, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import { IFile } from "../types";
import colors from "../lib/colors";
import TimeLine from "../components/TimeLine";

const ExtractImagesScreen = () => {
  const [file, setFile] = useState<IFile>();
  const [result, setResult] = useState<boolean>();
  const [step, setStep] = useState<number>(1);

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get("window").height / (result ? 1.18 : 2.4),
      duration: 500, // Duration set to 1 second (1000 milliseconds)
      useNativeDriver: false,
    }).start();
  }, [result]);

  let data = [
    { time: "09:00", title: "Event 1", description: "Event 1 Description" },
    { time: "10:45", title: "Event 2", description: "Event 2 Description" },
    { time: "12:00", title: "Event 3", description: "Event 3 Description" },
    { time: "14:00", title: "Event 4", description: "Event 4 Description" },
    { time: "16:30", title: "Event 5", description: "Event 5 Description" },
  ];

  return (
    <Wrapper>
      <Header isBack={true} />
      <View className="mt-5">
        <FileUpload setFile={setFile} />
      </View>

      <Pressable
        className="p-4 rounded-xl mt-10 animate-bounce"
        style={{
          backgroundColor: colors.secondary,
        }}
        onPress={() => setStep(step + 1)}
      >
        <Text className="text-white font-bold text-xl text-center">
          Process
        </Text>
      </Pressable>

      {/* Render result */}
      <Animated.View
        className="bg absolute -bottom-10 rounded-3xl w-screen"
        style={[{ height: slideAnim, backgroundColor: colors.tertiary }]}
      >
        {/* Content within the sliding component */}
        <View className="px-7 pt-5">
          {/* Title */}
          <View className="mt-2">
            <Text className="font-bold text-xl">
              Effortlessly extract images from
            </Text>
            <Text
              className="font-bold text-xl"
              style={{
                color: colors.secondary,
              }}
            >
              your PDF files
            </Text>
          </View>
          {/* Timeline */}
          <View className="my-14">{step && <TimeLine step={step} />}</View>
          <View className="">
            <Text className="font-bold text-2xl">
              Step {step} of {step === 1 ? 3 : step === 2 ? 3 : 3}
            </Text>
            <Text className="font-bold text-slate-500 text-xl mt-1 underline">
              {step === 1
                ? "Upload your PDF File"
                : step === 2
                ? "Extracting Images"
                : "Share The Images"}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Wrapper>
  );
};

export default ExtractImagesScreen;
