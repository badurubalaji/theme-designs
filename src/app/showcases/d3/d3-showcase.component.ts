import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as d3 from 'd3';
import { ThemeService, ThemeColors } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-d3-showcase',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
    templateUrl: './d3-showcase.component.html',
    styleUrl: './d3-showcase.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class D3ShowcaseComponent implements AfterViewInit, OnDestroy {
    @ViewChild('forceGraphContainer') forceGraphContainer!: ElementRef;
    @ViewChild('sunburstContainer') sunburstContainer!: ElementRef;
    @ViewChild('treeContainer') treeContainer!: ElementRef;
    @ViewChild('chordContainer') chordContainer!: ElementRef;
    @ViewChild('streamContainer') streamContainer!: ElementRef;

    private simulations: any[] = [];
    private themeSubscription: Subscription | null = null;
    private currentColors: ThemeColors | null = null;

    // Legacy mapping properties for initial load before theme service kicks in
    private colors = {
        sky: '#4fc3f7',
        lavender: '#9575cd',
        sage: '#66bb6a',
        rose: '#f06292',
        amber: '#ffb74d'
    };
    private colorScale = d3.scaleOrdinal(Object.values(this.colors));

    constructor(private snackBar: MatSnackBar, private themeService: ThemeService) { }

    ngAfterViewInit() {
        this.themeSubscription = this.themeService.activeTheme$.subscribe(theme => {
            this.currentColors = this.themeService.getColors(theme);
            this.updateColorScale();
            this.createAllCharts();
        });
    }

    ngOnDestroy() {
        this.simulations.forEach(sim => sim.stop());
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe();
        }
    }

    updateColorScale() {
        if (this.currentColors) {
            this.colors.sky = this.currentColors.chartColors[0];
            this.colors.lavender = this.currentColors.chartColors[1];
            this.colors.sage = this.currentColors.chartColors[2];
            this.colors.rose = this.currentColors.chartColors[3];
            this.colors.amber = this.currentColors.chartColors[4];
            this.colorScale = d3.scaleOrdinal(this.currentColors.chartColors);
        }
    }

    createAllCharts() {
        setTimeout(() => {
            this.createForceGraph();
            this.createSunburst();
            this.createTree();
            this.createChordDiagram();
            this.createStreamgraph();
        }, 0);
    }

    // 1. Force Directed Graph
    createForceGraph() {
        if (!this.forceGraphContainer) return;
        const element = this.forceGraphContainer.nativeElement;
        const width = element.offsetWidth || 800;
        const height = 400;

        d3.select(element).selectAll('*').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height]);

        const data = {
            nodes: Array.from({ length: 20 }, (_, i) => ({ id: i, group: i % 5 })),
            links: Array.from({ length: 30 }, () => ({
                source: Math.floor(Math.random() * 20),
                target: Math.floor(Math.random() * 20)
            }))
        };

        const simulation = d3.forceSimulation(data.nodes as any)
            .force('link', d3.forceLink(data.links as any).id((d: any) => d.id).distance(50))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2));

        this.simulations.push(simulation);

        const link = svg.append('g')
            .attr('stroke', this.currentColors?.grid || 'rgba(255,255,255,0.2)')
            .selectAll('line')
            .data(data.links)
            .join('line')
            .attr('stroke-width', 1.5);

        const node = svg.append('g')
            .selectAll('circle')
            .data(data.nodes)
            .join('circle')
            .attr('r', 8)
            .attr('fill', (d: any) => this.colorScale(d.group.toString()) as string)
            .attr('stroke', this.currentColors?.background || '#fff')
            .attr('stroke-width', 1.5)
            .call(this.drag(simulation));

        simulation.on('tick', () => {
            link
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);

            node
                .attr('cx', (d: any) => d.x)
                .attr('cy', (d: any) => d.y);
        });
    }

    drag(simulation: any) {
        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended) as any;
    }

    // 2. Zoomable Sunburst
    createSunburst() {
        if (!this.sunburstContainer) return;
        const element = this.sunburstContainer.nativeElement;
        const width = element.offsetWidth || 800;
        const height = 400;
        const radius = Math.min(width, height) / 6;

        d3.select(element).selectAll('*').remove();

        const data = {
            name: "flare",
            children: [
                { name: "analytics", children: [{ name: "cluster", value: 3 }, { name: "graph", value: 4 }, { name: "optimization", value: 2 }] },
                { name: "animate", children: [{ name: "easing", value: 5 }, { name: "interpolate", value: 8 }, { name: "tween", value: 4 }] },
                { name: "display", children: [{ name: "dirty", value: 2 }, { name: "rect", value: 5 }] },
                { name: "physics", children: [{ name: "drag", value: 1 }, { name: "gravity", value: 3 }] }
            ]
        };

        const root = d3.hierarchy(data)
            .sum((d: any) => d.value)
            .sort((a, b) => (b.value || 0) - (a.value || 0));

        d3.partition().size([2 * Math.PI, root.height + 1])(root as any);

        const svg = d3.select(element).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [-width / 2, -height / 2, width, height]);

        const arc = d3.arc()
            .startAngle((d: any) => d.x0)
            .endAngle((d: any) => d.x1)
            .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius((d: any) => d.y0 * radius)
            .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1));

        svg.selectAll('path')
            .data(root.descendants().filter((d: any) => d.depth))
            .join('path')
            .attr('fill', (d: any) => {
                while (d.depth > 1) d = d.parent;
                return this.colorScale(d.data.name) as string;
            })
            .attr('opacity', 0.8)
            .attr('d', arc as any)
            .append('title')
            .text((d: any) => `${d.ancestors().map((d: any) => d.data.name).reverse().join("/")}\n${d.value}`);
    }

    // 3. Tree
    createTree() {
        if (!this.treeContainer) return;
        const element = this.treeContainer.nativeElement;
        const width = element.offsetWidth || 800;
        const height = 400;

        d3.select(element).selectAll('*').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [-50, -50, width, height + 100]);

        const data = {
            name: "Root",
            children: [
                { name: "Branch 1", children: [{ name: "Leaf A" }, { name: "Leaf B" }] },
                { name: "Branch 2", children: [{ name: "Leaf C" }, { name: "Leaf D" }, { name: "Leaf E" }] }
            ]
        };

        // Typings workaround
        const root = d3.hierarchy(data);
        const treeLayout = d3.tree().size([width - 100, height - 100]);
        treeLayout(root as any);

        svg.selectAll('path')
            .data(root.links())
            .join('path')
            .attr('d', d3.linkVertical().x((d: any) => d.x).y((d: any) => d.y) as any)
            .attr('fill', 'none')
            .attr('stroke', this.currentColors?.grid || 'rgba(255,255,255,0.3)')
            .attr('stroke-width', 2);

        const nodes = svg.selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

        nodes.append('circle')
            .attr('r', 8)
            .attr('fill', (d: any) => d.children ? this.colors.sky : this.colors.rose)
            .attr('stroke', this.currentColors?.background || '#fff')
            .attr('stroke-width', 2);

        nodes.append('text')
            .attr('dy', '0.31em')
            .attr('x', (d: any) => d.children ? -12 : 12)
            .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
            .text((d: any) => d.data.name)
            .attr('fill', this.currentColors?.text || '#e8e8e8')
            .style('font-size', '12px');
    }

    // 4. Chord Diagram
    createChordDiagram() {
        if (!this.chordContainer) return;
        const element = this.chordContainer.nativeElement;
        const width = element.offsetWidth || 800;
        const height = 400;
        const outerRadius = Math.min(width, height) * 0.5 - 30;
        const innerRadius = outerRadius - 20;

        d3.select(element).selectAll('*').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [-width / 2, -height / 2, width, height]);

        const matrix = [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ];

        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        const chords = chord(matrix);

        const group = svg.append('g').selectAll('g')
            .data(chords.groups)
            .join('g');

        group.append('path')
            .attr('fill', (d: any) => this.currentColors?.chartColors[d.index % 5] || '#4fc3f7')
            .attr('stroke', (d: any) => this.currentColors?.background || 'rgba(255,255,255,0.1)')
            .attr('d', d3.arc().innerRadius(innerRadius).outerRadius(outerRadius) as any);

        svg.append('g')
            .attr('fill-opacity', 0.67)
            .selectAll('path')
            .data(chords)
            .join('path')
            .attr('d', d3.ribbon().radius(innerRadius) as any)
            .attr('fill', (d: any) => this.currentColors?.chartColors[d.target.index % 5] || '#9575cd')
            .attr('stroke', (d: any) => this.currentColors?.background || 'rgba(255,255,255,0.1)');
    }

    // 5. Streamgraph
    createStreamgraph() {
        if (!this.streamContainer) return;
        const element = this.streamContainer.nativeElement;
        const width = element.offsetWidth || 800;
        const height = 400;

        d3.select(element).selectAll('*').remove();

        const svg = d3.select(element).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height]);

        const n = 20, m = 200;
        const stack = d3.stack().keys(d3.range(n).map(String)).offset(d3.stackOffsetWiggle);

        const data = d3.range(m).map((i) => {
            const obj: any = { x: i };
            d3.range(n).forEach(j => obj[j] = Math.max(0, Math.sin(i / 10 + j) + Math.random()));
            return obj;
        });

        const series = stack(data);

        const x = d3.scaleLinear().domain([0, m - 1]).range([0, width]);
        const y = d3.scaleLinear().domain([d3.min(series, layer => d3.min(layer, d => d[0])) as number, d3.max(series, layer => d3.max(layer, d => d[1])) as number]).range([height, 0]);

        const area = d3.area()
            .x((d: any, i) => x(i))
            .y0((d: any) => y(d[0]))
            .y1((d: any) => y(d[1]))
            .curve(d3.curveBasis);

        svg.selectAll('path')
            .data(series)
            .join('path')
            .attr('d', area as any)
            .attr('fill', (d: any) => {
                const index = parseInt(d.key);
                return this.currentColors?.chartColors[index % 5] || '#4fc3f7';
            })
            .attr('opacity', 0.8)
            .attr('stroke', this.currentColors?.grid || 'transparent');
    }

    // Code Snippets
    forceGraphHtml = `<div #forceGraphContainer class="d3-container"></div>`;
    forceGraphTs = `createForceGraph() {
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));
  // ... render nodes and links using SVG
}`;

    sunburstHtml = `<div #sunburstContainer class="d3-container"></div>`;
    sunburstTs = `createSunburst() {
  const root = d3.hierarchy(data).sum(d => d.value);
  d3.partition().size([2 * Math.PI, radius])(root);
  const arc = d3.arc()...;
  svg.selectAll('path').data(root.descendants()).join('path').attr('d', arc);
}`;

    treeHtml = `<div #treeContainer class="d3-container"></div>`;
    treeTs = `createTree() {
  const root = d3.hierarchy(data);
  d3.tree().size([width, height])(root);
  svg.selectAll('path').data(root.links()).join('path').attr('d', d3.linkVertical()...);
  svg.selectAll('circle').data(root.descendants()).join('circle')...;
}`;

    chordHtml = `<div #chordContainer class="d3-container"></div>`;
    chordTs = `createChordDiagram() {
  const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
  const chords = chord(matrix);
  // Render groups (arcs) and ribbons (connections)
}`;

    streamHtml = `<div #streamContainer class="d3-container"></div>`;
    streamTs = `createStreamgraph() {
  const stack = d3.stack().offset(d3.stackOffsetWiggle);
  const series = stack(data);
  const area = d3.area().curve(d3.curveBasis);
  // Render paths with smooth curves
}`;

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
