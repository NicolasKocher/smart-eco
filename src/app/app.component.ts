import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'smart-eco';
  currentYear = new Date().getFullYear();

  private carouselInterval: any;
  currentSlide = 0;
  totalSlides = 3;
  selectedSize = '500ml';
  isMobileMenuOpen = false;
  // Preisübersicht nach Größe
  prices: Record<string, { original: string; sale: string }> = {
    '500ml': { original: '89,99€', sale: '64,99€' },
    '1L': { original: '99,99€', sale: '74,99€' },
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only start carousel in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
    }
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent body scroll when menu is open
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;

    // Restore body scroll
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  private startCarousel() {
    if (isPlatformBrowser(this.platformId)) {
      this.carouselInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      }, 4000);
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;

    // Reset timer only in browser
    if (isPlatformBrowser(this.platformId) && this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      }, 4000);
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }
}
