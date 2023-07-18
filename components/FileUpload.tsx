import { View, Button, Pressable, Text, Image } from "react-native";
import React, { FC } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { IFile } from "../types";
import colors from "../lib/colors";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  setFile: (file: IFile) => void;
}

const FileUpload: FC<IProps> = ({ setFile }) => {
  const handleUploadPDF = async () => {
    // Check permissions
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    // Open document picker
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (file.type === "success") {
        const { uri, name, mimeType, size } = file;
        let base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setFile({
          uri,
          size,
          name,
          mimeType,
          base64,
        });
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };
  return (
    <View className="mt-1">
      <Text className="mb-5 text-xl">
        Upload 
        <Text className="font-semibold"> File</Text>
      </Text>
      <Pressable
        className="border-dashed border-slate-400 border py-8 justify-center items-center bg-slate-50"
        onPress={handleUploadPDF}
      >
        <Ionicons name="cloud-upload-outline" size={34} color="gray" />
        <Text className="font-semibold mt-5 text-slate-500">
          Select a PDF file to upload
        </Text>
        <Text className="text-slate-500 text-xs my-1">
          {"("}Maximum file size is 25MB{")"}
        </Text>
      </Pressable>
    </View>
  );
};

export default FileUpload;
