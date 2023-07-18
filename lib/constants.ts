import { IHomeScreenCard } from "./constants.types";

export const HomeScreenCards: IHomeScreenCard[] = [
  {
    title: "Pdf Reader",
    icon: "file-pdf",
    color: "red",
    route: "PdfReader",
  },
  {
    title: "Extract Images",
    icon: "file-image",
    color: "#ff8c00",
    route: "ExtractImages",
  },
  {
    title: "Pdf to Word",
    icon: "file-word",
    color: "skyblue",
    route: "PdfToWord",
  },
  {
    title: "Pdf to Excel",
    icon: "file-excel",
    color: "green",
    route: "PdfToExcel",
  }
];
