import { Contribuable } from './contribuable';
import { Groupetaxation } from './groupetaxation';

export class ParamProduit {
    id?:Number;
    codeProduit?:string;
    libProduit?:string;
    prixUnitaire?:string
    contribuable?:Contribuable;
    groupeTaxation?:Groupetaxation
}