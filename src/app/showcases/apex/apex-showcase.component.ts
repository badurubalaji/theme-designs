import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartComponent, NgApexchartsModule, ApexOptions } from 'ng-apexcharts';
import { ThemeService, ThemeColors } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-apex-showcase',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule, MatButtonModule, MatIconModule, MatSnackBarModule],
    templateUrl: './apex-showcase.component.html',
    styleUrl: './apex-showcase.component.scss'
})
export class ApexShowcaseComponent implements OnDestroy {
    @ViewChild('chart') chart!: ChartComponent;

    private themeSubscription: Subscription;
    public radialBarOptions: Partial<ApexOptions> = {};
    public candlestickOptions: Partial<ApexOptions> = {};
    public areaOptions: Partial<ApexOptions> = {};
    public heatmapOptions: Partial<ApexOptions> = {};
    public scatterOptions: Partial<ApexOptions> = {};

    constructor(private snackBar: MatSnackBar, private themeService: ThemeService) {
        this.themeSubscription = this.themeService.activeTheme$.subscribe(theme => {
            const colors = this.themeService.getColors(theme);
            this.updateCharts(colors);
        });
    }

    ngOnDestroy() {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    }

    updateCharts(colors: ThemeColors) {
        const commonOptions: Partial<ApexOptions> = {
            chart: {
                type: 'line',
                background: 'transparent',
                toolbar: { show: false }
            },
            theme: { mode: colors.isDark ? 'dark' : 'light' },
            grid: { borderColor: colors.grid },
            dataLabels: { enabled: false }
        };

        // 1. Radial Bar
        this.radialBarOptions = {
            series: [76, 67, 61, 90],
            chart: { type: 'radialBar', height: 380, background: 'transparent' },
            plotOptions: {
                radialBar: {
                    track: { background: colors.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                    dataLabels: { name: { show: false }, value: { show: false } }
                }
            },
            colors: colors.chartColors.slice(0, 4),
            labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
            legend: { show: true, floating: true, position: 'left', labels: { colors: colors.text } }
        };

        // 2. Candlestick
        this.candlestickOptions = {
            ...commonOptions,
            series: [{
                data: [
                    { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
                    { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
                    { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
                    { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
                    { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
                ]
            }],
            chart: { type: 'candlestick', height: 350, background: 'transparent' },
            xaxis: { type: 'datetime', labels: { style: { colors: colors.text } } },
            yaxis: { tooltip: { enabled: true }, labels: { style: { colors: colors.text } } },
            plotOptions: {
                candlestick: {
                    colors: { upward: colors.chartColors[2], downward: colors.chartColors[3] },
                    wick: { useFillColor: true }
                }
            }
        };

        // 3. Area (Spline)
        this.areaOptions = {
            ...commonOptions,
            series: [{ name: 'Net Profit', data: [31, 40, 28, 51, 42, 109, 100] }],
            chart: { type: 'area', height: 350, background: 'transparent' },
            stroke: { curve: 'smooth', width: 2 },
            colors: [colors.primary],
            fill: { type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0.1 } },
            xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], labels: { style: { colors: colors.text } } },
            yaxis: { labels: { style: { colors: colors.text } } },
            legend: { labels: { colors: colors.text } }
        };

        // 4. Heatmap
        this.heatmapOptions = {
            ...commonOptions,
            series: [
                { name: 'Metric1', data: this.generateData(18, { min: 0, max: 90 }) },
                { name: 'Metric2', data: this.generateData(18, { min: 0, max: 90 }) },
                { name: 'Metric3', data: this.generateData(18, { min: 0, max: 90 }) },
                { name: 'Metric4', data: this.generateData(18, { min: 0, max: 90 }) },
                { name: 'Metric5', data: this.generateData(18, { min: 0, max: 90 }) }
            ],
            chart: { type: 'heatmap', height: 350, background: 'transparent' },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 50, color: colors.chartColors[0], name: 'Low' },
                            { from: 51, to: 100, color: colors.chartColors[2], name: 'High' }
                        ]
                    }
                }
            },
            xaxis: { labels: { style: { colors: colors.text } } },
            yaxis: { labels: { style: { colors: colors.text } } }
        };

        // 5. Scatter
        this.scatterOptions = {
            ...commonOptions,
            series: [
                { name: "Sample A", data: [[16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]] },
                { name: "Sample B", data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]] }
            ],
            chart: { type: 'scatter', height: 350, background: 'transparent', zoom: { enabled: true, type: 'xy' } },
            xaxis: { tickAmount: 10, labels: { formatter: (val: any) => parseFloat(val).toFixed(1), style: { colors: colors.text } } },
            yaxis: { tickAmount: 7, labels: { style: { colors: colors.text } } },
            colors: [colors.secondary, colors.chartColors[4]]
        };
    }

    generateData(count: number, yrange: { min: number, max: number }) {
        let i = 0;
        const series = [];
        while (i < count) {
            const x = 'w' + (i + 1).toString();
            const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push({ x: x, y: y });
            i++;
        }
        return series;
    }

    // Snippets
    radialHtml = `<apx-chart [series]="radialBarOptions.series" [chart]="radialBarOptions.chart" ...></apx-chart>`;
    radialTs = `// Dynamic colors based on theme
this.radialBarOptions = {
  colors: colors.chartColors.slice(0, 4),
  // ...
};`;

    candleHtml = `<apx-chart [series]="candlestickOptions.series" [chart]="candlestickOptions.chart" ...></apx-chart>`;
    candleTs = `this.candlestickOptions = {
  plotOptions: {
    candlestick: {
      colors: { upward: colors.success, downward: colors.error }
    }
  }
};`;

    areaHtml = `<apx-chart [series]="areaOptions.series" [chart]="areaOptions.chart" ...></apx-chart>`;
    areaTs = `this.areaOptions = {
  fill: { type: 'gradient' },
  colors: [colors.primary]
};`;

    heatmapHtml = `<apx-chart [series]="heatmapOptions.series" [chart]="heatmapOptions.chart" ...></apx-chart>`;
    heatmapTs = `this.heatmapOptions = {
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [{ from: 0, to: 50, color: colors.low }, { from: 51, to: 100, color: colors.high }]
      }
    }
  }
};`;

    scatterHtml = `<apx-chart [series]="scatterOptions.series" [chart]="scatterOptions.chart" ...></apx-chart>`;
    scatterTs = `this.scatterOptions = {
  chart: { type: 'scatter', zoom: { enabled: true } },
  colors: [colors.secondary, colors.accent]
};`;

    copyCode(code: string, type: string) {
        navigator.clipboard.writeText(code).then(() => {
            this.snackBar.open(`${type} code copied!`, 'Close', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['copy-success-snackbar']
            });
        });
    }
}
