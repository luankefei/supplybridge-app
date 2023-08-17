export const FILE_TYPE_ICON = {
  "image/png": "img.svg",
  "image/jpeg": "img.svg",
  "image/gif": "img.svg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "word.svg",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "excel.svg",
  "application/zip": "zip.svg",
  "application/pdf": "pdf.svg",
};
export type FILE_MIME = keyof typeof FILE_TYPE_ICON;
