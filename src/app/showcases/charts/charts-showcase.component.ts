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

        // Base Configuration
        const textColor = colors.text;
        const gridColor = isGlass ? 'rgba(255,255,255,0.1)' : (isMinimal ? 'transparent' : colors.grid);
        const axisLineColor = colors.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
        const splitLineColor = isMinimal ? 'transparent' : (colors.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)');
        const bgColor = 'transparent';

        // 1. Line Chart
        this.lineChartOption = {
            backgroundColor: bgColor,
            tooltip: {
                trigger: 'axis',
                backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.2)' : (colors.isDark ? 'rgba(20, 25, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)'),
                borderColor: isGlass ? 'rgba(255,255,255,0.5)' : colors.primary,
                borderWidth: isGlass ? 1 : 1,
                extraCssText: isGlass ? 'backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : '',
                textStyle: { color: textColor }
            },
            legend: { textStyle: { color: textColor }, top: 0 },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true, borderColor: gridColor, show: !isMinimal },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                axisLine: { lineStyle: { color: isMinimal ? textColor : axisLineColor, width: isMinimal ? 2 : 1 } },
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: splitLineColor }, show: !isMinimal }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: axisLineColor }, show: !isMinimal },
                axisLabel: { color: textColor },
                splitLine: { lineStyle: { color: splitLineColor }, show: !isMinimal }
            },
            series: [{
                name: 'CPU',
                type: 'line',
                smooth: !isMinimal && !isCrystal, // Minimal/Crystal use straight lines
                symbol: isCrystal ? 'diamond' : (isMinimal ? 'circle' : 'none'),
                symbolSize: isCrystal ? 8 : 4,
                lineStyle: {
                    width: isNeumorphic ? 5 : (isMinimal ? 2 : 3),
                    shadowBlur: isNeumorphic || isFuturistic ? 10 : 0,
                    shadowOffsetY: isNeumorphic ? 5 : 0,
                    shadowColor: isNeumorphic ? 'rgba(0,0,0,0.2)' : (isFuturistic ? colors.chartColors[0] : 'transparent'),
                    color: colors.chartColors[0]
                },
                areaStyle: {
                    opacity: isMinimal ? 0 : (isNeumorphic ? 0.1 : 0.4),
                    color: isGlass ? {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: 'rgba(255, 255, 255, 0.4)' }, { offset: 1, color: 'rgba(255, 255, 255, 0)' }]
                    } : {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: colors.chartColors[0] }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                    }
                },
                data: [45, 52, 48, 65, 72, 68, 58]
            }, {
                name: 'Memory',
                type: 'line',
                smooth: !isMinimal && !isCrystal,
                symbol: isCrystal ? 'diamond' : (isMinimal ? 'circle' : 'none'),
                symbolSize: isCrystal ? 8 : 4,
                lineStyle: {
                    width: isNeumorphic ? 5 : (isMinimal ? 2 : 3),
                    shadowBlur: isNeumorphic || isFuturistic ? 10 : 0,
                    shadowOffsetY: isNeumorphic ? 5 : 0,
                    shadowColor: isNeumorphic ? 'rgba(0,0,0,0.2)' : (isFuturistic ? colors.chartColors[1] : 'transparent'),
                    color: colors.chartColors[1]
                },
                areaStyle: {
                    opacity: isMinimal ? 0 : (isNeumorphic ? 0.1 : 0.4),
                    color: isGlass ? {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: 'rgba(255, 255, 255, 0.4)' }, { offset: 1, color: 'rgba(255, 255, 255, 0)' }]
                    } : {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: colors.chartColors[1] }, { offset: 1, color: 'rgba(0,0,0,0)' }]
                    }
                },
                data: [30, 38, 42, 45, 50, 48, 44]
            }]
        };

        // 2. Bar Chart
        this.barChartOption = {
            backgroundColor: bgColor,
            tooltip: { trigger: 'axis', backgroundColor: isGlass ? 'rgba(255,255,255,0.2)' : undefined, extraCssText: isGlass ? 'backdrop-filter: blur(5px);' : '' },
            legend: { textStyle: { color: textColor } },
            xAxis: { type: 'value', axisLabel: { color: textColor }, splitLine: { lineStyle: { color: splitLineColor }, show: !isMinimal } },
            yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], axisLabel: { color: textColor } },
            series: [{
                name: '2023', type: 'bar', data: [120, 200, 150, 80, 70],
                itemStyle: {
                    color: isMinimal ? '#000' : colors.chartColors[0],
                    borderRadius: isNeumorphic ? [0, 10, 10, 0] : (isCrystal ? 0 : [0, 4, 4, 0]),
                    shadowBlur: isNeumorphic ? 6 : (isFuturistic ? 10 : 0),
                    shadowColor: isNeumorphic ? 'rgba(0,0,0,0.2)' : (isFuturistic ? colors.chartColors[0] : 'transparent')
                },
                barWidth: isNeumorphic ? '40%' : 'auto'
            }, {
                name: '2024', type: 'bar', data: [160, 240, 180, 110, 95],
                itemStyle: {
                    color: isMinimal ? '#888' : colors.chartColors[1],
                    borderRadius: isNeumorphic ? [0, 10, 10, 0] : (isCrystal ? 0 : [0, 4, 4, 0]),
                    shadowBlur: isNeumorphic ? 6 : (isFuturistic ? 10 : 0),
                    shadowColor: isNeumorphic ? 'rgba(0,0,0,0.2)' : (isFuturistic ? colors.chartColors[1] : 'transparent')
                },
                barWidth: isNeumorphic ? '40%' : 'auto'
            }]
        };

        // 3. Pie Chart (Traffic Distribution) - Optimized for Themes
        const pieRadius = isNeumorphic ? ['40%', '70%'] : (isMinimal ? ['50%', '70%'] : ['0%', '70%']);

        // Data for Pie
        const pieData = [
            { value: 1048, name: 'Search', itemStyle: { color: colors.chartColors[0], borderColor: isGlass ? 'rgba(255,255,255,0.5)' : 'transparent', borderWidth: isGlass ? 1 : 0 } },
            { value: 735, name: 'Direct', itemStyle: { color: colors.chartColors[1], borderColor: isGlass ? 'rgba(255,255,255,0.5)' : 'transparent', borderWidth: isGlass ? 1 : 0 } },
            { value: 580, name: 'Email', itemStyle: { color: colors.chartColors[2], borderColor: isGlass ? 'rgba(255,255,255,0.5)' : 'transparent', borderWidth: isGlass ? 1 : 0 } },
            { value: 484, name: 'Union Ads', itemStyle: { color: colors.chartColors[3], borderColor: isGlass ? 'rgba(255,255,255,0.5)' : 'transparent', borderWidth: isGlass ? 1 : 0 } },
            { value: 300, name: 'Video Ads', itemStyle: { color: colors.chartColors[4], borderColor: isGlass ? 'rgba(255,255,255,0.5)' : 'transparent', borderWidth: isGlass ? 1 : 0 } }
        ];

        if (isNeumorphic) {
            // Neumorphic Specific Configuration (Complexity)
            this.pieChartOption = {
                backgroundColor: bgColor,
                tooltip: { trigger: 'item', backgroundColor: colors.isDark ? 'rgba(20, 25, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)', borderColor: colors.primary, textStyle: { color: textColor } },
                legend: { orient: 'vertical', left: 'left', textStyle: { color: textColor } },
                series: [
                    { type: 'pie', radius: ['34%', '76%'], center: ['60%', '50%'], silent: true, itemStyle: { color: colors.background, shadowBlur: 15, shadowOffsetX: 5, shadowOffsetY: 5, shadowColor: 'rgba(255,255,255,1)' }, data: [{ value: 1 }], z: 0 },
                    { type: 'pie', radius: ['34%', '76%'], center: ['60%', '50%'], silent: true, itemStyle: { color: 'transparent', shadowBlur: 15, shadowOffsetX: -5, shadowOffsetY: -5, shadowColor: 'rgba(0,0,0,0.2)' }, data: [{ value: 1 }], z: 1 },
                    { name: 'Traffic Source', type: 'pie', radius: ['40%', '70%'], center: ['60%', '50%'], avoidLabelOverlap: false, itemStyle: { borderRadius: 10, borderColor: colors.background, borderWidth: 3, shadowBlur: 5, shadowColor: 'rgba(0,0,0,0.3)' }, label: { show: false, position: 'center' }, emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold', color: textColor }, itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }, labelLine: { show: false }, data: pieData, z: 2 }
                ]
            };
        } else {
            // Standard / Glass / Minimal / Futuristic
            this.pieChartOption = {
                backgroundColor: bgColor,
                tooltip: { trigger: 'item', textStyle: { color: textColor } },
                legend: { orient: 'vertical', left: 'left', textStyle: { color: textColor } },
                series: [{
                    name: 'Traffic Source',
                    type: 'pie',
                    radius: pieRadius,
                    center: ['60%', '50%'],
                    data: pieData,
                    itemStyle: {
                        borderRadius: isMinimal ? 0 : 5,
                        borderColor: isMinimal ? '#fff' : (isGlass ? 'rgba(255,255,255,0.2)' : 'transparent'),
                        borderWidth: isMinimal || isGlass ? 2 : 0,
                        shadowBlur: isFuturistic ? 20 : 0,
                        shadowColor: isFuturistic ? colors.primary : 'transparent'
                    }
                }]
            };
        }

        // 4. Gauge Chart
        this.gaugeChartOption = {
            backgroundColor: bgColor,
            series: [{
                type: 'gauge',
                axisLine: {
                    lineStyle: {
                        width: isMinimal ? 5 : 20,
                        color: isMinimal
                            ? [[1, '#000']]
                            : [[0.3, colors.chartColors[2]], [0.7, colors.chartColors[0]], [1, colors.chartColors[3]]],
                        shadowBlur: isFuturistic ? 10 : 0,
                        shadowColor: isFuturistic ? colors.chartColors[0] : 'transparent'
                    }
                },
                pointer: { itemStyle: { color: isMinimal ? '#000' : colors.text } },
                axisTick: { lineStyle: { color: isMinimal ? '#000' : colors.text }, show: !isGlass },
                splitLine: { lineStyle: { color: isMinimal ? '#000' : colors.text }, show: !isGlass },
                axisLabel: { color: textColor },
                detail: { color: colors.chartColors[0], formatter: '{value}%', textShadowBlur: isFuturistic ? 5 : 0, textShadowColor: isFuturistic ? colors.chartColors[0] : 'transparent' },
                data: [{ value: 73, name: 'Perf' }]
            }]
        };

        // 5. Radar
        this.radarChartOption = {
            backgroundColor: bgColor,
            legend: { textStyle: { color: textColor } },
            radar: {
                indicator: [{ name: 'A', max: 100 }, { name: 'B', max: 100 }, { name: 'C', max: 100 }, { name: 'D', max: 100 }, { name: 'E', max: 100 }],
                axisName: { color: textColor },
                shape: isCrystal ? 'polygon' : 'circle',
                splitArea: { show: !isMinimal, areaStyle: { color: isGlass ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'] : undefined } }
            },
            series: [{
                type: 'radar',
                data: [
                    {
                        value: [80, 70, 95, 65, 90],
                        name: 'Data 1',
                        itemStyle: { color: colors.chartColors[0] },
                        areaStyle: { opacity: isGlass ? 0.5 : 0.3 }
                    },
                    {
                        value: [70, 85, 88, 78, 82],
                        name: 'Data 2',
                        itemStyle: { color: colors.chartColors[1] },
                        areaStyle: { opacity: isGlass ? 0.5 : 0.3 }
                    }
                ],
                lineStyle: {
                    width: isNeumorphic ? 4 : 2,
                    shadowBlur: isFuturistic ? 10 : 0,
                    shadowColor: isFuturistic ? colors.primary : 'transparent'
                }
            }]
        };

        // 6. Heatmap
        this.heatmapChartOption = {
            backgroundColor: bgColor,
            tooltip: { position: 'top', textStyle: { color: textColor } },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], axisLabel: { color: textColor } },
            yAxis: { type: 'category', data: ['Morning', 'Afternoon', 'Evening'], axisLabel: { color: textColor } },
            visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', textStyle: { color: textColor }, inRange: { color: isMinimal ? ['#fff', '#000'] : [colors.background, colors.chartColors[0]] } },
            series: [{
                type: 'heatmap',
                data: this.generateHeatmapData(),
                label: { show: true },
                itemStyle: {
                    borderColor: isGlass ? 'rgba(255,255,255,0.5)' : (isCrystal ? colors.background : 'transparent'),
                    borderWidth: isGlass || isCrystal ? 1 : 0
                }
            }]
        };

        // 7. Area
        this.areaChartOption = {
            backgroundColor: bgColor,
            tooltip: { trigger: 'axis', textStyle: { color: textColor }, extraCssText: isGlass ? 'backdrop-filter: blur(5px);' : '' },
            legend: { textStyle: { color: textColor } },
            xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: { color: textColor }, splitLine: { show: !isMinimal } },
            yAxis: { type: 'value', axisLabel: { color: textColor }, splitLine: { show: !isMinimal } },
            series: [
                {
                    name: 'Stack 1', type: 'line', stack: 'Total', areaStyle: { opacity: isGlass ? 0.6 : 0.5 }, emphasis: { focus: 'series' },
                    itemStyle: { color: colors.chartColors[0] }, data: [120, 132, 101, 134, 90, 230, 210],
                    smooth: !isMinimal
                },
                {
                    name: 'Stack 2', type: 'line', stack: 'Total', areaStyle: { opacity: isGlass ? 0.6 : 0.5 }, emphasis: { focus: 'series' },
                    itemStyle: { color: colors.chartColors[1] }, data: [220, 182, 191, 234, 290, 330, 310],
                    smooth: !isMinimal
                }
            ]
        };
    }

    // Helper to generate random heatmap data
    private generateHeatmapData() {
        return [[0, 0, 10], [0, 1, 20], [0, 2, 30], [1, 0, 40], [1, 1, 50], [1, 2, 60], [2, 0, 70], [2, 1, 80], [2, 2, 90], [3, 0, 10], [3, 1, 20], [3, 2, 30], [4, 0, 40], [4, 1, 50], [4, 2, 60]];
    }

    // Snippets properties
    lineChartHtml = `<div echarts [options]="lineChartOption" class="chart"></div>`;
    lineChartTs = `// Theme-aware configuration`;
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
