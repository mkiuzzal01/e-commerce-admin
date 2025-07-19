export type TFolder = {
  _id: string;
  name: string;
};

export type TImage = {
  _id: string;
  folderId?: string;
  photoName: string;
  photo:{
    url: string;
    publicId: string;
  }
  isDeleted: boolean;
};
