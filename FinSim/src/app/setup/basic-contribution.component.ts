import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Frequency } from '../models/frequency.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Investment } from '../models/simulation/investment.model';
import { SimulationStore } from '../simulation/simulation.store';
import { BasicContributionModel } from '../models/contributions/basicContribution.model';

@Component({
  templateUrl: './basic-contribution.component.html',
})
export class BasicContributionComponent implements OnInit {

  public keys: string[];
  public enumValues = Frequency;

  public contributionForm = new FormGroup({
    amount: new FormControl(0),
    frequency: new FormControl(Frequency.BiWeekly)
  });

  private investment: Investment;
  constructor(private simulationStore: SimulationStore,
              private dialogRef: MatDialogRef<BasicContributionComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.investment = data.investment;
  }

  ngOnInit() {
    this.keys = Object.keys(Frequency).filter(k => isNaN(Number(k)));
  }

  onSubmit() {
    const contrib = new BasicContributionModel(this.investment.id, this.contributionForm.value);
    this.simulationStore.addContribution(contrib);

    this.dialogRef.close(true);
  }
}
