import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-tooltip-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTooltipModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './tooltip-showcase.component.html',
    styleUrl: './tooltip-showcase.component.scss'
})
export class TooltipShowcaseComponent {
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<button mat-raised-button matTooltip="This is a tooltip">
  Hover me
</button>`,
        'positions': `<button matTooltip="Above" matTooltipPosition="above">Above</button>
<button matTooltip="Below" matTooltipPosition="below">Below</button>
<button matTooltip="Left" matTooltipPosition="left">Left</button>
<button matTooltip="Right" matTooltipPosition="right">Right</button>`
    };
}
