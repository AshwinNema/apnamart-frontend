export interface uploadedImgDetails {
  url: string;
  cloudinary_public_id: string;
}

interface keyValDetails {
  id: string;
  key: string;
  val: string;
}

interface descriptionStage {
  id: string;
  header?: string;
  details: string | keyValDetails[];
  photo?: uploadedImgDetails;
}

interface specification {
  id: string;
  header?: string;
  keyVals: keyValDetails[];
}

interface categoryDetails {
  id: number;
  name: string;
}

interface subCategoryDetails {
  id: number;
  name: string;
}

interface itemDetails {
  id: number;
  name: string;
  category: categoryDetails;
  subCategory: subCategoryDetails;
}

export interface descriptionDetails {
  details: string | descriptionStage[];
}

export interface queriedProduct {
  id: number;
  name: string;
  price: number;
  photos: uploadedImgDetails[];
  description: descriptionDetails;
  specification: string | specification[];
  itemId: number;
  merchant: number;
  available: boolean;
  item: itemDetails;
  highlights: string[];
}
