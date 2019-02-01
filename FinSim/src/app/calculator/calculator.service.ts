import { Inject } from '@angular/core';
import { Simulation } from '../models/simulation/simulation.model';
import { SimulationResult } from '../models/simulation/simulationResult.model';
import { Investment } from '../models/simulation/investment.model';
import { NumberOfWeeks, HistoricalSP500Returns } from '../models/constants';
import { InvestmentYearResult } from '../models/simulation/investmentYearResult.model';
import { InvestmentResult } from '../models/simulation/investmentResult.model';
import { SimulationRunResult } from '../models/simulation/simulationRunResult.model';
import { ChartData } from '../models/charts/chart-data.model';
import { ChartModel } from '../models/charts/chart.model';

@Inject({
    providedIn: 'root'
})
export class CalculatorService {

    public runSimulations(simulations: Simulation[], numberOfRuns: number) {
        const results: SimulationResult[] = [];

        simulations.forEach( s => results.push(this.runSimulation(s, numberOfRuns)));

        return results;
    }

    private runSimulation(simulation: Simulation, numberOfRuns: number) {
        const maxYears = simulation.investments.map( i => i.numberOfYears).reduce( (p, c) => Math.max(p, c), 0);

        const runResults: SimulationRunResult[] = [];
        for ( let runIndex = 0; runIndex < numberOfRuns; runIndex++ ) {

            const runResult = new SimulationRunResult();
            const iResults: InvestmentResult[] = [];

            simulation.investments.forEach( investment => iResults.push(new InvestmentResult(investment.id, investment.name)));

            for ( let yearIndex = 0; yearIndex < maxYears; yearIndex++ ) {

                const rateOfReturn = this.getTheoreticalRateOfReturn();
                for ( let k = 0; k < simulation.investments.length; k++) {
                    const investment = simulation.investments[k];
                    const result = iResults.find( r => r.id === investment.id );

                    let prevPrincipal: number;
                    if (result.yearResults.length > 0) {
                        prevPrincipal = result.yearResults[result.yearResults.length - 1].endingPrincipal;
                    }

                    result.yearResults.push(this.calculateYear(investment, rateOfReturn, yearIndex, prevPrincipal));
                }
            }

            runResult.investmentResults = iResults;
            runResults.push(runResult);
        }

        const averages = this.calculateInvestmentAverages(simulation, runResults);
        const simResult = new SimulationResult(simulation.id, simulation.name, runResults, averages);
        simResult.chart = this.getChartModel(averages);

        return simResult;
    }

    private calculateYear(investment: Investment, rateOfReturn: number, yearIndex: number, prevPrincipal?: number): InvestmentYearResult {

        const result = new InvestmentYearResult();
        result.startingPrincipal = prevPrincipal ? prevPrincipal : investment.principal;

        const n = (NumberOfWeeks / <number>investment.compoundingFrequency);
        const rate = (rateOfReturn / n) / 100;

        let amount = result.startingPrincipal;

        for (let i = 1; i <= NumberOfWeeks; i++) {

            let aggregate = 0;
            if ( i % <number>investment.compoundingFrequency === 0) {
                aggregate = amount * rate;
            }

            aggregate += this.getTotalContributionAmount(investment, yearIndex, i);
            amount += aggregate;
        }

        result.endingPrincipal = amount;
        result.rateOfReturn = rateOfReturn;

        return result;
    }

    private getTotalContributionAmount(investment: Investment, year: number, week: number) {
        return investment.contributions.map( c => c.getContributionAmount(year, week)).reduce((p, c) => p + c, 0);
    }

    private getTheoreticalRateOfReturn(): number {
        const randomIndex = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) % HistoricalSP500Returns.length;

        const indexes = [randomIndex];
        indexes.push( randomIndex + 1 >= HistoricalSP500Returns.length ? randomIndex - 2 : randomIndex + 1);
        indexes.push( randomIndex - 1 < 0 ? randomIndex + 2 : randomIndex - 1);

        let rate = 0;
        indexes.forEach( i => rate += HistoricalSP500Returns[i]);
        rate /= 3;

        return rate;
    }

    private calculateInvestmentAverages(simulation: Simulation, results: SimulationRunResult[]): InvestmentResult[] {
        const investmentAverages: InvestmentResult[] = [];

        simulation.investments.forEach( investment => {
            const investmentResults = results.map( s => s.investmentResults.find( i => i.id === investment.id));

            const yearAverages: InvestmentYearResult[] = [];
            const maxYear = investmentResults.map( r => r.yearResults.length).reduce( (p, c) => Math.max(p, c), 0);

            for ( let i = 0; i < maxYear; i++) {
                const avgRate = investmentResults.map( r => r.yearResults[i].rateOfReturn ).reduce( (p, c) => p + c, 0) / results.length;
                const avgStart =
                    investmentResults.map( r => r.yearResults[i].startingPrincipal ).reduce( (p, c) => p + c, 0) / results.length;
                const avgEnd = investmentResults.map( r => r.yearResults[i].endingPrincipal).reduce( (p, c) => p + c, 0) / results.length;

                const avgResult = new  InvestmentYearResult();
                avgResult.endingPrincipal = avgEnd;
                avgResult.rateOfReturn = avgRate;
                avgResult.startingPrincipal = avgStart;

                yearAverages.push(avgResult);
            }

            investmentAverages.push( new InvestmentResult(investment.id, investment.name, yearAverages));
        });

        return investmentAverages;
    }

    private getChartModel(investmentResults: InvestmentResult[]) {
        const chartSeries: ChartData[] = [];

        let labels: string[];
        investmentResults.forEach( inv => {
            let data = [inv.yearResults[0].startingPrincipal];
            data = data.concat(inv.yearResults.map( y => y.endingPrincipal ));

            if (!labels) {
                labels = Array.from({length: inv.yearResults.length}, (x, i) => i.toString());
            }

            chartSeries.push(new ChartData(data, inv.name));
        });

        return new ChartModel('line', labels, chartSeries);
    }
}
