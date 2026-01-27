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
    public timelineOptions: Partial<ApexOptions> = {};
    public bubbleOptions: Partial<ApexOptions> = {};
    public mixedOptions: Partial<ApexOptions> = {};
    public barOptions: Partial<ApexOptions> = {};
    public pieOptions: Partial<ApexOptions> = {};

    constructor(private snackBar: MatSnackBar, private themeService: ThemeService) {
        this.themeSubscription = this.themeService.activeTheme$.subscribe(theme => {
            const colors = this.themeService.getColors(theme);
            this.updateCharts(colors, theme);
        });
    }

    ngOnDestroy() {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    }

    updateCharts(colors: ThemeColors, theme: string) {
        // Theme Flags
        const isNeumorphic = theme === 'neumorphism';
        const isGlass = theme === 'glassmorphism';
        const isMinimal = theme === 'minimal';
        const isFuturistic = theme === 'futuristic' || theme === 'legacy-dark';
        const isCrystal = theme === 'crystal';

        // Helper for Minimal Theme Colors
        const getMinimalColor = (index: number) => {
            const minChartColors = ['#000000', '#555555', '#999999', '#CCCCCC'];
            return minChartColors[index % minChartColors.length];
        };

        const activeChartColors = isMinimal ? ['#000', '#444', '#888', '#aaa', '#ccc'] : colors.chartColors;
        const activeText = isMinimal ? '#000' : colors.text;

        const commonOptions: Partial<ApexOptions> = {
            chart: {
                type: 'line',
                background: 'transparent',
                toolbar: { show: false },
                // Futuristic Glow (Global)
                dropShadow: isFuturistic ? {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 10,
                    opacity: 0.5,
                    color: colors.primary
                } : { enabled: false }
            },
            theme: { mode: colors.isDark ? 'dark' : 'light' },
            grid: {
                borderColor: isMinimal ? 'transparent' : (isGlass ? 'rgba(255,255,255,0.05)' : colors.grid),
                padding: { top: 0, right: 0, bottom: 0, left: 10 }
            },
            dataLabels: { enabled: false }
        };

        // 1. Radial Bar
        this.radialBarOptions = {
            series: [76, 67, 61, 90],
            chart: { type: 'radialBar', height: 380, background: 'transparent' },
            plotOptions: {
                radialBar: {
                    track: { background: isGlass ? 'rgba(255,255,255,0.1)' : (colors.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') },
                    dataLabels: { name: { show: false }, value: { show: false } },
                    hollow: { margin: isMinimal ? 5 : 15 } // Tighter for minimal
                }
            },
            colors: activeChartColors.slice(0, 4),
            labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
            legend: { show: true, floating: true, position: 'left', labels: { colors: activeText } }
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
            xaxis: { type: 'datetime', labels: { style: { colors: activeText } } },
            yaxis: { tooltip: { enabled: true }, labels: { style: { colors: activeText } } },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: isMinimal ? '#000' : colors.chartColors[2],
                        downward: isMinimal ? 'transparent' : colors.chartColors[3]
                    },
                    wick: { useFillColor: !isMinimal }
                }
            },
            stroke: { width: isMinimal ? 1 : 2, colors: isMinimal ? ['#000'] : undefined }
        };

        // 3. Area (Spline)
        this.areaOptions = {
            ...commonOptions,
            series: [{ name: 'Net Profit', data: [31, 40, 28, 51, 42, 109, 100] }],
            chart: { type: 'area', height: 350, background: 'transparent', dropShadow: commonOptions.chart?.dropShadow },
            stroke: { curve: isMinimal ? 'straight' : 'smooth', width: 2, colors: [activeChartColors[0]] },
            colors: [activeChartColors[0]],
            fill: {
                type: isMinimal ? 'solid' : 'gradient',
                gradient: { opacityFrom: isGlass ? 0.5 : 0.6, opacityTo: 0.1 },
                opacity: isMinimal ? 0.1 : 1
            },
            xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], labels: { style: { colors: activeText } } },
            yaxis: { labels: { style: { colors: activeText } } },
            legend: { labels: { colors: activeText } }
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
                    shadeIntensity: isMinimal ? 0 : 0.5,
                    radius: isNeumorphic ? 10 : (isCrystal ? 0 : 4),
                    enableShades: !isMinimal,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 50, color: isMinimal ? '#eee' : colors.chartColors[0], name: 'Low' },
                            { from: 51, to: 100, color: isMinimal ? '#000' : colors.chartColors[2], name: 'High' }
                        ]
                    }
                }
            },
            xaxis: { labels: { style: { colors: activeText } } },
            yaxis: { labels: { style: { colors: activeText } } }
        };

        // 5. Scatter
        this.scatterOptions = {
            ...commonOptions,
            series: [
                { name: "Sample A", data: [[16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]] },
                { name: "Sample B", data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]] }
            ],
            chart: { type: 'scatter', height: 350, background: 'transparent', zoom: { enabled: true, type: 'xy' } },
            xaxis: { tickAmount: 10, labels: { formatter: (val: any) => parseFloat(val).toFixed(1), style: { colors: activeText } } },
            yaxis: { tickAmount: 7, labels: { style: { colors: activeText } } },
            colors: isMinimal ? ['#555', '#000'] : [colors.secondary, colors.chartColors[4]],
            markers: {
                size: isMinimal ? 4 : 6,
                strokeColors: isMinimal ? '#fff' : 'transparent',
                shape: isCrystal ? 'square' : 'circle'
            }
        };

        // 6. Timeline (Range Bar)
        this.timelineOptions = {
            ...commonOptions,
            series: [{
                data: [
                    { x: 'Disk A Scan', y: [new Date('2023-01-01T08:00:00').getTime(), new Date('2023-01-01T10:30:00').getTime()] },
                    { x: 'Partition Recovery', y: [new Date('2023-01-01T11:00:00').getTime(), new Date('2023-01-01T14:00:00').getTime()] },
                    { x: 'File Extraction', y: [new Date('2023-01-01T13:00:00').getTime(), new Date('2023-01-01T16:00:00').getTime()] },
                    { x: 'Integrity Check', y: [new Date('2023-01-01T16:30:00').getTime(), new Date('2023-01-01T18:00:00').getTime()] }
                ]
            }],
            chart: { type: 'rangeBar', height: 350, background: 'transparent' },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: isNeumorphic ? 8 : (isCrystal || isMinimal ? 0 : 4)
                }
            },
            xaxis: { type: 'datetime', labels: { style: { colors: activeText } } },
            yaxis: { labels: { style: { colors: activeText } } },
            colors: [activeChartColors[0]]
        };

        // 7. Bubble Chart
        this.bubbleOptions = {
            ...commonOptions,
            series: [
                { name: 'System Files', data: [[10, 20, 30], [20, 40, 10], [30, 10, 45], [40, 30, 15]] },
                { name: 'User Data', data: [[15, 25, 20], [25, 15, 35], [35, 35, 25], [45, 20, 40]] },
                { name: 'Corrupted', data: [[20, 30, 50], [30, 50, 60]] }
            ],
            chart: { type: 'bubble', height: 350, background: 'transparent' },
            dataLabels: { enabled: false },
            fill: { opacity: isGlass ? 0.6 : 0.8 },
            xaxis: { tickAmount: 5, labels: { style: { colors: activeText } }, title: { text: 'File Size (MB)', style: { color: activeText } } },
            yaxis: { max: 70, labels: { style: { colors: activeText } }, title: { text: 'Risk Factor', style: { color: activeText } } },
            colors: activeChartColors.slice(0, 3)
        };

        // 8. Mixed Chart
        this.mixedOptions = {
            ...commonOptions,
            series: [
                { name: 'Transfer Speed (MB/s)', type: 'column', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
                { name: 'Errors Detected', type: 'area', data: [4, 5, 2, 8, 3, 2, 0, 1, 6, 2, 4] },
                { name: 'Overall Health', type: 'line', data: [80, 85, 90, 70, 85, 90, 95, 92, 75, 88, 85] }
            ],
            chart: { type: 'line', height: 350, stacked: false, background: 'transparent' },
            stroke: { width: [0, 2, 5], curve: isMinimal ? 'straight' : 'smooth' },
            plotOptions: { bar: { columnWidth: '50%', borderRadius: isNeumorphic ? 4 : 0 } },
            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: { inverseColors: false, shade: 'light', type: 'vertical', opacityFrom: 0.85, opacityTo: 0.55, stops: [0, 100, 100, 100] }
            },
            xaxis: { categories: ['10m', '20m', '30m', '40m', '50m', '60m', '70m', '80m', '90m', '100m', '110m'], labels: { style: { colors: activeText } } },
            yaxis: [
                { seriesName: 'Transfer Speed', axisTicks: { show: true }, axisBorder: { show: true, color: activeChartColors[0] }, labels: { style: { colors: activeChartColors[0] } }, title: { text: 'Speed (MB/s)', style: { color: activeChartColors[0] } } },
                { seriesName: 'Errors', show: false },
                { opposite: true, seriesName: 'Overall Health', axisTicks: { show: true }, axisBorder: { show: true, color: activeChartColors[2] }, labels: { style: { colors: activeChartColors[2] } }, title: { text: 'Health Score', style: { color: activeChartColors[2] } } }
            ],
            colors: [activeChartColors[0], activeChartColors[3], activeChartColors[2]]
        };

        // 9. Bar Chart
        this.barOptions = {
            ...commonOptions,
            series: [{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }],
            chart: { type: 'bar', height: 350, background: 'transparent' },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: isNeumorphic ? 10 : (isCrystal || isMinimal ? 0 : 4)
                }
            },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 2, colors: ['transparent'] },
            xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], labels: { style: { colors: activeText } } },
            yaxis: { title: { text: '$ (thousands)' }, labels: { style: { colors: activeText } } },
            fill: { opacity: isGlass ? 0.7 : 1 },
            colors: [activeChartColors[0]]
        };

        // 10. Pie Chart
        this.pieOptions = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: 380,
                type: 'pie',
                background: 'transparent',
                dropShadow: isNeumorphic ? {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 5,
                    blur: 5,
                    color: colors.isDark ? '#000' : '#000',
                    opacity: 0.2
                } : (isFuturistic ? {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 10,
                    color: colors.primary
                } : { enabled: false })
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            colors: activeChartColors,
            legend: { labels: { colors: activeText } },
            dataLabels: {
                enabled: true,
                style: { colors: isMinimal ? ['#000'] : ['#fff'] },
                dropShadow: isNeumorphic ? { enabled: true, top: 1, left: 1, blur: 1, color: '#000', opacity: 0.45 } : { enabled: false }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'round',
                colors: isMinimal ? ['#fff'] : [colors.background],
                width: isNeumorphic || isMinimal ? 3 : 0
            },
            responsive: [{
                breakpoint: 480,
                options: { chart: { width: 200 }, legend: { position: 'bottom' } }
            }]
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

    timelineHtml = `<apx-chart [series]="timelineOptions.series" [chart]="timelineOptions.chart" ...></apx-chart>`;
    timelineTs = `this.timelineOptions = {
    chart: { type: 'rangeBar' },
    plotOptions: { bar: { horizontal: true } }
};`;

    bubbleHtml = `<apx-chart [series]="bubbleOptions.series" [chart]="bubbleOptions.chart" ...></apx-chart>`;
    bubbleTs = `this.bubbleOptions = {
    chart: { type: 'bubble' },
    xaxis: { title: { text: 'File Size' } },
    yaxis: { title: { text: 'Risk' } }
};`;

    mixedHtml = `<apx-chart [series]="mixedOptions.series" [chart]="mixedOptions.chart" ...></apx-chart>`;
    mixedTs = `this.mixedOptions = {
    series: [{ type: 'column' }, { type: 'area' }, { type: 'line' }],
    yaxis: [{ title: 'Speed' }, { title: 'Errors' }]
};`;

    barHtml = `<apx-chart [series]="barOptions.series" [chart]="barOptions.chart" ...></apx-chart>`;
    barTs = `this.barOptions = {
    chart: { type: 'bar' },
    plotOptions: { bar: { borderRadius: 10 } }
};`;

    pieHtml = `<apx-chart [series]="pieOptions.series" [chart]="pieOptions.chart" ...></apx-chart>`;
    pieTs = `this.pieOptions = {
    chart: { type: 'pie' }
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
