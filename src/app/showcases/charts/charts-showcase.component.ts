import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeService, ThemeColors } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-charts-showcase',
    standalone: true,
    imports: [CommonModule, NgxEchartsModule, MatButtonModule, MatIconModule, MatSnackBarModule],
    templateUrl: './charts-showcase.component.html',
    styleUrl: './charts-showcase.component.scss'
})
export class ChartsShowcaseComponent implements OnInit, OnDestroy {
    private themeSubscription: Subscription | null = null;

    // Initial empty options
    lineChartOption: EChartsOption = {};
    barChartOption: EChartsOption = {};
    pieChartOption: EChartsOption = {};
    gaugeChartOption: EChartsOption = {};
    radarChartOption: EChartsOption = {};
    heatmapChartOption: EChartsOption = {};
    areaChartOption: EChartsOption = {};

    constructor(private snackBar: MatSnackBar, private themeService: ThemeService) { }

    ngOnInit() {
        this.themeSubscription = this.themeService.activeTheme$.subscribe(theme => {
            const colors = this.themeService.getColors(theme);
            const isNeumorphic = theme === 'neumorphism';
            this.updateCharts(colors, isNeumorphic);
        });
    }

    ngOnDestroy() {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    }

    updateCharts(colors: ThemeColors, isNeumorphic: boolean) {
        // Common styles
        const textColor = colors.text;
        const gridColor = colors.grid;
        const bgColor = 'transparent'; // Chart background is transparent, container has color
        const axisLineColor = colors.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
        const splitLineColor = colors.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

        // 1. Line Chart
        this.lineChartOption = {
            backgroundColor: bgColor,
            tooltip: {
                trigger: 'axis',
                backgroundColor: colors.isDark ? 'rgba(20, 25, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: colors.primary,
                textStyle: { color: textColor }
            },
            legend: { textStyle: { color: textColor }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true, borderColor: gridColor },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                axisLine: { lineStyle: { color: axisLineColor } },
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: splitLineColor } }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: axisLineColor } },
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: splitLineColor } }
            },
            series: [
                {
                    name: 'CPU',
                    type: 'line',
                    smooth: true,
                    itemStyle: { color: colors.chartColors[0] },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: colors.chartColors[0] }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                        }
                    },
                    data: [45, 52, 48, 65, 72, 68, 58]
                },
                {
                    name: 'Memory',
                    type: 'line',
                    smooth: true,
                    itemStyle: { color: colors.chartColors[1] },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: colors.chartColors[1] }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                        }
                    },
                    data: [30, 38, 42, 45, 50, 48, 44]
                }
            ]
        };

        // 3. Pie Chart - Traffic Distribution (TARGET FIX)
        this.pieChartOption = {
            backgroundColor: bgColor,
            tooltip: {
                trigger: 'item',
                backgroundColor: colors.isDark ? 'rgba(20, 25, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: colors.primary,
                textStyle: { color: textColor }
            },
            legend: { orient: 'vertical', left: 'left', textStyle: { color: textColor } },
            series: [{
                name: 'Traffic Source',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: colors.background, // Match container bg for spacing
                    borderWidth: 2,
                    // NEUMORPHISM SPECIFIC FIX: Add shadows for depth
                    shadowBlur: isNeumorphic ? 10 : 0,
                    shadowOffsetX: isNeumorphic ? 5 : 0,
                    shadowOffsetY: isNeumorphic ? 5 : 0,
                    shadowColor: isNeumorphic ? 'rgba(0,0,0,0.2)' : 'transparent'
                },
                label: { show: false, position: 'center' },
                emphasis: {
                    label: { show: true, fontSize: 16, fontWeight: 'bold', color: textColor },
                    itemStyle: {
                        shadowBlur: 15,
                        shadowColor: colors.primary
                    }
                },
                labelLine: { show: false },
                data: [
                    { value: 1048, name: 'Search', itemStyle: { color: colors.chartColors[0] } },
                    { value: 735, name: 'Direct', itemStyle: { color: colors.chartColors[1] } },
                    { value: 580, name: 'Email', itemStyle: { color: colors.chartColors[2] } },
                    { value: 484, name: 'Union Ads', itemStyle: { color: colors.chartColors[3] } },
                    { value: 300, name: 'Video Ads', itemStyle: { color: colors.chartColors[4] } }
                ]
            }]
        };

        // 2. Bar Chart
        this.barChartOption = {
            backgroundColor: bgColor,
            tooltip: { trigger: 'axis', textStyle: { color: textColor }, backgroundColor: colors.isDark ? 'rgba(20,25,35,0.9)' : 'rgba(255,255,255,0.9)' },
            legend: { textStyle: { color: textColor } },
            xAxis: { type: 'value', axisLabel: { color: textColor }, splitLine: { lineStyle: { color: splitLineColor } } },
            yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], axisLabel: { color: textColor } },
            series: [
                {
                    name: '2023', type: 'bar', data: [120, 200, 150, 80, 70],
                    itemStyle: { color: colors.chartColors[0], borderRadius: [0, 4, 4, 0] }
                },
                {
                    name: '2024', type: 'bar', data: [160, 240, 180, 110, 95],
                    itemStyle: { color: colors.chartColors[1], borderRadius: [0, 4, 4, 0] }
                }
            ]
        };

        // 4. Gauge Chart
        this.gaugeChartOption = {
            backgroundColor: bgColor,
            series: [{
                type: 'gauge',
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [
                            [0.3, colors.chartColors[2]],
                            [0.7, colors.chartColors[0]],
                            [1, colors.chartColors[3]]
                        ]
                    }
                },
                pointer: { itemStyle: { color: colors.text } },
                axisTick: { lineStyle: { color: colors.text } },
                splitLine: { lineStyle: { color: colors.text } },
                axisLabel: { color: textColor },
                title: { color: textColor },
                detail: { color: colors.chartColors[0], formatter: '{value}%' },
                data: [{ value: 73, name: 'Perf' }]
            }]
        };

        // 5. Radar
        this.radarChartOption = {
            backgroundColor: bgColor,
            legend: { textStyle: { color: textColor } },
            radar: {
                indicator: [{ name: 'A', max: 100 }, { name: 'B', max: 100 }, { name: 'C', max: 100 }, { name: 'D', max: 100 }, { name: 'E', max: 100 }],
                axisName: { color: textColor }
            },
            series: [{
                type: 'radar',
                data: [
                    { value: [80, 70, 95, 65, 90], name: 'Data 1', itemStyle: { color: colors.chartColors[0] } },
                    { value: [70, 85, 88, 78, 82], name: 'Data 2', itemStyle: { color: colors.chartColors[1] } }
                ]
            }]
        };

        // 6. Heatmap
        this.heatmapChartOption = {
            backgroundColor: bgColor,
            tooltip: { position: 'top', textStyle: { color: textColor } },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], axisLabel: { color: textColor } },
            yAxis: { type: 'category', data: ['Morning', 'Afternoon', 'Evening'], axisLabel: { color: textColor } },
            visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', textStyle: { color: textColor }, inRange: { color: [colors.background, colors.chartColors[0]] } },
            series: [{
                type: 'heatmap',
                data: [[0, 0, 10], [0, 1, 20], [0, 2, 30], [1, 0, 40], [1, 1, 50], [1, 2, 60], [2, 0, 70], [2, 1, 80], [2, 2, 90], [3, 0, 10], [3, 1, 20], [3, 2, 30], [4, 0, 40], [4, 1, 50], [4, 2, 60]],
                label: { show: true }
            }]
        };

        // 7. Area
        this.areaChartOption = {
            backgroundColor: bgColor,
            tooltip: { trigger: 'axis', textStyle: { color: textColor } },
            legend: { textStyle: { color: textColor } },
            xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: { color: textColor } },
            yAxis: { type: 'value', axisLabel: { color: textColor } },
            series: [
                {
                    name: 'Stack 1', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' },
                    itemStyle: { color: colors.chartColors[0] }, data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Stack 2', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' },
                    itemStyle: { color: colors.chartColors[1] }, data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };
    }

    // Helper to generate random heatmap data
    private generateHeatmapData() {
        return []; // simplified for brevity in this rewrite, logic moved inline or simpler static data
    }

    // Snippets properties
    lineChartHtml = `<div echarts [options]="lineChartOption" class="chart"></div>`;
    lineChartTs = `// Dynamic options based on theme service`;
    barChartHtml = `...`;
    barChartTs = `...`;
    pieChartHtml = `...`;
    pieChartTs = `...`;
    gaugeChartHtml = `...`;
    gaugeChartTs = `...`;
    radarChartHtml = `...`;
    radarChartTs = `...`;
    heatmapChartHtml = `...`;
    heatmapChartTs = `...`;
    areaChartHtml = `...`;
    areaChartTs = `...`;

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
