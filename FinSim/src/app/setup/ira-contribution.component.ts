import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Frequency } from '../models/frequency.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Investment } from '../models/simulation/investment.model';
import { SimulationStore } from '../simulation/simulation.store';
import { IRAContributionModel } from '../models/contributions/IRAContributionModel';

@Component({
  templateUrl: './ira-contribution.component.html',
})
export class IRAContributionComponent implements OnInit {

  public keys: string[];
  public enumValues = Frequency;

  public contributionForm = new FormGroup({
    annualAmount: new FormControl(0),
    max: new FormControl(false),
    frequency: new FormControl(Frequency.BiWeekly)
  });

  private investment: Investment;
  constructor(private simulationStore: SimulationStore,
              private dialogRef: MatDialogRef<IRAContributionComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.investment = data.investment;
  }

  ngOnInit() {
    this.keys = Object.keys(Frequency).filter(k => isNaN(Number(k)));

    this.contributionForm.controls.max.valueChanges.subscribe( value => {
      if (value) {
        this.contributionForm.controls.annualAmount.disable();
      } else {
        this.contributionForm.controls.annualAmount.enable();
      }
    });
  }

  onSubmit() {
    const contrib = new IRAContributionModel(this.investment.id, this.contributionForm.value);
    this.simulationStore.addContribution(contrib);

    this.dialogRef.close(true);
  }
}
