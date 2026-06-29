import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';
import { PRODUCTS } from '../data/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = PRODUCTS;

  getAll(): Product[] {
    return this.products;
  }

  getBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  getByCategory(category: ProductCategory): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  getRelated(product: Product, limit = 3): Product[] {
    return this.products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }
}
