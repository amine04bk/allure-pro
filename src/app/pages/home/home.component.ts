import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/services/seo.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly products = inject(ProductService);
  private readonly seo = inject(SeoService);

  readonly featured = this.products.getAll().slice(0, 4);

  ngOnInit(): void {
    this.seo.setPage(
      'ALLURE WORKPRO — Tenues Professionnelles Restauration',
      'Tenues professionnelles de luxe pour chef, responsable de salle, serveur et bar. Élégance, confort et performance. Personnalisation sur mesure.'
    );
  }
}
