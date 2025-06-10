export type BrandResponse = {
  id: string;
  name: string;
  slug: string;
};

export type CategoryResponse = {
  id: string;
  parent_id: string;
  name: string;
  slug: string;
  sub_categories: string[];
};

export type ProductImageResponse = {
  id: string;
  by_name: string;
  by_url: string;
  source_name: string;
  source_url: string;
  file_name: string;
};
