import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import FileUpload from "../components/Interface/FileUpload";
import { IFile } from "../types";
import colors from "../lib/colors";
import FileView from "../components/Interface/FileView";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import Lottie from "lottie-react-native";

const ExtractImagesScreen = () => {
  const [file, setFile] = useState<IFile | null>(null);
  const [result, setResult] = useState<boolean>();
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const stepViewRef = useRef<any>(null);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResult(true);
      setStep(3);
    }, 2000);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue:
        Dimensions.get("window").height /
        (result
          ? Platform.OS === "ios"
            ? 1.18
            : 1.1
          : Platform.OS === "ios"
          ? 2.6
          : 2.4),
      duration: 500, // Duration set to 1 second (1000 milliseconds)
      useNativeDriver: false,
    }).start();
  }, [result]);

  useEffect(() => {
    if (step === 3) {
      stepViewRef.current?.animate({ 0: { scale: 1 }, 1: { scale: 0.8 } });
    } else {
      stepViewRef.current?.animate({ 0: { scale: 1 }, 1: { scale: 1 } });
    }
  }, [step]);

  return (
    <Wrapper>
      <Header isBack={true} />
      <View className="mt-6">
        <Text className="mb-5 text-xl">
          Upload
          <Text className="font-semibold"> File</Text>
        </Text>
        {!file ? (
          <FileUpload setStep={setStep} setFile={setFile} />
        ) : (
          <>
            <FileView file={file} />
            <Pressable
              className="items-center absolute bottom-4 right-4"
              onPress={() => {
                setFile(null);
                setStep(1);
              }}
            >
              <Ionicons
                name="trash-bin-sharp"
                size={25}
                color={colors.secondary}
              />
            </Pressable>
          </>
        )}
      </View>

      {/* Process button */}
      <Pressable
        className={`rounded-xl flex items-center justify-center mt-12 h-14 animate-bounce ${
          isProcessing && "opacity-80"
        }`}
        onPress={handleProcess}
        disabled={isProcessing}
        style={{
          backgroundColor: colors.secondary,
        }}
      >
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text className="text-white font-bold text-xl text-center">
            Process
          </Text>
        )}
      </Pressable>

      {/* Render result */}
      <Animated.View
        className="bg absolute -bottom-10 rounded-3xl w-screen"
        style={[{ height: slideAnim, backgroundColor: colors.tertiary }]}
      >
        {/* Content within the sliding component */}
        <View className="px-7 pt-5">
          {/* Step */}
          <View className="mt-0">
            <Text className="font-bold text-2xl mb-2">
              Step {step} <Text className="text-2xl font-medium">of</Text>{" "}
              {step === 1 ? 3 : step === 2 ? 3 : 3}
            </Text>
            <Progress.Bar
              unfilledColor={colors.primary}
              color={colors.secondary}
              progress={step === 1 ? 0.1 : step === 2 ? 0.4 : 1 / 1}
              borderWidth={0}
            />
          </View>

          {/* Title */}
          <View className={`mt-4`}>
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
            {/* <View className="flex items-center justify-items-center mt-10">
              <Lottie
                source={require("../assets/animation/button-loader.json")}
                loop
                autoPlay
                style={{
                  width: 300,
                }}
              />
            </View> */}
          </View>
        </View>
      </Animated.View>
    </Wrapper>
  );
};

export default ExtractImagesScreen;
