export interface Category {
  categoryId: number;
  name: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}
