import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { SimulationResult } from '../models/simulation/simulationResult.model';
import { SimulationStore } from './simulation.store';
import { ChartModel } from '../models/charts/chart.model';
import { ChartData } from '../models/charts/chart-data.model';

@Injectable({
    providedIn: 'root'
})
export class ChartStore {

    private charts: BehaviorSubject<ChartModel[]> = new BehaviorSubject([]);

    public charts$: Observable<ChartModel[]> = this.charts.asObservable();

    constructor(private simulationStore: SimulationStore) {
        simulationStore.results$.subscribe( results => this.updateChartData(results));
    }

    public updateChartData(results: SimulationResult[]) {

        const charts: ChartModel[] = [];

        results.forEach( result => {

            const chartSeries: ChartData[] = [];
            let labels: string[];
            result.averageInvestments.forEach( inv => {
                let data = [inv.yearResults[0].startingPrincipal];
                data = data.concat(inv.yearResults.map( y => y.endingPrincipal ));

                if (!labels) {
                    labels = Array.from({length: inv.yearResults.length}, (x, i) => i.toString());
                }

                chartSeries.push(new ChartData(data, inv.name));
            });

            charts.push(new ChartModel('line', labels, chartSeries));
        });

        this.charts.next(charts);
    }
}
