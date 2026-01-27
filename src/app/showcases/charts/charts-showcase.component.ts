import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-charts-showcase',
    standalone: true,
    imports: [CommonModule, NgxEchartsModule, MatButtonModule, MatIconModule, MatSnackBarModule],
    templateUrl: './charts-showcase.component.html',
    styleUrl: './charts-showcase.component.scss'
})
export class ChartsShowcaseComponent {
    constructor(private snackBar: MatSnackBar) { }
    // Futuristic color palette - subtle and eye-friendly
    private colors = {
        cyan: '#4fc3f7',      // Soft sky blue (was harsh electric cyan)
        purple: '#9575cd',    // Muted lavender purple (was bright neon purple)
        green: '#66bb6a',     // Sage green (was bright matrix green)
        pink: '#f06292',      // Soft rose pink (was harsh neon pink)
        orange: '#ffb74d',    // Warm amber (was bright cyber orange)
        blue: '#5c6bc0',      // Indigo blue (was electric blue)
        red: '#ef5350'        // Coral red (was bright neon red)
    };

    // 1. Line Chart - Real-time Monitoring
    lineChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(20, 25, 35, 0.9)',
            borderColor: 'rgba(0, 217, 255, 0.3)',
            borderWidth: 1,
            textStyle: { color: '#e8e8e8' },
            axisPointer: {
                type: 'cross',
                lineStyle: {
                    color: this.colors.cyan,
                    type: 'dashed'
                }
            }
        },
        legend: {
            data: ['CPU Usage', 'Memory Usage'],
            textStyle: { color: '#e8e8e8' },
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            borderColor: 'rgba(255,255,255,0.1)'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888', formatter: '{value}%' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        series: [
            {
                name: 'CPU Usage',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: this.colors.cyan },
                lineStyle: { width: 3, color: this.colors.cyan },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(0, 217, 255, 0.4)' },
                            { offset: 1, color: 'rgba(0, 217, 255, 0.05)' }
                        ]
                    }
                },
                data: [45, 52, 48, 65, 72, 68, 58]
            },
            {
                name: 'Memory Usage',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: this.colors.purple },
                lineStyle: { width: 3, color: this.colors.purple },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(189, 0, 255, 0.4)' },
                            { offset: 1, color: 'rgba(189, 0, 255, 0.05)' }
                        ]
                    }
                },
                data: [30, 38, 42, 45, 50, 48, 44]
            }
        ]
    };

    // 2. Bar Chart - Performance Metrics
    barChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(20, 25, 35, 0.9)',
            borderColor: 'rgba(0, 217, 255, 0.3)',
            borderWidth: 1,
            textStyle: { color: '#e8e8e8' },
            axisPointer: { type: 'shadow' }
        },
        legend: {
            data: ['2023', '2024'],
            textStyle: { color: '#e8e8e8' },
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' }
        },
        series: [
            {
                name: '2023',
                type: 'bar',
                data: [120, 200, 150, 80, 70, 110, 130],
                itemStyle: {
                    color: this.colors.cyan,
                    borderRadius: [0, 4, 4, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: this.colors.cyan
                    }
                }
            },
            {
                name: '2024',
                type: 'bar',
                data: [160, 240, 180, 110, 95, 145, 170],
                itemStyle: {
                    color: this.colors.purple,
                    borderRadius: [0, 4, 4, 0]
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: this.colors.purple
                    }
                }
            }
        ]
    };

    // 3. Pie Chart - Data Distribution
    pieChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(20, 25, 35, 0.9)',
            borderColor: 'rgba(0, 217, 255, 0.3)',
            borderWidth: 1,
            textStyle: { color: '#e8e8e8' },
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: { color: '#e8e8e8' }
        },
        series: [
            {
                name: 'Traffic Source',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: 'rgba(10, 12, 18, 1)',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside',
                    color: '#e8e8e8',
                    formatter: '{b}: {d}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        shadowBlur: 15,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 217, 255, 0.5)'
                    }
                },
                labelLine: {
                    show: true,
                    lineStyle: { color: 'rgba(255,255,255,0.3)' }
                },
                data: [
                    { value: 1048, name: 'Search Engine', itemStyle: { color: this.colors.cyan } },
                    { value: 735, name: 'Direct', itemStyle: { color: this.colors.purple } },
                    { value: 580, name: 'Email', itemStyle: { color: this.colors.green } },
                    { value: 484, name: 'Union Ads', itemStyle: { color: this.colors.pink } },
                    { value: 300, name: 'Video Ads', itemStyle: { color: this.colors.orange } }
                ]
            }
        ]
    };

    // 4. Gauge Chart - Progress Indicator
    gaugeChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 10,
                radius: '90%',
                center: ['50%', '70%'],
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [
                            [0.3, this.colors.green],
                            [0.7, this.colors.cyan],
                            [1, this.colors.pink]
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                    length: '75%',
                    width: 8,
                    offsetCenter: [0, '-20%'],
                    itemStyle: {
                        color: '#fff',
                        shadowColor: this.colors.cyan,
                        shadowBlur: 10
                    }
                },
                axisTick: {
                    length: 8,
                    lineStyle: { color: 'rgba(255,255,255,0.2)', width: 2 }
                },
                splitLine: {
                    length: 15,
                    lineStyle: { color: 'rgba(255,255,255,0.3)', width: 3 }
                },
                axisLabel: {
                    color: '#888',
                    fontSize: 12,
                    distance: -50,
                    formatter: (value: number) => {
                        if (value === 25) return 'Low';
                        if (value === 50) return 'Med';
                        if (value === 75) return 'High';
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '20%'],
                    fontSize: 16,
                    color: '#e8e8e8'
                },
                detail: {
                    fontSize: 40,
                    offsetCenter: [0, '-10%'],
                    valueAnimation: true,
                    formatter: '{value}%',
                    color: this.colors.cyan
                },
                data: [{ value: 73, name: 'Performance' }]
            }
        ]
    };

    // 5. Radar Chart - Multi-dimensional Analysis
    radarChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            backgroundColor: 'rgba(20, 25, 35, 0.9)',
            borderColor: 'rgba(0, 217, 255, 0.3)',
            borderWidth: 1,
            textStyle: { color: '#e8e8e8' }
        },
        legend: {
            data: ['Allocated', 'Actual'],
            textStyle: { color: '#e8e8e8' },
            top: 0
        },
        radar: {
            indicator: [
                { name: 'Sales', max: 100 },
                { name: 'Admin', max: 100 },
                { name: 'IT', max: 100 },
                { name: 'Support', max: 100 },
                { name: 'Dev', max: 100 },
                { name: 'Marketing', max: 100 }
            ],
            splitArea: {
                areaStyle: {
                    color: ['rgba(0, 217, 255, 0.05)', 'rgba(189, 0, 255, 0.05)']
                }
            },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisName: {
                color: '#e8e8e8',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        series: [
            {
                name: 'Budget vs Actual',
                type: 'radar',
                data: [
                    {
                        value: [80, 70, 95, 65, 90, 75],
                        name: 'Allocated',
                        itemStyle: { color: this.colors.cyan },
                        areaStyle: { color: 'rgba(0, 217, 255, 0.2)' }
                    },
                    {
                        value: [70, 85, 88, 78, 82, 80],
                        name: 'Actual',
                        itemStyle: { color: this.colors.purple },
                        areaStyle: { color: 'rgba(189, 0, 255, 0.2)' }
                    }
                ]
            }
        ]
    };

    // 6. Heatmap - Data Intensity
    heatmapChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            position: 'top',
            backgroundColor: 'rgba(20, 25, 35, 0.9)',
            borderColor: 'rgba(0, 217, 255, 0.3)',
            borderWidth: 1,
            textStyle: { color: '#e8e8e8' },
            formatter: (params: any) => {
                return `${params.name}: ${params.value[2]}`;
            }
        },
        grid: {
            height: '70%',
            top: '10%',
            left: '3%',
            right: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' },
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: ['Morning', 'Afternoon', 'Evening', 'Night'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' },
            splitArea: { show: true }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            textStyle: { color: '#e8e8e8' },
            inRange: {
                color: ['#0a0c12', this.colors.cyan]
            }
        },
        series: [
            {
                name: 'Activity',
                type: 'heatmap',
                data: this.generateHeatmapData(),
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: this.colors.cyan
                    }
                }
            }
        ]
    };

    // 7. Area Chart - Stacked Trends
    areaChartOption: EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(20, 25, 35, 0.9)',
            borderColor: 'rgba(0, 217, 255, 0.3)',
            borderWidth: 1,
            textStyle: { color: '#e8e8e8' },
            axisPointer: {
                type: 'cross',
                label: { backgroundColor: '#6a7985' }
            }
        },
        legend: {
            data: ['Frontend', 'Backend', 'Database', 'DevOps'],
            textStyle: { color: '#e8e8e8' },
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
            axisLabel: { color: '#888' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        series: [
            {
                name: 'Frontend',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: { opacity: 0.8, color: this.colors.cyan },
                emphasis: { focus: 'series' },
                data: [140, 232, 191, 234, 290, 330, 310]
            },
            {
                name: 'Backend',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: { opacity: 0.8, color: this.colors.purple },
                emphasis: { focus: 'series' },
                data: [120, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Database',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: { opacity: 0.8, color: this.colors.green },
                emphasis: { focus: 'series' },
                data: [90, 120, 140, 170, 200, 220, 240]
            },
            {
                name: 'DevOps',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: { width: 0 },
                showSymbol: false,
                areaStyle: { opacity: 0.8, color: this.colors.pink },
                emphasis: { focus: 'series' },
                data: [80, 100, 110, 130, 150, 180, 200]
            }
        ]
    };

    // Helper method to generate heatmap data
    private generateHeatmapData(): [number, number, number][] {
        const data: [number, number, number][] = [];
        const times = ['Morning', 'Afternoon', 'Evening', 'Night'];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        for (let i = 0; i < times.length; i++) {
            for (let j = 0; j < days.length; j++) {
                const value = Math.floor(Math.random() * 100);
                data.push([j, i, value]);
            }
        }
        return data;
    }

    // Code snippets for copying
    lineChartHtml = `<div echarts [options]="lineChartOption" class="chart"></div>`;
    lineChartTs = `lineChartOption: E ChartsOption = {
  xAxis: { type: 'category', data: ['00:00', '04:00', ...] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [45, 52, 48, ...] }]
};`;

    barChartHtml = `<div echarts [options]="barChartOption" class="chart"></div>`;
    barChartTs = `barChartOption: EChartsOption = {
  xAxis: { type: 'value' },
  yAxis: { type: 'category', data: ['Mon', 'Tue', ...] },
  series: [{ type: 'bar', data: [120, 200, 150, ...] }]
};`;

    pieChartHtml = `<div echarts [options]="pieChartOption" class="chart"></div>`;
    pieChartTs = `pieChartOption: EChartsOption = {
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    data: [{ value: 1048, name: 'Search' }, ...]
  }]
};`;

    gaugeChartHtml = `<div echarts [options]="gaugeChartOption" class="chart"></div>`;
    gaugeChartTs = `gaugeChartOption: EChartsOption = {
  series: [{
    type: 'gauge',
    axisLine: { lineStyle: { width: 20 } },
    detail: { valueAnimation: true, formatter: '{value}%' },
    data: [{ value: 73, name: 'Performance' }]
  }]
};`;

    radarChartHtml = `<div echarts [options]="radarChartOption" class="chart"></div>`;
    radarChartTs = `radarChartOption: EChartsOption = {
  radar: { indicator: [{ name: 'Sales', max: 100 }, ...] },
  series: [{
    type: 'radar',
    data: [{ value: [80, 70...], name: 'Allocated' }, ...]
  }]
};`;

    heatmapChartHtml = `<div echarts [options]="heatmapChartOption" class="chart"></div>`;
    heatmapChartTs = `heatmapChartOption: EChartsOption = {
  visualMap: { min: 0, max: 100 },
  xAxis: { type: 'category', data: ['Mon', 'Tue', ...] },
  yAxis: { type: 'category', data: ['Morning', ...] },
  series: [{ type: 'heatmap', data: [[0,0,5], ...] }]
};`;

    areaChartHtml = `<div echarts [options]="areaChartOption" class="chart"></div>`;
    areaChartTs = `areaChartOption: EChartsOption = {
  xAxis: { type: 'category', boundaryGap: false },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',
    areaStyle: { opacity: 0.8 },
    stack: 'Total',
    data: [140, 232, ...]
  }]
};`;

    // Code copy functionality
    copyCode(code: string, type: string) {
        navigator.clipboard.writeText(code).then(() => {
            this.snackBar.open(`${type} code copied!`, 'Close', {
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
