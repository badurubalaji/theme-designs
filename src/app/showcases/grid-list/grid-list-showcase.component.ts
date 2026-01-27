import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-grid-list-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule, MatButtonModule, MatExpansionModule, MatSnackBarModule],
    templateUrl: './grid-list-showcase.component.html',
    styleUrl: './grid-list-showcase.component.scss'
})
export class GridListShowcaseComponent {
    tiles = [
        { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
        { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
        { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
        { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
    ];

    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }

    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }

    codes: Record<string, string> = {
        'basic': `<mat-grid-list cols="4" rowHeight="100px">
  <mat-grid-tile>1</mat-grid-tile>
  <mat-grid-tile>2</mat-grid-tile>
  <mat-grid-tile>3</mat-grid-tile>
  <mat-grid-tile>4</mat-grid-tile>
</mat-grid-list>`,
        'dynamic': `<mat-grid-list cols="4" rowHeight="100px">
  @for (tile of tiles; track tile.text) {
    <mat-grid-tile [colspan]="tile.cols" [rowspan]="tile.rows"
                   [style.background]="tile.color">
      {{tile.text}}
    </mat-grid-tile>
  }
</mat-grid-list>`
    };
}
