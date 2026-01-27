import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-chartjs-showcase',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, MatButtonModule, MatIconModule, MatSnackBarModule],
    templateUrl: './chartjs-showcase.component.html',
    styleUrl: './chartjs-showcase.component.scss'
})
export class ChartjsShowcaseComponent {
    // Futuristic color palette - subtle and eye-friendly
    private colors = {
        cyan: '#4fc3f7',
        purple: '#9575cd',
        green: '#66bb6a',
        pink: '#f06292',
        orange: '#ffb74d',
        blue: '#5c6bc0',
        red: '#ef5350'
    };

    constructor(private snackBar: MatSnackBar) { }

    // Common chart options for dark theme
    private commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e8e8e8',
                    font: { family: 'Inter, sans-serif' }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#888' },
                grid: { color: 'rgba(255,255,255,0.05)' }
            },
            y: {
                ticks: { color: '#888' },
                grid: { color: 'rgba(255,255,255,0.05)' }
            }
        }
    };

    // 1. Line Chart
    lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: 'Series A',
                backgroundColor: 'rgba(79, 195, 247, 0.2)',
                borderColor: this.colors.cyan,
                pointBackgroundColor: this.colors.cyan,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: this.colors.cyan,
                fill: 'origin'
            },
            {
                data: [28, 48, 40, 19, 86, 27, 90],
                label: 'Series B',
                backgroundColor: 'rgba(149, 117, 205, 0.2)',
                borderColor: this.colors.purple,
                pointBackgroundColor: this.colors.purple,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: this.colors.purple,
                fill: 'origin'
            }
        ],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    };

    lineChartOptions: ChartConfiguration['options'] = {
        ...this.commonOptions,
        elements: {
            line: {
                tension: 0.4
            }
        }
    };

    lineChartType: ChartType = 'line';

    lineChartHtml = `<canvas baseChart
  [data]="lineChartData"
  [options]="lineChartOptions"
  [type]="lineChartType">
</canvas>`;

    lineChartTs = `lineChartData: ChartConfiguration['data'] = {
  datasets: [{
    data: [65, 59, 80, 81, 56, 55, 40],
    label: 'Series A',
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    borderColor: '#4fc3f7'
  }],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
};`;

    // 2. Bar Chart
    barChartData: ChartConfiguration['data'] = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: 'Series A',
                backgroundColor: this.colors.cyan,
                hoverBackgroundColor: this.colors.cyan
            },
            {
                data: [28, 48, 40, 19, 86, 27, 90],
                label: 'Series B',
                backgroundColor: this.colors.purple,
                hoverBackgroundColor: this.colors.purple
            }
        ]
    };

    barChartOptions: ChartConfiguration['options'] = this.commonOptions;
    barChartType: ChartType = 'bar';

    barChartHtml = `<canvas baseChart
  [data]="barChartData"
  [options]="barChartOptions"
  [type]="barChartType">
</canvas>`;

    barChartTs = `barChartData: ChartConfiguration['data'] = {
  labels: ['2018', '2019', '2020', '2021'],
  datasets: [{
    data: [65, 59, 80, 81],
    label: 'Series A',
    backgroundColor: '#4fc3f7'
  }]
};`;

    // 3. Doughnut Chart
    doughnutChartData: ChartConfiguration['data'] = {
        labels: ['Sales', 'Marketing', 'Development', 'Support', 'Operations'],
        datasets: [{
            data: [350, 450, 100, 200, 150],
            backgroundColor: [
                this.colors.cyan,
                this.colors.purple,
                this.colors.green,
                this.colors.pink,
                this.colors.orange
            ],
            hoverBackgroundColor: [
                this.colors.cyan,
                this.colors.purple,
                this.colors.green,
                this.colors.pink,
                this.colors.orange
            ]
        }]
    };

    doughnutChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#e8e8e8',
                    font: { family: 'Inter, sans-serif' }
                }
            }
        }
    };

    doughnutChartType: ChartType = 'doughnut';

    doughnutChartHtml = `<canvas baseChart
  [data]="doughnutChartData"
  [options]="doughnutChartOptions"
  [type]="doughnutChartType">
</canvas>`;

    doughnutChartTs = `doughnutChartData: ChartConfiguration['data'] = {
  labels: ['Sales', 'Marketing', 'Development'],
  datasets: [{
    data: [350, 450, 100],
    backgroundColor: ['#4fc3f7', '#9575cd', '#66bb6a']
  }]
};`;

    // 4. Radar Chart
    radarChartData: ChartConfiguration['data'] = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                data: [65, 59, 90, 81, 56, 55, 40],
                label: 'Series A',
                backgroundColor: 'rgba(79, 195, 247, 0.2)',
                borderColor: this.colors.cyan,
                pointBackgroundColor: this.colors.cyan
            },
            {
                data: [28, 48, 40, 19, 96, 27, 100],
                label: 'Series B',
                backgroundColor: 'rgba(149, 117, 205, 0.2)',
                borderColor: this.colors.purple,
                pointBackgroundColor: this.colors.purple
            }
        ]
    };

    radarChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e8e8e8',
                    font: { family: 'Inter, sans-serif' }
                }
            }
        },
        scales: {
            r: {
                ticks: { color: '#888', backdropColor: 'transparent' },
                grid: { color: 'rgba(255,255,255,0.1)' },
                pointLabels: { color: '#e8e8e8' }
            }
        }
    };

    radarChartType: ChartType = 'radar';

    radarChartHtml = `<canvas baseChart
  [data]="radarChartData"
  [options]="radarChartOptions"
  [type]="radarChartType">
</canvas>`;

    radarChartTs = `radarChartData: ChartConfiguration['data'] = {
  labels: ['Eating', 'Drinking', 'Sleeping'],
  datasets: [{
    data: [65, 59, 90],
    label: 'Series A',
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    borderColor: '#4fc3f7'
  }]
};`;

    // 5. Polar Area Chart
    polarAreaChartData: ChartConfiguration['data'] = {
        labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
        datasets: [{
            data: [300, 500, 100, 400, 250],
            backgroundColor: [
                `${this.colors.cyan}80`,
                `${this.colors.purple}80`,
                `${this.colors.green}80`,
                `${this.colors.pink}80`,
                `${this.colors.orange}80`
            ],
            borderColor: [
                this.colors.cyan,
                this.colors.purple,
                this.colors.green,
                this.colors.pink,
                this.colors.orange
            ]
        }]
    };

    polarAreaChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#e8e8e8',
                    font: { family: 'Inter, sans-serif' }
                }
            }
        },
        scales: {
            r: {
                ticks: { color: '#888', backdropColor: 'transparent' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    };

    polarAreaChartType: ChartType = 'polarArea';

    polarAreaChartHtml = `<canvas baseChart
  [data]="polarAreaChartData"
  [options]="polarAreaChartOptions"
  [type]="polarAreaChartType">
</canvas>`;

    polarAreaChartTs = `polarAreaChartData: ChartConfiguration['data'] = {
  labels: ['Download', 'In-Store', 'Mail'],
  datasets: [{
    data: [300, 500, 100],
    backgroundColor: ['#4fc3f780', '#9575cd80', '#66bb6a80']
  }]
};`;

    // 6. Bubble Chart
    bubbleChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [
                    { x: 10, y: 20, r: 15 },
                    { x: 15, y: 10, r: 10 },
                    { x: 26, y: 12, r: 20 },
                    { x: 7, y: 8, r: 8 }
                ],
                label: 'Series A',
                backgroundColor: `${this.colors.cyan}60`,
                borderColor: this.colors.cyan
            },
            {
                data: [
                    { x: 15, y: 25, r: 18 },
                    { x: 20, y: 15, r: 12 },
                    { x: 10, y: 18, r: 15 },
                    { x: 5, y: 5, r: 10 }
                ],
                label: 'Series B',
                backgroundColor: `${this.colors.purple}60`,
                borderColor: this.colors.purple
            }
        ]
    };

    bubbleChartOptions: ChartConfiguration['options'] = this.commonOptions;
    bubbleChartType: ChartType = 'bubble';

    bubbleChartHtml = `<canvas baseChart
  [data]="bubbleChartData"
  [options]="bubbleChartOptions"
  [type]="bubbleChartType">
</canvas>`;

    bubbleChartTs = `bubbleChartData: ChartConfiguration['data'] = {
  datasets: [{
    data: [
      { x: 10, y: 20, r: 15 },
      { x: 15, y: 10, r: 10 }
    ],
    label: 'Series A',
    backgroundColor: '#4fc3f760'
  }]
};`;

    // Code copy functionality
    copyCode(code: string, type: string) {
        navigator.clipboard.writeText(code).then(() => {
            this.snackBar.open(`${type} code copied to clipboard!`, 'Close', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['copy-success-snackbar']
            });
        }).catch(err => {
            console.error('Failed to copy:', err);
            this.snackBar.open('Failed to copy code', 'Close', {
                duration: 2000,
                panelClass: ['copy-error-snackbar']
            });
        });
    }
}
