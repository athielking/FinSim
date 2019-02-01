import { InvestmentYearResult } from './investmentYearResult.model';

export class InvestmentResult {

    public get averageRateOfReturn(): number {
        return this.yearResults.map( y => y.rateOfReturn ).reduce((p, c) => p + c, 0) / this.yearResults.length;
    }

    public get endingBalance(): number {
        return this.yearResults.length > 0 ? this.yearResults[this.yearResults.length - 1].endingPrincipal : 0;
    }
    constructor(public id: number,
                public name: string,
                public yearResults: InvestmentYearResult[] = []) {
    }
}
