import { Pressable, Text } from "react-native";
import React, { FC, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { IFile } from "../../types";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  setFile: (file: IFile) => void;
  setStep: (step: number) => void;
}

const FileUpload: FC<IProps> = ({ setFile, setStep }) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleUploadPDF = async () => {
    // Open document picker
    setIsSelecting(true);
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (file.type === "success") {
        const { uri, name, mimeType, size } = file;
        let base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });

        setFile({
          uri,
          size,
          name,
          mimeType,
          base64,
        });
        setStep(2);
      }
      setIsSelecting(false);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setIsSelecting(false);
    }
  };
  return (
    <Pressable
      disabled={isSelecting}
      className={`border-dashed h-40 ${
        isSelecting && "opacity-50"
      } rounded-2xl border-slate-400 border py-8 justify-center items-center bg-slate-50`}
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
  );
};

export default FileUpload;
