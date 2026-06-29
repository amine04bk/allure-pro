import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>(this.loadFromStorage());

  readonly cartItems = this.items.asReadonly();
  readonly count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  readonly isEmpty = computed(() => this.items().length === 0);

  addItem(
    product: Product,
    size: string,
    quantity = 1,
    personalization?: CartItem['personalization']
  ): void {
    const existing = this.items().find(
      (i) =>
        i.product.id === product.id &&
        i.size === size &&
        JSON.stringify(i.personalization) === JSON.stringify(personalization)
    );

    if (existing) {
      this.items.update((items) =>
        items.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      this.items.update((items) => [
        ...items,
        { product, size, quantity, personalization },
      ]);
    }
    this.persist();
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(index);
      return;
    }
    this.items.update((items) =>
      items.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
    this.persist();
  }

  removeItem(index: number): void {
    this.items.update((items) => items.filter((_, i) => i !== index));
    this.persist();
  }

  clear(): void {
    this.items.set([]);
    this.persist();
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem('allure-cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem('allure-cart', JSON.stringify(this.items()));
  }
}
