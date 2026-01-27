import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-menu-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatExpansionModule, MatDividerModule, MatSnackBarModule],
    templateUrl: './menu-showcase.component.html',
    styleUrl: './menu-showcase.component.scss'
})
export class MenuShowcaseComponent {
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<button mat-button [matMenuTriggerFor]="menu">Menu</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Item 1</button>
  <button mat-menu-item>Item 2</button>
  <button mat-menu-item>Item 3</button>
</mat-menu>`,
        'icons': `<button mat-icon-button [matMenuTriggerFor]="menu">
  <mat-icon>more_vert</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item><mat-icon>edit</mat-icon>Edit</button>
  <button mat-menu-item><mat-icon>delete</mat-icon>Delete</button>
</mat-menu>`
    };
}
