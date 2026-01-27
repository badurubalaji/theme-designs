import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-card-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule, MatDividerModule, MatChipsModule],
    templateUrl: './card-showcase.component.html',
    styleUrl: './card-showcase.component.scss'
})
export class CardShowcaseComponent {
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-card>
  <mat-card-header>
    <mat-card-title>Card Title</mat-card-title>
    <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>This is the card content.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>SHARE</button>
    <button mat-button>LEARN MORE</button>
  </mat-card-actions>
</mat-card>`,
        'image': `<mat-card>
  <img mat-card-image src="image.jpg" alt="Photo">
  <mat-card-content>
    <p>Description text</p>
  </mat-card-content>
</mat-card>`,
        'appearance': `<mat-card appearance="outlined">Outlined Card</mat-card>
<mat-card appearance="raised">Raised Card</mat-card>`
    };
}
