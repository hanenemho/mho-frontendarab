import { Pointvente } from './pointvente';
import { Parampays } from './parampays';

export class Contribuable {
    id?:Number;
    matriculeFiscale?:string;
    motPasse?: string;
    numRegistre?: string;
    raisonSocial?: string;
    email?: string;
    adresse?: string;
    verificationCode?: string;
    actif?: boolean;   
    numtel?:  string;
    pointVente?:Pointvente[];
    paramPays?:Parampays;
}
