import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-button-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './button-showcase.component.html',
    styleUrl: './button-showcase.component.scss'
})
export class ButtonShowcaseComponent {
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) { }
    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `<button mat-button>Basic</button>
<button mat-button color="primary">Primary</button>
<button mat-button color="accent">Accent</button>
<button mat-button color="warn">Warn</button>
<button mat-button disabled>Disabled</button>`,
        'raised': `<button mat-raised-button>Basic</button>
<button mat-raised-button color="primary">Primary</button>
<button mat-raised-button color="accent">Accent</button>
<button mat-raised-button color="warn">Warn</button>`,
        'stroked': `<button mat-stroked-button>Basic</button>
<button mat-stroked-button color="primary">Primary</button>
<button mat-stroked-button color="warn">Warn</button>`,
        'flat': `<button mat-flat-button>Basic</button>
<button mat-flat-button color="primary">Primary</button>
<button mat-flat-button color="accent">Accent</button>`,
        'icon': `<button mat-icon-button><mat-icon>home</mat-icon></button>
<button mat-icon-button color="primary"><mat-icon>settings</mat-icon></button>
<button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>`,
        'fab': `<button mat-fab color="primary"><mat-icon>add</mat-icon></button>
<button mat-mini-fab color="accent"><mat-icon>edit</mat-icon></button>
<button mat-fab extended color="primary"><mat-icon>add</mat-icon>Create</button>`
    };
}
