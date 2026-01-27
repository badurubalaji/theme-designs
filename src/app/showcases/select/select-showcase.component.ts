import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-select-showcase',
    standalone: true,
    imports: [CommonModule, FormsModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './select-showcase.component.html',
    styleUrl: './select-showcase.component.scss'
})
export class SelectShowcaseComponent {
    selected = '';
    multiSelected: string[] = [];
    foods = [
        { value: 'pizza', viewValue: 'Pizza' },
        { value: 'burger', viewValue: 'Burger' },
        { value: 'tacos', viewValue: 'Tacos' },
        { value: 'pasta', viewValue: 'Pasta' },
    ];
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-form-field appearance="outline">
  <mat-label>Favorite food</mat-label>
  <mat-select [(ngModel)]="selected">
    @for (food of foods; track food.value) {
      <mat-option [value]="food.value">{{food.viewValue}}</mat-option>
    }
  </mat-select>
</mat-form-field>`,
        'multiple': `<mat-form-field appearance="outline">
  <mat-label>Toppings</mat-label>
  <mat-select multiple [(ngModel)]="toppings">
    <mat-option value="cheese">Cheese</mat-option>
    <mat-option value="mushroom">Mushroom</mat-option>
    <mat-option value="pepperoni">Pepperoni</mat-option>
  </mat-select>
</mat-form-field>`,
        'groups': `<mat-form-field appearance="outline">
  <mat-label>Pokemon</mat-label>
  <mat-select>
    <mat-optgroup label="Grass">
      <mat-option value="bulbasaur">Bulbasaur</mat-option>
    </mat-optgroup>
    <mat-optgroup label="Water">
      <mat-option value="squirtle">Squirtle</mat-option>
    </mat-optgroup>
  </mat-select>
</mat-form-field>`
    };
}
