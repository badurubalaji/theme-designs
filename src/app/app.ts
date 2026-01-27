import { Component, signal, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from './services/theme.service';

interface ComponentCategory { name: string; icon: string; components: { name: string; route: string; }[]; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatSelectModule, MatFormFieldModule, MatTooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  themes = [
    { value: 'material', label: 'Material 3', icon: 'palette' },
    { value: 'neumorphism', label: 'Neumorphism', icon: 'blur_on' },
    { value: 'glassmorphism', label: 'Glassmorphism', icon: 'blur_circular' },
    { value: 'crystal', label: 'Crystal', icon: 'diamond' },
    { value: 'flat', label: 'Flat', icon: 'crop_square' },
    { value: 'minimal', label: 'Minimal', icon: 'minimize' },
    { value: 'futuristic', label: 'Futuristic', icon: 'rocket_launch' },
  ];

  categories: ComponentCategory[] = [
    {
      name: 'Form Controls',
      icon: 'edit',
      components: [
        { name: 'Autocomplete', route: 'autocomplete' },
        { name: 'Checkbox', route: 'checkbox' },
        { name: 'Datepicker', route: 'datepicker' },
        { name: 'Radio', route: 'radio' },
        { name: 'Select', route: 'select' },
        { name: 'Slider', route: 'slider' },
      ]
    },
    {
      name: 'Buttons & Indicators',
      icon: 'smart_button',
      components: [
        { name: 'Button', route: 'button' },
        { name: 'Chips', route: 'chips' },
        { name: 'Progress', route: 'progress' },
      ]
    },
    {
      name: 'Navigation',
      icon: 'navigation',
      components: [
        { name: 'Menu', route: 'menu' },
      ]
    },
    {
      name: 'Layout',
      icon: 'dashboard',
      components: [
        { name: 'Card', route: 'card' },
        { name: 'Expansion Panel', route: 'expansion-panel' },
        { name: 'Grid List', route: 'grid-list' },
        { name: 'List', route: 'list' },
        { name: 'Tabs', route: 'tabs' },
        { name: 'Tree', route: 'tree' },
      ]
    },
    {
      name: 'Popups & Modals',
      icon: 'open_in_new',
      components: [
        { name: 'Dialog', route: 'dialog' },
        { name: 'Tooltip', route: 'tooltip' },
      ]
    },
    {
      name: 'Data Table',
      icon: 'table_chart',
      components: [
        { name: 'Table', route: 'table' },
      ]
    },
    {
      name: 'Data Visualization',
      icon: 'bar_chart',
      components: [
        { name: 'Charts (ECharts)', route: 'charts' },
        { name: 'Charts (Chart.js)', route: 'chartjs' },
        { name: 'Charts (D3.js)', route: 'd3' },
        { name: 'Charts (Apex)', route: 'apex' }
      ]
    }
  ];

  selectedTheme = signal('material');
  darkMode = signal(false);
  mobileQuery: MediaQueryList;

  private isBrowser: boolean;
  private themeLink: HTMLLinkElement | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private router: Router, mediaMatcher: MediaMatcher, private themeService: ThemeService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 960px)');
  }

  ngOnInit() {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('selectedTheme') || 'material';
      this.selectedTheme.set(savedTheme);
      this.loadTheme(savedTheme);
    }
  }

  onThemeChange(theme: string) {
    this.selectedTheme.set(theme);
    if (this.isBrowser) localStorage.setItem('selectedTheme', theme);
    this.loadTheme(theme);
    this.themeService.setTheme(theme);
  }

  private loadTheme(themeName: string) {
    if (!this.isBrowser) return;
    if (this.themeLink) this.themeLink.remove();
    this.themeLink = document.createElement('link');
    this.themeLink.rel = 'stylesheet';
    this.themeLink.href = `${themeName}-theme.css`;
    this.themeLink.id = 'app-theme';
    document.head.appendChild(this.themeLink);
  }

  toggleDarkMode() {
    this.darkMode.update(v => !v);
    if (this.isBrowser) {
      document.documentElement.classList.toggle('dark-theme', this.darkMode());
      document.documentElement.setAttribute('data-theme', this.darkMode() ? 'dark' : 'light');
    }
  }

  toggleSidenav() { this.sidenav?.toggle(); }

  navigateTo(route: string) {
    this.router.navigate([route]);
    if (this.mobileQuery.matches) this.sidenav?.close();
  }

  isActiveRoute(route: string): boolean { return this.router.url === '/' + route; }
}
