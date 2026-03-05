export type PhotoDTO = {
  id: string;
  filePath: string;
  uploaderName: string | null;
  url: string;
  createdAt: string;
};

export type GuestbookMessageDTO = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};
