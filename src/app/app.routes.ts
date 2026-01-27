import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'button', pathMatch: 'full' },

    // Form Controls
    { path: 'autocomplete', loadComponent: () => import('./showcases/autocomplete/autocomplete-showcase.component').then(m => m.AutocompleteShowcaseComponent) },
    { path: 'checkbox', loadComponent: () => import('./showcases/checkbox/checkbox-showcase.component').then(m => m.CheckboxShowcaseComponent) },
    { path: 'datepicker', loadComponent: () => import('./showcases/datepicker/datepicker-showcase.component').then(m => m.DatepickerShowcaseComponent) },
    { path: 'radio', loadComponent: () => import('./showcases/radio/radio-showcase.component').then(m => m.RadioShowcaseComponent) },
    { path: 'select', loadComponent: () => import('./showcases/select/select-showcase.component').then(m => m.SelectShowcaseComponent) },
    { path: 'slider', loadComponent: () => import('./showcases/slider/slider-showcase.component').then(m => m.SliderShowcaseComponent) },

    // Buttons & Indicators
    { path: 'button', loadComponent: () => import('./showcases/button/button-showcase.component').then(m => m.ButtonShowcaseComponent) },
    { path: 'chips', loadComponent: () => import('./showcases/chips/chips-showcase.component').then(m => m.ChipsShowcaseComponent) },
    { path: 'progress', loadComponent: () => import('./showcases/progress-bar/progress-bar-showcase.component').then(m => m.ProgressBarShowcaseComponent) },

    // Layout
    { path: 'card', loadComponent: () => import('./showcases/card/card-showcase.component').then(m => m.CardShowcaseComponent) },
    { path: 'expansion-panel', loadComponent: () => import('./showcases/expansion-panel/expansion-panel-showcase.component').then(m => m.ExpansionPanelShowcaseComponent) },
    { path: 'grid-list', loadComponent: () => import('./showcases/grid-list/grid-list-showcase.component').then(m => m.GridListShowcaseComponent) },
    { path: 'list', loadComponent: () => import('./showcases/list/list-showcase.component').then(m => m.ListShowcaseComponent) },
    { path: 'tabs', loadComponent: () => import('./showcases/tabs/tabs-showcase.component').then(m => m.TabsShowcaseComponent) },
    { path: 'tree', loadComponent: () => import('./showcases/tree/tree-showcase.component').then(m => m.TreeShowcaseComponent) },

    // Navigation
    { path: 'menu', loadComponent: () => import('./showcases/menu/menu-showcase.component').then(m => m.MenuShowcaseComponent) },

    // Popups & Modals
    { path: 'dialog', loadComponent: () => import('./showcases/dialog/dialog-showcase.component').then(m => m.DialogShowcaseComponent) },
    { path: 'tooltip', loadComponent: () => import('./showcases/tooltip/tooltip-showcase.component').then(m => m.TooltipShowcaseComponent) },

    // Data Table
    { path: 'table', loadComponent: () => import('./showcases/table/table-showcase.component').then(m => m.TableShowcaseComponent) },

    // Data Visualization
    { path: 'charts', loadComponent: () => import('./showcases/charts/charts-showcase.component').then(m => m.ChartsShowcaseComponent) },
    { path: 'chartjs', loadComponent: () => import('./showcases/chartjs/chartjs-showcase.component').then(m => m.ChartjsShowcaseComponent) },
    { path: 'd3', loadComponent: () => import('./showcases/d3/d3-showcase.component').then(m => m.D3ShowcaseComponent) },
    { path: 'apex', loadComponent: () => import('./showcases/apex/apex-showcase.component').then(m => m.ApexShowcaseComponent) },

    { path: '**', redirectTo: 'button' }
];
