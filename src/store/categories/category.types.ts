export enum CATEGORIES_ACTION_TYPES {
  // SET_CATEGORIES = "category/SET_CATEGORIES",
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

export type CategoryItem = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  tile: string;
  imageUrl: string;
  items: CategoryItem[];
};