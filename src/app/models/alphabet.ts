import { Properties } from './objectProperties';

export class Alphabet {
    constructor(public character: string,
                public text: string,
                private model?: string,
                public obj?: string,
                private user?: string,
                private properties?: Properties) { }
}
