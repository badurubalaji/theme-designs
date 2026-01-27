import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatDialogModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './dialog-showcase.component.html',
    styleUrl: './dialog-showcase.component.scss'
})
export class DialogShowcaseComponent {
    @ViewChild('basicDialog') basicDialog!: TemplateRef<any>;
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard, private dialog: MatDialog) { }

    openDialog() {
        this.dialog.open(this.basicDialog, { width: '400px' });
    }

    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }
    codes: Record<string, string> = {
        'basic': `// Component
constructor(private dialog: MatDialog) {}

openDialog() {
  this.dialog.open(DialogComponent, {
    width: '400px',
    data: { title: 'My Dialog' }
  });
}

// DialogComponent
@Component({
  template: \`
    <h2 mat-dialog-title>Dialog Title</h2>
    <mat-dialog-content>
      This is the dialog content.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" color="primary">OK</button>
    </mat-dialog-actions>
  \`
})
export class DialogComponent {}`
    };
}
