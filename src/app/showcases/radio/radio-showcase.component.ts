import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-radio-showcase',
    standalone: true,
    imports: [CommonModule, FormsModule, MatCardModule, MatRadioModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './radio-showcase.component.html',
    styleUrl: './radio-showcase.component.scss'
})
export class RadioShowcaseComponent {
    selectedValue = 'option1';
    selectedSeason = 'summer';

    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }

    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }

    codes: Record<string, string> = {
        'basic': `<mat-radio-group [(ngModel)]="selectedValue">
  <mat-radio-button value="option1">Option 1</mat-radio-button>
  <mat-radio-button value="option2">Option 2</mat-radio-button>
  <mat-radio-button value="option3">Option 3</mat-radio-button>
</mat-radio-group>`,
        'colors': `<mat-radio-group>
  <mat-radio-button color="primary" value="1">Primary</mat-radio-button>
  <mat-radio-button color="accent" value="2">Accent</mat-radio-button>
  <mat-radio-button color="warn" value="3">Warn</mat-radio-button>
</mat-radio-group>`,
        'label-position': `<mat-radio-group>
  <mat-radio-button labelPosition="before">Label before</mat-radio-button>
  <mat-radio-button labelPosition="after">Label after</mat-radio-button>
</mat-radio-group>`
    };
}
