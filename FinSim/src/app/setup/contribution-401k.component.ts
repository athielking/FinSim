import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Frequency } from '../models/frequency.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Investment } from '../models/simulation/investment.model';
import { SimulationStore } from '../simulation/simulation.store';
import { ContributionModel401k } from '../models/contributions/401kcontribution.model';

@Component({
  templateUrl: './contribution-401k.component.html',
})
export class Contribution401kComponent implements OnInit {

  public keys: string[];
  public enumValues = Frequency;

  public contributionForm = new FormGroup({
    salary: new FormControl(75000, [Validators.required, Validators.min(0)]),
    salaryIncreasePercent: new FormControl(3, [Validators.min(0), Validators.max(100)]),
    contributionPercent: new FormControl(6, [Validators.required, Validators.min(0), Validators.max(100)]),
    employerMatchPercent: new FormControl(100, [Validators.min(0), Validators.max(100)]),
    employerMatchMax: new FormControl(6, [Validators.min(0), Validators.max(100)]),
    safeHarbor: new FormControl(false),
    safeHarborPercent: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    payFrequency: new FormControl(Frequency.BiWeekly)
  });

  private investment: Investment;
  private editContrib: ContributionModel401k;

  constructor(private simulationStore: SimulationStore,
              private dialogRef: MatDialogRef<Contribution401kComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.investment = data.investment;

    if (data.editModel) {
      this.editContrib = data.editModel;
    }
  }

  ngOnInit() {
    this.keys = Object.keys(Frequency).filter(k => isNaN(Number(k)));

    this.contributionForm.controls.safeHarbor.valueChanges.subscribe( value => {
      if (value) {
        this.contributionForm.controls.safeHarborPercent.disable();
      } else {
        this.contributionForm.controls.safeHarborPercent.enable();
      }
    });

    if (this.editContrib) {
      this.contributionForm.patchValue(this.editContrib);
    }
  }

  onSubmit() {
    if (!this.editContrib) {
      const contrib = new ContributionModel401k(this.investment.id, this.contributionForm.value);
      this.simulationStore.addContribution(contrib);
    } else {
      Object.assign(this.editContrib, this.contributionForm.value);
      this.simulationStore.editContribution(this.editContrib);
    }

    this.dialogRef.close(true);
  }
}
