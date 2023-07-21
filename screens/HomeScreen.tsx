import React, { FC, useEffect } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import Wrapper from "../components/Wrapper";
import { FlatGrid } from "react-native-super-grid";
import Card from "../components/Home/Card";
import { HomeScreenCards } from "../lib/constants";
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
      <ScrollView showsVerticalScrollIndicator={false} >
        <Header isBack={false} />
        {/* Main Content */}
        <View className="mt-0">
          {/* Cards */}
          <View className="py-6 z-100">
            <FlatGrid
              scrollEnabled={false}
              itemDimension={width < 500 ? 120 : 300}
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
      </ScrollView>
    </Wrapper>
  );
};

export default HomeScreen;
