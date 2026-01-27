import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-chips-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './chips-showcase.component.html',
    styleUrl: './chips-showcase.component.scss'
})
export class ChipsShowcaseComponent {
    selectedChips: string[] = ['Angular'];
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-chip-set>
  <mat-chip>Angular</mat-chip>
  <mat-chip>React</mat-chip>
  <mat-chip>Vue</mat-chip>
</mat-chip-set>`,
        'colors': `<mat-chip-set>
  <mat-chip highlighted>Default</mat-chip>
  <mat-chip color="primary" highlighted>Primary</mat-chip>
  <mat-chip color="accent" highlighted>Accent</mat-chip>
  <mat-chip color="warn" highlighted>Warn</mat-chip>
</mat-chip-set>`,
        'removable': `<mat-chip-set>
  <mat-chip>
    Removable
    <button matChipRemove><mat-icon>cancel</mat-icon></button>
  </mat-chip>
</mat-chip-set>`
    };
}
