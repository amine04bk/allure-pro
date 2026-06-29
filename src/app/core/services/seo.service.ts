import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly siteName = 'ALLURE WORKPRO';
  private readonly defaultDescription =
    'Tenues professionnelles de luxe pour la restauration. Élégance, confort et performance — L\'élégance dans les détails.';

  setPage(title: string, description?: string, image?: string, url?: string): void {
    const fullTitle = title.includes(this.siteName) ? title : `${title} | ${this.siteName}`;
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description || this.defaultDescription });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description || this.defaultDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    if (image) this.meta.updateTag({ property: 'og:image', content: image });
    if (url) this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description || this.defaultDescription });
  }

  setProduct(product: Product): void {
    const description = `${product.description} ${product.subtitle}. À partir de ${product.priceFrom}€.`;
    this.setPage(
      `${product.name} — ${product.subtitle}`,
      description,
      product.heroImage
    );
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.heroImage,
      brand: { '@type': 'Brand', name: 'ALLURE WORKPRO' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: product.priceFrom,
        availability: 'https://schema.org/InStock',
      },
    });
  }

  private setJsonLd(data: object): void {
    let script = document.querySelector('script[data-seo-jsonld]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-jsonld', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
