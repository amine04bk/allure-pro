import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/services/seo.service';
import { Product, ProductCategory } from '../../core/models/product.model';
import { CATEGORIES } from '../../core/data/products.data';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly products = inject(ProductService);
  private readonly seo = inject(SeoService);

  readonly categories = CATEGORIES;
  items: Product[] = [];
  activeCategory: ProductCategory | null = null;
  pageTitle = 'Catalogue';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cat = params.get('category') as ProductCategory | null;
      this.activeCategory = cat;
      this.items = cat ? this.products.getByCategory(cat) : this.products.getAll();
      const catLabel = CATEGORIES.find((c) => c.id === cat)?.label;
      this.pageTitle = catLabel || 'Catalogue';
      this.seo.setPage(
        `${this.pageTitle} — ALLURE WORKPRO`,
        `Découvrez notre collection ${catLabel || 'complète'} de tenues professionnelles de luxe pour la restauration.`
      );
    });
  }
}
