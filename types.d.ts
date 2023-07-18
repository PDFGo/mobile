export type RootStackParamList = {
  Home;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
};

export interface IFile {
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  base64: string;
}
