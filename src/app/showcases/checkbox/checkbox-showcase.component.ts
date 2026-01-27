import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-checkbox-showcase',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatTabsModule,
        MatSnackBarModule,
    ],
    templateUrl: './checkbox-showcase.component.html',
    styleUrl: './checkbox-showcase.component.scss'
})
export class CheckboxShowcaseComponent {
    checked = true;
    indeterminate = true;
    labelPosition: 'before' | 'after' = 'after';

    task = {
        name: 'All Tasks',
        completed: false,
        subtasks: [
            { name: 'Task 1', completed: true },
            { name: 'Task 2', completed: false },
            { name: 'Task 3', completed: false },
        ]
    };

    constructor(
        private snackBar: MatSnackBar,
        private clipboard: Clipboard
    ) { }

    allComplete(): boolean {
        return this.task.subtasks.every(t => t.completed);
    }

    someComplete(): boolean {
        return this.task.subtasks.some(t => t.completed) && !this.allComplete();
    }

    setAll(completed: boolean) {
        this.task.completed = completed;
        this.task.subtasks.forEach(t => t.completed = completed);
    }

    updateParent() {
        this.task.completed = this.allComplete();
    }

    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }

    codes: Record<string, string> = {
        'basic': `<!-- Basic Checkbox -->
<mat-checkbox [(ngModel)]="checked">Check me!</mat-checkbox>

<mat-checkbox [checked]="true">Checked</mat-checkbox>
<mat-checkbox disabled>Disabled</mat-checkbox>
<mat-checkbox [checked]="true" disabled>Disabled checked</mat-checkbox>`,

        'colors': `<!-- Color Variants -->
<mat-checkbox color="primary">Primary</mat-checkbox>
<mat-checkbox color="accent">Accent</mat-checkbox>
<mat-checkbox color="warn">Warn</mat-checkbox>`,

        'indeterminate': `<!-- Indeterminate State -->
<mat-checkbox [indeterminate]="indeterminate"
              [checked]="checked"
              (change)="checked = $event.checked; indeterminate = false">
  Click to toggle
</mat-checkbox>

<button mat-button (click)="indeterminate = true">
  Set Indeterminate
</button>`,

        'label-position': `<!-- Label Position -->
<mat-checkbox labelPosition="before">Label before</mat-checkbox>
<mat-checkbox labelPosition="after">Label after</mat-checkbox>`,

        'nested': `<!-- Nested Checkboxes -->
<mat-checkbox [checked]="allComplete()"
              [indeterminate]="someComplete()"
              (change)="setAll($event.checked)">
  {{task.name}}
</mat-checkbox>

<ul>
  @for (subtask of task.subtasks; track subtask.name) {
    <li>
      <mat-checkbox [(ngModel)]="subtask.completed"
                    (ngModelChange)="updateParent()">
        {{subtask.name}}
      </mat-checkbox>
    </li>
  }
</ul>`
    };
}
