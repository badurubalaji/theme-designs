import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-progress-bar-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './progress-bar-showcase.component.html',
    styleUrl: './progress-bar-showcase.component.scss'
})
export class ProgressBarShowcaseComponent {
    progressValue = 60;
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'determinate': `<mat-progress-bar mode="determinate" [value]="60"></mat-progress-bar>`,
        'indeterminate': `<mat-progress-bar mode="indeterminate"></mat-progress-bar>`,
        'buffer': `<mat-progress-bar mode="buffer" [value]="40" [bufferValue]="70"></mat-progress-bar>`,
        'spinner': `<mat-spinner></mat-spinner>
<mat-spinner diameter="40"></mat-spinner>
<mat-progress-spinner mode="determinate" [value]="70"></mat-progress-spinner>`
    };
}
