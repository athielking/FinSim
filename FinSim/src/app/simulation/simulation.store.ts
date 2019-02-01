import { Injectable } from '@angular/core';

import { CalculatorService } from '../calculator/calculator.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Simulation } from '../models/simulation/simulation.model';
import { SimulationResult } from '../models/simulation/simulationResult.model';
import { IContribution } from '../models/contributions/contribution.interface';


@Injectable({
    providedIn: 'root'
})
export class SimulationStore {

    private simulations: BehaviorSubject<Simulation[]> = new BehaviorSubject([]);
    private results: BehaviorSubject<SimulationResult[]> = new BehaviorSubject([]);

    public simulations$: Observable<Simulation[]> = this.simulations.asObservable();
    public results$: Observable<SimulationResult[]> = this.results.asObservable();

    constructor(private calculator: CalculatorService) {
    }

    public getResult(simulation: Simulation) {
        return this.results.pipe( map( results => results.find( r => r.id === simulation.id)));
    }

    public getChartResult(simulation: Simulation) {
        return this.getResult(simulation).pipe( map( result => result ? result.chart : null ));
    }

    public addSimulation(simulation: Simulation) {

        const current = this.simulations.getValue();
        current.push(simulation);

        this.simulations.next(current);
    }

    public runSimulations(numberOfRuns: number = 100) {
        const simulations = this.simulations.getValue();
        const results = this.calculator.runSimulations(simulations, numberOfRuns);

        this.results.next(results);
    }

    public getNewSimulation(name: string): Simulation {
        const id = this.simulations.getValue().length;
        return new Simulation(id, name);
    }

    public addContribution(contribution: IContribution) {
        const simulations = this.simulations.getValue();
        const investment = this.getInvestment(contribution);

        investment.contributions = [...investment.contributions, contribution];
        this.simulations.next(simulations);
    }

    public editContribution(contribution: IContribution) {
        const simulations = this.simulations.getValue();
        const investment = this.getInvestment(contribution);

        investment.contributions = [...investment.contributions];
        this.simulations.next(simulations);
    }

    public deleteContribution(contribution: IContribution) {
        const simulations = this.simulations.getValue();
        const investment = this.getInvestment(contribution);

        investment.contributions = [...investment.contributions];
        investment.contributions.splice(investment.contributions.findIndex( c => c === contribution), 1);

        this.simulations.next(simulations);
    }

    private getInvestment(contribution: IContribution) {
        return this.simulations.getValue()
            .map(s => s.investments)
            .reduce( (a, b) => a.concat(b), [])
            .find( i => i.id === contribution.investmentId);
    }
}
