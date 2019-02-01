import { SimulationRunResult } from './simulationRunResult.model';
import { InvestmentResult } from './investmentResult.model';
import { ChartModel } from '../charts/chart.model';

export class SimulationResult {

    public runResults: SimulationRunResult[] = [];
    public averageInvestments: InvestmentResult[] = [];
    public chart: ChartModel;

    constructor(public id: number,
                public name: string,
                runResults?: SimulationRunResult[],
                averageInvestments?: InvestmentResult[] ) {

        if (runResults) {
            this.runResults = runResults;
        }

        if (averageInvestments) {
            this.averageInvestments = averageInvestments;
        }
    }
}
