import { ContributionTypes } from '../constants';

export interface IContribution {

    type: ContributionTypes;
    investmentId: number;

    displayString();
    getContributionAmount(yearIndex: number, weekIndex: number): number;
}
