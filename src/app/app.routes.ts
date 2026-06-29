import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PersonalizationComponent } from './pages/personalization/personalization.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ALLURE WORKPRO — Tenues Professionnelles' },
  { path: 'catalogue', component: CatalogComponent, title: 'Catalogue' },
  { path: 'catalogue/:category', component: CatalogComponent },
  { path: 'produit/:slug', component: ProductDetailComponent },
  { path: 'panier', component: CartComponent, title: 'Panier' },
  { path: 'commander', component: CheckoutComponent, title: 'Commander' },
  { path: 'personnalisation', component: PersonalizationComponent, title: 'Personnalisation' },
  { path: '**', redirectTo: '' },
];
