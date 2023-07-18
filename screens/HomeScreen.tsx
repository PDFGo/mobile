import React, { FC, useEffect } from "react";
import { View, Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import Wrapper from "../components/Wrapper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";
import Card from "../components/Home/Card";
import { HomeScreenCards } from "../lib/constants";
import colors from "../lib/colors";
import Storage from "../components/Home/Storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Header from "../components/Header";

const { width } = Dimensions.get("window");

type IProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: FC<IProps> = ({ navigation }) => {
  const [storage, setStorage] = React.useState({
    total: 0,
    avalable: 0,
    used: 0,
  });

  const getStorageData = async () => {
    let total = await FileSystem.getTotalDiskCapacityAsync();
    let avalable = await FileSystem.getFreeDiskStorageAsync();
    let used = total - avalable;

    total = total / (1024 * 1024 * 1024);
    avalable = avalable / (1024 * 1024 * 1024);
    used = used / (1024 * 1024 * 1024);

    setStorage({ total, avalable, used });
  };

  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <Wrapper>
      {/* Header */}
      <Header isBack={false} />
      {/* Main Content */}
      <View className="mt-0">
        {/* Cards */}
        <View className="py-6 z-100">
          <FlatGrid
            scrollEnabled={false}
            itemDimension={width < 500 ? 130 : 300}
            data={HomeScreenCards}
            spacing={width < 500 ? 0 : 10}
            renderItem={({ item, index }) => (
              <Card
                index={index}
                key={index}
                icon={item.icon}
                title={item.title}
                color={item.color}
                route={item.route}
                // @ts-ignore
                onPress={() => navigation.navigate(item.route)}
              />
            )}
          />
        </View>

        {/* Storage */}
        {storage && <Storage storage={storage} />}
      </View>
      {/* Scanner */}
      <View className="absolute bottom-5  w-screen flex items-center shadow">
        <View
          className="rounded-full p-6 w-22 h-22 items-center justify-center justify-items-center"
          style={{
            backgroundColor: colors.secondary,
          }}
        >
          {/* <Text className="text-gray-500">Scan</Text> */}
          <MaterialCommunityIcons
            name="magnify-scan"
            size={44}
            color={colors.primary}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default HomeScreen;
