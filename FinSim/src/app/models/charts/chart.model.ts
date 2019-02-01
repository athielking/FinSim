import { ChartData } from './chart-data.model';

export class ChartModel {
    constructor(public type: string = 'line',
                public labels: string[],
                public series: ChartData[]) {
    }
}
