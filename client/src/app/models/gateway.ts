import { Peripheral } from './peripheral'

export class Gateway {
    _id: string;
    name: string;
    ipv4: string;
    peripherals: Peripheral[];
}