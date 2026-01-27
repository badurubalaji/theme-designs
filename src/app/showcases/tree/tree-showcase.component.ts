import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode { name: string; children?: FoodNode[]; }
interface FlatNode { expandable: boolean; name: string; level: number; }

const TREE_DATA: FoodNode[] = [
    { name: 'Fruit', children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }] },
    { name: 'Vegetables', children: [{ name: 'Tomatoes' }, { name: 'Carrots' }, { name: 'Peppers' }] },
];

@Component({
    selector: 'app-tree-showcase',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTreeModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatSnackBarModule],
    templateUrl: './tree-showcase.component.html',
    styleUrl: './tree-showcase.component.scss'
})
export class TreeShowcaseComponent {
    private transformer = (node: FoodNode, level: number): FlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
    });

    treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: FlatNode) => node.expandable;

    copyCode(code: string, name: string) {
        this.clipboard.copy(code);
        this.snackBar.open(`${name} code copied!`, 'Close', { duration: 2000 });
    }

    codes: Record<string, string> = {
        'basic': `<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
    <button mat-icon-button disabled></button>
    {{node.name}}
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
    <button mat-icon-button matTreeNodeToggle>
      <mat-icon>{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon>
    </button>
    {{node.name}}
  </mat-tree-node>
</mat-tree>`
    };
}
