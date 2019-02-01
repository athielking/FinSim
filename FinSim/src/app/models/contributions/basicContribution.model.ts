import { IContribution } from './contribution.interface';
import { Frequency } from '../frequency.enum';
import { CurrencyPipe } from '@angular/common';
import { ContributionTypes } from '../constants';

export class BasicContributionModel implements IContribution {

    public type = ContributionTypes.ContributionBasicType;

    public amount = 0;
    public frequency = Frequency.BiWeekly;

    private currency: CurrencyPipe = new CurrencyPipe('en-us');

    constructor(public investmentId: number,
                init?: Partial<BasicContributionModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    public getContributionAmount(yearIndex: number, weekIndex: number): number {
        if (weekIndex % <number>this.frequency !== 0) {
            return 0;
        }

        return this.amount;
    }

    public displayString() {
        const keyStr = Object.keys(Frequency).filter( k => isNaN(Number(k))).filter( k => Frequency[k] === this.frequency);
        return `${this.currency.transform(this.amount, 'USD', 'symbol')} Contribution ${keyStr}`;
    }
}
