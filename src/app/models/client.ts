import { Pointvente } from './pointvente';
import { Contribuable } from './contribuable';

export class Client {
    id ?:Number;
    
    matriculeFiscaleClient?:string;

    nom?: string;

    email?: string;

    addresse?: string;
    
    numTel?:  Number;

    contribuable?:Contribuable
}