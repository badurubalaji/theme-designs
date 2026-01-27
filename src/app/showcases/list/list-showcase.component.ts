import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-list-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatExpansionModule, MatDividerModule, MatSnackBarModule],
    templateUrl: './list-showcase.component.html',
    styleUrl: './list-showcase.component.scss'
})
export class ListShowcaseComponent {
    folders = [
        { name: 'Photos', updated: 'Jan 28, 2024' },
        { name: 'Recipes', updated: 'Jan 26, 2024' },
        { name: 'Work', updated: 'Jan 25, 2024' },
    ];
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-list>
  <mat-list-item>Item 1</mat-list-item>
  <mat-list-item>Item 2</mat-list-item>
  <mat-list-item>Item 3</mat-list-item>
</mat-list>`,
        'icons': `<mat-list>
  <mat-list-item>
    <mat-icon matListItemIcon>folder</mat-icon>
    <span matListItemTitle>Photos</span>
    <span matListItemLine>Jan 28, 2024</span>
  </mat-list-item>
</mat-list>`
    };
}
