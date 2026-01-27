import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    grid: string;
    isDark: boolean;
    chartColors: string[];
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private activeThemeSubject = new BehaviorSubject<string>('material');
    activeTheme$ = this.activeThemeSubject.asObservable();

    // Color palettes for each theme
    private palettes: { [key: string]: ThemeColors } = {
        minimal: {
            primary: '#000000',
            secondary: '#666666',
            background: '#ffffff',
            text: '#333333',
            grid: '#eeeeee',
            isDark: false,
            chartColors: ['#000000', '#333333', '#666666', '#999999', '#cccccc']
        },
        glassmorphism: {
            primary: 'rgba(255, 255, 255, 0.8)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            background: 'transparent',
            text: '#ffffff',
            grid: 'rgba(255, 255, 255, 0.1)',
            isDark: true,
            chartColors: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#d299c2'] // Pastels
        },
        neumorphism: {
            primary: '#e0e5ec',
            secondary: '#a3b1c6',
            background: '#e0e5ec',
            text: '#4d5b6b',
            grid: '#d1d9e6',
            isDark: false,
            chartColors: ['#6d7fcc', '#5b6bbd', '#4a56ad', '#38429e', '#272e8f']
        },
        futuristic: {
            primary: '#4fc3f7',
            secondary: '#9575cd',
            background: '#141923',
            text: '#e8e8e8',
            grid: 'rgba(255, 255, 255, 0.05)',
            isDark: true,
            chartColors: ['#4fc3f7', '#9575cd', '#66bb6a', '#f06292', '#ffb74d'] // Neon
        },
        flat: {
            primary: '#3498db',
            secondary: '#2ecc71',
            background: '#ecf0f1',
            text: '#2c3e50',
            grid: '#bdc3c7',
            isDark: false,
            chartColors: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6']
        },
        material: {
            primary: '#3f51b5',
            secondary: '#ff4081',
            background: '#fafafa',
            text: '#212121',
            grid: '#e0e0e0',
            isDark: false,
            chartColors: ['#3f51b5', '#ff4081', '#009688', '#ffc107', '#ff5722']
        },
        crystal: {
            primary: '#00d2ff',
            secondary: '#3a7bd5',
            background: '#0f2027',
            text: '#ffffff',
            grid: 'rgba(255, 255, 255, 0.1)',
            isDark: true,
            chartColors: ['#00d2ff', '#3a7bd5', '#ffffff', '#00d2ff50', '#3a7bd550']
        }
    };

    /**
     * Update the active theme
     * This is called by the main App component when theme changes
     */
    setTheme(themeName: string) {
        this.activeThemeSubject.next(themeName);
    }

    /**
     * Get colors for a specific theme or the current one
     */
    getColors(themeName?: string): ThemeColors {
        const theme = themeName || this.activeThemeSubject.value;
        return this.palettes[theme] || this.palettes['material'];
    }
}
