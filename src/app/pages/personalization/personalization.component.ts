import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-personalization',
  imports: [RouterLink],
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.scss',
})
export class PersonalizationComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage(
      'Personnalisation — Votre identité, notre savoir-faire',
      'Broderie ton sur ton ou couleur pour vos tenues professionnelles. Intégrez votre logo sur chemises, costumes, tabliers et vestes chef.'
    );
  }
}
