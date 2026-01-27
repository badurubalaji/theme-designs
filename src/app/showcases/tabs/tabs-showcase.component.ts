import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-tabs-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatIconModule, MatButtonModule, MatExpansionModule, MatSnackBarModule],
    templateUrl: './tabs-showcase.component.html',
    styleUrl: './tabs-showcase.component.scss'
})
export class TabsShowcaseComponent {
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-tab-group>
  <mat-tab label="First">Content 1</mat-tab>
  <mat-tab label="Second">Content 2</mat-tab>
  <mat-tab label="Third">Content 3</mat-tab>
</mat-tab-group>`,
        'icons': `<mat-tab-group>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>home</mat-icon> Home
    </ng-template>
    Home content
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>settings</mat-icon> Settings
    </ng-template>
    Settings content
  </mat-tab>
</mat-tab-group>`
    };
}
