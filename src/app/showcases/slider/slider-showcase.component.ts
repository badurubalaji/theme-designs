import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-slider-showcase',
    standalone: true,
    imports: [CommonModule, FormsModule, MatCardModule, MatSliderModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './slider-showcase.component.html',
    styleUrl: './slider-showcase.component.scss'
})
export class SliderShowcaseComponent {
    value = 50;
    rangeStart = 25;
    rangeEnd = 75;
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-slider min="0" max="100" step="1">
  <input matSliderThumb [(ngModel)]="value">
</mat-slider>`,
        'discrete': `<mat-slider min="0" max="100" step="10" discrete showTickMarks>
  <input matSliderThumb>
</mat-slider>`,
        'range': `<mat-slider min="0" max="100">
  <input matSliderStartThumb [(ngModel)]="start">
  <input matSliderEndThumb [(ngModel)]="end">
</mat-slider>`
    };
}
