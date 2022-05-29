export interface categoryInterface {
  name: string;
  _id: string;
}

export interface getCategoriesResponse {
  status: string;
  success: boolean;
  categories: [categoryInterface];
}
