import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEchartsCore } from 'ngx-echarts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart, GaugeChart, RadarChart, HeatmapChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { routes } from './app.routes';

// Register ECharts modules
echarts.use([
  LineChart, BarChart, PieChart, GaugeChart, RadarChart, HeatmapChart,
  GridComponent, TooltipComponent, LegendComponent, VisualMapComponent,
  CanvasRenderer
]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideEchartsCore({ echarts }),
    provideCharts(withDefaultRegisterables()),
  ]
};
