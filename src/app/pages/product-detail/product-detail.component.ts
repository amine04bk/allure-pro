import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { SeoService } from '../../core/services/seo.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, FormsModule, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly seo = inject(SeoService);

  product: Product | undefined;
  related: Product[] = [];
  activeImage = signal(0);
  selectedSize = '';
  quantity = 1;
  personalize = false;
  personalizationType = '';
  personalizationPlacement = '';
  logoNote = '';
  addedToCart = false;
  showSizeGuide = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) return;
      this.product = this.products.getBySlug(slug);
      if (!this.product) {
        this.router.navigate(['/catalogue']);
        return;
      }
      this.seo.setProduct(this.product);
      this.related = this.products.getRelated(this.product);
      this.activeImage.set(0);
      this.selectedSize = this.getSizes()[0] || 'Taille unique';
      this.personalizationType = this.product.personalization.type;
      this.personalizationPlacement = this.product.personalization.placements[0];
      this.addedToCart = false;
    });
  }

  getSizes(): string[] {
    if (!this.product?.sizeGuide) return ['Taille unique'];
    return this.product.sizeGuide.rows.map((r) => r.size);
  }

  setImage(index: number): void {
    this.activeImage.set(index);
  }

  addToCart(): void {
    if (!this.product) return;
    this.cart.addItem(
      this.product,
      this.selectedSize,
      this.quantity,
      this.personalize
        ? {
            enabled: true,
            type: this.personalizationType,
            placement: this.personalizationPlacement,
            logoNote: this.logoNote,
          }
        : undefined
    );
    this.addedToCart = true;
    setTimeout(() => (this.addedToCart = false), 3000);
  }
}
