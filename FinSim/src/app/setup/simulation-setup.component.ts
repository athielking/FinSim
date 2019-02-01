import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Simulation } from '../models/simulation/simulation.model';
import { Investment } from '../models/simulation/investment.model';
import { SetupService } from './setup.service';
import { IContribution } from '../models/contributions/contribution.interface';
import { SimulationStore } from '../simulation/simulation.store';

@Component({
  selector: 'fs-simulation-setup',
  templateUrl: './simulation-setup.component.html',
  styleUrls: ['./simulation-setup.component.scss'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  //   ]),
  // ]
})
export class SimulationSetupComponent implements OnInit {

  @Input() public simulation: Simulation;

  constructor(private setupService: SetupService,
              private simulationStore: SimulationStore) { }

  ngOnInit() {
  }


  public addContribution(investment: Investment) {
    this.setupService.showContributionTypePrompt(investment);
  }

  public editContribution(investment: Investment, contribution: IContribution) {
    this.setupService.openContributionOfType(contribution.type, investment, contribution);
  }

  public deleteContribution(contribution: IContribution) {
    this.simulationStore.deleteContribution(contribution);
  }

  public addInvestment() {

  }
}
