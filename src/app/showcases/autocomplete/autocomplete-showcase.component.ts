import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-autocomplete-showcase',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatTabsModule,
        MatSnackBarModule,
    ],
    templateUrl: './autocomplete-showcase.component.html',
    styleUrl: './autocomplete-showcase.component.scss'
})
export class AutocompleteShowcaseComponent {
    // Filter autocomplete
    countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico'];
    filteredCountries = this.countries;
    countryInput = '';

    // Display value autocomplete
    users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com' },
    ];
    userCtrl = new FormControl('');

    constructor(
        private snackBar: MatSnackBar,
        private clipboard: Clipboard
    ) { }

    filterCountries(value: string) {
        if (!value) {
            this.filteredCountries = this.countries;
            return;
        }
        this.filteredCountries = this.countries.filter(
            (country: string) => country.toLowerCase().includes(value.toLowerCase())
        );
    }

    displayUserFn(user: any): string {
        return user ? user.name : '';
    }

    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    // Code snippets
    codes: Record<string, string> = {
        'simple': `<!-- Simple Autocomplete -->
<mat-form-field appearance="outline">
  <mat-label>Pick a framework</mat-label>
  <input matInput [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option value="Angular">Angular</mat-option>
    <mat-option value="React">React</mat-option>
    <mat-option value="Vue">Vue</mat-option>
    <mat-option value="Svelte">Svelte</mat-option>
  </mat-autocomplete>
</mat-form-field>`,

        'filter': `<!-- Filter Autocomplete -->
// Component:
countries = ['United States', 'UK', 'Canada'];
filteredCountries = this.countries;

filterCountries(value: string) {
  this.filteredCountries = this.countries.filter(
    c => c.toLowerCase().includes(value.toLowerCase())
  );
}

// Template:
<mat-form-field appearance="outline">
  <mat-label>Search countries</mat-label>
  <input matInput [matAutocomplete]="auto"
         (input)="filterCountries($event.target.value)">
  <mat-autocomplete #auto="matAutocomplete">
    @for (country of filteredCountries; track country) {
      <mat-option [value]="country">{{country}}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`,

        'groups': `<!-- Option Groups Autocomplete -->
<mat-form-field appearance="outline">
  <mat-label>Select a state</mat-label>
  <input matInput [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete">
    <mat-optgroup label="East Coast">
      <mat-option value="NY">New York</mat-option>
      <mat-option value="NJ">New Jersey</mat-option>
    </mat-optgroup>
    <mat-optgroup label="West Coast">
      <mat-option value="CA">California</mat-option>
      <mat-option value="WA">Washington</mat-option>
    </mat-optgroup>
  </mat-autocomplete>
</mat-form-field>`,

        'display': `<!-- Display Value Autocomplete -->
interface User { id: number; name: string; email: string; }

users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
];

displayFn(user: User): string {
  return user ? user.name : '';
}

// Template:
<mat-form-field appearance="outline">
  <mat-label>Select user</mat-label>
  <input matInput [matAutocomplete]="auto" [formControl]="userCtrl">
  <mat-autocomplete #auto [displayWith]="displayFn">
    @for (user of users; track user.id) {
      <mat-option [value]="user">
        {{user.name}} - {{user.email}}
      </mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`,

        'highlight': `<!-- Highlight First Option -->
<mat-form-field appearance="outline">
  <mat-label>Colors</mat-label>
  <input matInput [matAutocomplete]="auto">
  <mat-autocomplete #auto autoActiveFirstOption>
    <mat-option value="Red">Red</mat-option>
    <mat-option value="Green">Green</mat-option>
    <mat-option value="Blue">Blue</mat-option>
  </mat-autocomplete>
</mat-form-field>`
    };
}
