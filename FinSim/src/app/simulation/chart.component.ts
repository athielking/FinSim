import { Component, OnInit, Input } from '@angular/core';
import { SimulationStore } from './simulation.store';
import { ChartModel } from '../models/charts/chart.model';


@Component({
  selector: 'fs-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {

  @Input() public chart: ChartModel;
  public options: any;

  constructor(public chartStore: SimulationStore) {
    this.options = {
      responsive: true
    };
  }

  ngOnInit() {
  }

}
