import { Detailsfacture } from './detailsfacture';
import { Contribuable } from './contribuable';
import { Pointvente } from './pointvente';
import { subTotauxFacture } from './subTotauxFacture';
import { Client } from './client';

export class Facture {
	  id?:Number;	
      numFact ?:string ;	
	  dateFact?:string ;	
	  typFact ?:string ;	
	  numFactInit?:string ;	
	  datFactInit?:string ;	
	  lieuLivraison?:string ;	
	  codeSecef?:string ;	
	  compteurs?:string ;	
	  dateHeureMfc ?:string;	
	  codeQr ?:string;

	  state ?:any;

	  montantTaxSpec?:string

	  subTotauxFacture?:subTotauxFacture[];
	  totalHt?:string
	  montantTOTALS?:string;
	  totalTtc?:string;
	  detailsFacture?:Detailsfacture[];
	  contribuable?:Contribuable
	  pointVente?:Pointvente
	  client?:Client;
      isValid?:boolean =false
	  isSaved?:boolean =false
	  isExported?:boolean = false	
	  factureAvoir?:Facture
}
