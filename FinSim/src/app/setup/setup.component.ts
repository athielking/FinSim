import { Component, OnInit } from '@angular/core';
import { Simulation } from '../models/simulation/simulation.model';
import { Frequency } from '../models/frequency.enum';
import { ContributionModel401k } from '../models/contributions/401kcontribution.model';
import { IRAContributionModel } from '../models/contributions/IRAContributionModel';
import { SimulationStore } from '../simulation/simulation.store';
import { Investment } from '../models/simulation/investment.model';
import { ChartStore } from '../simulation/chart.store';
import { BasicContributionModel } from '../models/contributions/basicContribution.model';

@Component({
  selector: 'fs-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  public dataSource: Simulation[] = [];
  constructor(public simulationStore: SimulationStore,
              public chartStore: ChartStore) { }

  ngOnInit() {
  }

  public runSimulations() {
    this.simulationStore.runSimulations(1000);
  }

  public initializeDefaults() {
    const simulation = this.simulationStore.getNewSimulation('Simulation 1');

    const investment401k = new Investment(simulation.investments.length, simulation.id, '401k', 30, 100000);
    const contrib401k = new ContributionModel401k(investment401k.id);
    contrib401k.salary = 100000;
    contrib401k.salaryIncreasePercent = 3;
    contrib401k.contributionPercent = 6;
    contrib401k.employerMatchMax = 6;
    contrib401k.employerMatchPercent = 100;
    contrib401k.safeHarbor = true;
    contrib401k.safeHarborPercent = 3;
    contrib401k.payFrequency = Frequency.BiWeekly;

    investment401k.contributions.push(contrib401k);

    simulation.investments.push(investment401k);

    const investmentIRA = new Investment(simulation.investments.length, simulation.id, 'IRA', 30, 10000);
    const iraContrib = new BasicContributionModel(investmentIRA.id);
    iraContrib.amount = 211;
    iraContrib.frequency = Frequency.BiWeekly;
    investmentIRA.contributions.push(iraContrib);

    simulation.investments.push(investmentIRA);

    this.simulationStore.addSimulation(simulation);
  }

}
