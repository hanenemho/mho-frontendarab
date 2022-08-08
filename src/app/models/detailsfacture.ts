import { Groupetaxation } from './groupetaxation';
import { ParamProduit } from './paramProduit';

export class Detailsfacture {
       constructor(){

         this.groupeTaxation=new Groupetaxation();
             this.paramProduit=new ParamProduit();
       }
   
   orderProduit?:string ;
   libProduit ?:string ;
   refProduit?:string ;
   quantite?:string ;
   prixUnit ?:string ;
   taxSpec ?:string ;
   groupeTaxation?:Groupetaxation;
   groupeTaxationLib?:string;
   paramProduit?:ParamProduit;
   paramProduitLib?:string;
   montantHT?:number;
   montantTTC?:number;
   id?:Number
    
}
