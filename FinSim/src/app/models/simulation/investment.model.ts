import { Frequency } from '../frequency.enum';
import { IContribution } from '../contributions/contribution.interface';

export class Investment {

    public contributions: IContribution[] = [];
    constructor(public id: number,
                public simulationId: number,
                public name: string,
                public numberOfYears: number,
                public principal: number,
                public compoundingFrequency: Frequency = Frequency.Quarterly) {
    }
}

