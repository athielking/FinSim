import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ContributionTypes } from '../models/constants';

@Component({
  templateUrl: './contribution-prompt.component.html',
})
export class ContributionPromptComponent implements OnInit {

  public types: string[];
  public promptForm = new FormGroup({
    contributionType: new FormControl('Basic')
  });

  constructor() { }

  ngOnInit() {
    this.types = Object.values(ContributionTypes);
  }
}
