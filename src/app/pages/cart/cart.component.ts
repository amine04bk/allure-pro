import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  readonly cart = inject(CartService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage('Panier', 'Votre sélection de tenues professionnelles ALLURE WORKPRO.');
  }

  remove(index: number): void {
    this.cart.removeItem(index);
  }

  updateQty(index: number, qty: number): void {
    this.cart.updateQuantity(index, qty);
  }
}
