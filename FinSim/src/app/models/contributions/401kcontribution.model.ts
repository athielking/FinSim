import { IContribution } from './contribution.interface';
import { Frequency } from '../frequency.enum';
import { FederalMaximum401kContribution, NumberOfWeeks, ContributionTypes } from '../constants';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

export class ContributionModel401k implements IContribution {

    public type = ContributionTypes.Contribution401kType;

    public salary = 0;
    public salaryIncreasePercent = 0;
    public contributionPercent = 0;
    public employerMatchPercent = 0;
    public employerMatchMax = 0;
    public safeHarbor = false;
    public safeHarborPercent = 0;
    public payFrequency = Frequency.BiWeekly;

    private currency: CurrencyPipe = new CurrencyPipe('en-us');
    private decimal: DecimalPipe = new DecimalPipe('en-us');

    constructor(public investmentId: number,
                init?: Partial<ContributionModel401k>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    public getContributionAmount(yearIndex: number, weekIndex: number): number {
        if ( weekIndex % <number>this.payFrequency !== 0 ) {
            return 0;
        }

        const increase = ((this.salaryIncreasePercent / 100) * yearIndex) + 1;
        const salaryCalc = this.salary * increase;

        const contributionAmt = Math.min( (salaryCalc * (this.contributionPercent / 100 )), FederalMaximum401kContribution);
        const employerMatch =
            (salaryCalc * (Math.min(this.employerMatchMax, this.contributionPercent) / 100)) * (this.employerMatchPercent / 100);

        const contributionPerPeriod = contributionAmt / (NumberOfWeeks / <number>this.payFrequency);
        const matchPerPeriod = employerMatch / (NumberOfWeeks / <number>this.payFrequency);

        let totalContrib = contributionPerPeriod + matchPerPeriod;
        if (this.safeHarbor && (weekIndex % <number>Frequency.Annually) === 0) {
            const safeHarborContrib = salaryCalc * (this.safeHarborPercent / 100);
            totalContrib += safeHarborContrib;
        }

        return totalContrib;
    }

    public displayString() {
        return `401k Contribution - ${this.decimal.transform(this.contributionPercent, '1.2-2')}% Contrib.` +
        ` ${this.decimal.transform(this.employerMatchPercent, '1.2-2')}% Match ` +
        `up to ${this.decimal.transform(this.employerMatchMax, '1.2-2')}% of ` +
        `Salary (${this.currency.transform(this.salary, 'USD', 'symbol')})`;
    }
}
