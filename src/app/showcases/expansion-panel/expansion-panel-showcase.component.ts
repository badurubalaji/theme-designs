import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-expansion-panel-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './expansion-panel-showcase.component.html',
    styleUrl: './expansion-panel-showcase.component.scss'
})
export class ExpansionPanelShowcaseComponent {
    step = 0;
    setStep(index: number) { this.step = index; }
    nextStep() { this.step++; }
    prevStep() { this.step--; }

    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Personal data</mat-panel-title>
      <mat-panel-description>Type your name</mat-panel-description>
    </mat-expansion-panel-header>
    <p>Panel content here</p>
  </mat-expansion-panel>
</mat-accordion>`
    };
}
