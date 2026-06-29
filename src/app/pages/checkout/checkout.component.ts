import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { SeoService } from '../../core/services/seo.service';
import { OrderPayload } from '../../core/models/product.model';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  customerName = '';
  email = '';
  phone = '';
  company = '';
  message = '';
  submitting = false;
  success = false;
  error = '';

  ngOnInit(): void {
    this.seo.setPage('Commander', 'Finalisez votre commande de tenues professionnelles ALLURE WORKPRO.');
    if (this.cart.isEmpty()) {
      this.router.navigate(['/panier']);
    }
  }

  submit(): void {
    if (!this.customerName || !this.email || !this.phone) {
      this.error = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const payload: OrderPayload = {
      customerName: this.customerName,
      email: this.email,
      phone: this.phone,
      company: this.company || undefined,
      message: this.message || undefined,
      items: this.cart.cartItems().map((item) => ({
        productName: `${item.product.name} — ${item.product.subtitle}`,
        size: item.size,
        quantity: item.quantity,
        personalization: item.personalization?.enabled
          ? `${item.personalization.type} · ${item.personalization.placement}${item.personalization.logoNote ? ' · ' + item.personalization.logoNote : ''}`
          : undefined,
      })),
    };

    this.submitting = true;
    this.error = '';

    this.orders.submitOrder(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        if (res.success) {
          this.success = true;
          this.cart.clear();
        } else {
          this.error = res.message;
        }
      },
      error: () => {
        this.submitting = false;
        this.error = 'Erreur lors de l\'envoi. Vérifiez que le serveur est démarré ou contactez-nous par email.';
      },
    });
  }
}
