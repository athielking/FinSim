import { IContribution } from './contribution.interface';
import { Frequency } from '../frequency.enum';
import { NumberOfWeeks, ContributionTypes } from '../constants';
import { CurrencyPipe } from '@angular/common';

export class IRAContributionModel implements IContribution {

    public type = ContributionTypes.ContributionIRAType;

    public annualAmount = 0;
    public max = true;
    public frequency = Frequency.BiWeekly;

    private currency: CurrencyPipe = new CurrencyPipe('en-us');

    constructor(public investmentId: number,
                init?: Partial<IRAContributionModel>) {

        if (init) {
            Object.assign(this, init);
        }
    }

    public getContributionAmount(yearIndex: number, weekIndex: number): number {
        if (weekIndex % <number>this.frequency !== 0 ) {
            return 0;
        }

        if (this.max) {
            this.annualAmount = 5000;
        }

        return this.annualAmount / (NumberOfWeeks / <number>this.frequency);
    }

    public displayString() {
        if ( this.max ) {
            return `Maximum Annual IRA Contribution`;
        }

        return `${this.currency.transform(this.annualAmount, 'USD', 'symbol')} Annual IRA Contribution`;
    }
}
