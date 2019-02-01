import { Investment } from './investment.model';

export class Simulation {

    public investments: Investment[] = [];
    constructor(
        public id: number,
        public name: string) {
    }
}
