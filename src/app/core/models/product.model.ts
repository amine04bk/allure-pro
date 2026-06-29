export type ProductCategory = 'responsable-salle' | 'chef' | 'tabliers';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductDetail {
  title: string;
  image: string;
}

export interface SizeRow {
  size: string;
  values: string[];
}

export interface SizeGuide {
  headers: string[];
  rows: SizeRow[];
  tip?: string;
}

export interface PersonalizationOption {
  type: string;
  placements: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  gender?: 'homme' | 'femme' | 'unisex';
  description: string;
  keywords: string[];
  priceFrom: number;
  heroImage: string;
  viewsImage: string;
  gallery: string[];
  details: ProductDetail[];
  specs: ProductSpec[];
  features: ProductFeature[];
  sizeGuide?: SizeGuide;
  dimensions?: ProductSpec[];
  personalization: PersonalizationOption;
  care: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  personalization?: {
    enabled: boolean;
    type: string;
    placement: string;
    logoNote: string;
  };
}

export interface OrderPayload {
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  items: {
    productName: string;
    size: string;
    quantity: number;
    personalization?: string;
  }[];
}
