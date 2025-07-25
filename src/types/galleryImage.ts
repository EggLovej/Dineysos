export interface GalleryImage {
  _id: string;
  imageUrl: string;
  width: number;
  height: number;
  description: {
    de?: string;
    en?: string;
  };
  order?: number;
}
